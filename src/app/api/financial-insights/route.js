import { NextResponse } from 'next/server';
import { generateFinancialInsights } from '@/lib/gemini';
import { db } from '@/firebase/clientApp';
import { collection, query, where, getDocs, doc, setDoc } from 'firebase/firestore';

// Get the current user ID from the request
function getUserId(request) {
  // For a real app, you would verify a session token
  // This is a simplified version that expects a user ID in the Authorization header
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  
  // The token would be validated in a real app
  return authHeader.split(' ')[1];
}

export async function GET(request) {
  try {
    // Get user ID from request
    const userId = getUserId(request);
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    let transactions = [];
    let goals = [];
    
    try {
      // Fetch user's transactions from Firestore
      const transactionsRef = collection(db, 'transactions');
      const transactionsQuery = query(transactionsRef, where('userId', '==', userId));
      const transactionsSnapshot = await getDocs(transactionsQuery);
      
      transactionsSnapshot.forEach(doc => {
        transactions.push({
          id: doc.id,
          ...doc.data(),
          // Convert Firestore timestamp to ISO string if present
          createdAt: doc.data().createdAt ? doc.data().createdAt.toDate().toISOString() : null
        });
      });
      
      // Fetch user's goals from Firestore
      const goalsRef = collection(db, 'goals');
      const goalsQuery = query(goalsRef, where('userId', '==', userId));
      const goalsSnapshot = await getDocs(goalsQuery);
      
      goalsSnapshot.forEach(doc => {
        goals.push({
          id: doc.id,
          ...doc.data(),
          // Convert Firestore timestamp to ISO string if present
          createdAt: doc.data().createdAt ? doc.data().createdAt.toDate().toISOString() : null
        });
      });
      
      console.log(`Successfully fetched ${transactions.length} transactions and ${goals.length} goals`);
      
    } catch (firestoreError) {
      console.error('Firestore error:', firestoreError);
      
      // If there's a permissions error with fetching transactions/goals, return error
      return NextResponse.json({
        insights: {
          markdownContent: `## Unable to Access Data

We encountered a permissions error while retrieving your financial data: ${firestoreError.message}.

Please make sure your account has the correct permissions to access transactions and goals.`
        }
      });
    }
    
    // If no data, return a simple response
    if (transactions.length === 0 && goals.length === 0) {
      return NextResponse.json({
        insights: {
          summary: "Not enough data to generate insights yet. Start by adding transactions and goals.",
          markdownContent: `## No Data Available Yet

Please add some transactions and financial goals to get personalized insights. 

Here are some steps to get started:
1. Add your financial goals on the dashboard
2. Record your expenses and income
3. Check back for personalized financial analysis
          `
        }
      });
    }
    
    // Generate insights using Gemini AI
    const insights = await generateFinancialInsights(transactions, goals);
    console.log("Generated insights successfully");
    
    // Store the insights in Firestore
    try {
      const insightsRef = doc(db, 'insights', userId);
      await setDoc(insightsRef, {
        content: insights.markdownContent,
        userId,
        createdAt: new Date(),
        transactions: transactions.length,
        goals: goals.length
      }, { merge: true });
      console.log("Successfully saved insights to Firestore");
    } catch (saveError) {
      console.error('Error saving insights to Firestore:', saveError);
      // Continue even if saving fails - we'll still return the insights
    }
    
    // Return the insights
    return NextResponse.json({ insights });
  } catch (error) {
    console.error('Error generating financial insights:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to generate insights',
        insights: {
          markdownContent: `## Error Generating Insights

We encountered a problem while analyzing your financial data: ${error.message}.

Please try again later or contact support if this problem persists.`
        }
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  return NextResponse.json({}, { 
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    } 
  });
} 