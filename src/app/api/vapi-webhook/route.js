// Webhook handler for Vapi AI assistant with Gemini AI integration
import { NextResponse } from 'next/server';
import { parseFinancialTransaction } from '@/lib/gemini';
import { db } from '@/firebase/clientApp';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(request) {
  try {
    // Get the JSON body from the request
    const body = await request.json();
    
    // Extract the transcript data
    const { transcript, metadata } = body;
    const userId = metadata?.userId || 'anonymous';
    
    // Skip processing if no transcript
    if (!transcript) {
      return NextResponse.json({ 
        status: 'error',
        message: 'No transcript provided',
        response: {
          text: "I didn't catch what you said. Could you please repeat?"
        }
      });
    }

    console.log(`Processing transcript: "${transcript}" for user ${userId}`);
    
    // Process the transcript with Gemini AI
    const transactionData = await parseFinancialTransaction(transcript);
    
    let responseText = '';
    
    // If a transaction was successfully parsed
    if (!transactionData.error) {
      // Store the transaction in Firestore if we have a valid user ID
      if (userId !== 'anonymous') {
        try {
          const transactionsRef = collection(db, 'transactions');
          await addDoc(transactionsRef, {
            ...transactionData,
            userId,
            createdAt: serverTimestamp(),
          });
          
          // Prepare success response
          if (transactionData.type === 'income') {
            responseText = `Great! I've recorded your income of ${transactionData.amount} for ${transactionData.description}.`;
          } else {
            responseText = `I've recorded your expense of ${transactionData.amount} for ${transactionData.category}: ${transactionData.description}.`;
          }
        } catch (error) {
          console.error('Error saving transaction to Firestore:', error);
          responseText = "I processed your transaction but couldn't save it. Please try again later.";
        }
      } else {
        responseText = "I understand you're talking about a financial transaction, but you need to be logged in to save it.";
      }
    } else {
      // Handle the case where no transaction was found
      if (transactionData.error === "No transaction found") {
        responseText = "I couldn't identify a financial transaction in what you said. You can try saying something like 'I spent $45 on groceries yesterday' or 'I earned $1000 from my part-time job'.";
      } else {
        responseText = "I had trouble processing your request. Could you try again with clearer financial details?";
      }
    }
    
    // Return the response
    return NextResponse.json({ 
      status: 'success',
      message: 'Webhook processed successfully',
      response: {
        text: responseText
      }
    });
  } catch (error) {
    console.error('Error processing webhook:', error);
    
    // Return an error response
    return NextResponse.json(
      { 
        error: 'Failed to process webhook',
        response: {
          text: "I'm having trouble processing your request right now. Please try again later."
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
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    } 
  });
} 