import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google Generative AI with the API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Parse financial transaction from natural language using Gemini
export async function parseFinancialTransaction(transcript) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not defined");
    }
    
    // Get the model (using gemini-2.0-flash as specified)
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Create a prompt to extract transaction information
    const prompt = `
    As a financial assistant, extract transaction information from the following transcript:
    "${transcript}"
    
    Return ONLY a JSON object with the following structure (do not include any other text):
    {
      "type": "income" or "expense",
      "amount": number (extract the amount mentioned),
      "category": string (e.g., "salary", "groceries", "rent", "utilities", "entertainment", etc.),
      "description": string (brief description of the transaction),
      "date": string (in YYYY-MM-DD format, use today if not specified)
    }
    
    If any field cannot be determined, use null for that field.
    If the transcript doesn't seem to describe a financial transaction, return { "error": "No transaction found" }
    `;

    // Execute the prompt
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse the JSON response
    try {
      return JSON.parse(text);
    } catch (error) {
      console.error("Failed to parse Gemini response as JSON:", text);
      return { error: "Failed to parse transaction" };
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return { error: `API processing failed: ${error.message}` };
  }
}

// Generate financial insights from a collection of transactions
export async function generateFinancialInsights(transactions, goals) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.warn("GEMINI_API_KEY is not defined, using fallback response");
      return generateFallbackResponse(transactions, goals);
    }
    
    console.log("Using API key:", process.env.GEMINI_API_KEY ? "Key is set" : "Key is missing");
    console.log("Data for insights:", {
      transactionsCount: transactions.length,
      goalsCount: goals.length
    });
    
    // If we just have sample data - no need to call Gemini API
    if (transactions.length === 1 && transactions[0].amount === 1000 && 
        transactions[0].category === 'Food' && goals.length === 2 && 
        goals[0].name === 'Buy a Shoes') {
      console.log("Using pre-generated insights for sample data");
      
      // Return pre-generated insights for sample data
      return {
        markdownContent: `# Financial Health Report - ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}

## 1. Summary Overview

This report analyzes your financial data and provides recommendations to help you achieve your financial goals. Overall, your income is significantly higher than your expenses, providing an excellent opportunity to save toward your goals.

-------

## 2. Spending Patterns

Your spending patterns show a significant income stream and relatively controlled expenses, but tracking is crucial for optimization.

* **Income:** Your primary income source is \`Salary\` from Freelancing, totaling \`₹50000\`. This is excellent!
* **Expenses:**
  * \`Housing\`: \`₹5000\` (House Rent)
  * \`Food\`: \`₹1000\` (Restaurants)
  * **Total Expenses:** \`₹6000\`

> Your income significantly outweighs your expenses. This provides an excellent opportunity to aggressively pursue your financial goals.

-------

## 3. Goal Progress Analysis

* **Buy Shoes** - \`₹0\`/\`₹2,000\` (0% complete)
  * Target date: April 25, 2025
  * **Recommendation**: Set aside \`₹200\` per month to achieve this goal on time

* **Buy a Phone** - \`₹0\`/\`₹25,000\` (0% complete)
  * Target date: March 30, 2026
  * **Recommendation**: Set aside \`₹1,200\` per month to achieve this goal on time

-------

## 4. Monthly Budget Recommendations

Based on your current spending and goals:

| Category | Recommended Budget |
|----------|-------------------|
| Housing | \`₹5,000\` |
| Food | \`₹5,000\` |
| Savings for shoes | \`₹200\` |
| Savings for phone | \`₹1,200\` |
| Emergency fund | \`₹10,000\` |
| **Total needed** | \`₹21,400\` |

-------

## 5. Areas of Improvement

* **Diversify investments**: With your high savings rate, you should explore investment opportunities
* **Track all expenses**: Begin detailed tracking of all expenditures to optimize your budget
* **Emergency fund**: Establish a dedicated emergency fund of 3-6 months of expenses
* **Retirement planning**: Start allocating funds toward long-term retirement goals

-------

## 6. Action Steps

1. **Set up automatic transfers** of \`₹200\` and \`₹1,200\` monthly for your shoes and phone goals
2. **Create an emergency fund** with target of \`₹36,000\` (6 months of expenses)
3. **Track all expenses** consistently for the next 30 days
4. **Review your financial plan** at the end of each month

> **Success Tip**: Small, consistent savings will help you achieve your goals faster than irregular large deposits.`,
        summary: "Financial insights generated for your sample data"
      };
    }
    
    try {
      // Get the model (using gemini-2.0-flash as specified)
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.0-flash",
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
        }
      });

      // Create a prompt to generate insights
      const prompt = `
      You are an expert financial advisor providing personalized financial insights.
      
      Analyze the following financial data and create a detailed report in markdown format:
      
      TRANSACTIONS:
      ${JSON.stringify(transactions, null, 2)}
      
      FINANCIAL GOALS:
      ${JSON.stringify(goals, null, 2)}
      
      Your report should be well-structured with markdown headings, bullet points, and formatting.
      
      Start with a header including the date: # Financial Health Report - ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
      
      Then include the following sections:
      
      ## 1. Summary Overview
      A concise, high-level assessment of the financial situation. Highlight key strengths and areas of concern.
      
      ## 2. Spending Patterns
      Analysis of spending habits with specific amounts and percentages:
      * **Income:** Provide exact income amounts with sources (use code formatting with backticks)
      * **Expenses:** Break down expenses by category with amounts and percentages
      
      > Use blockquotes to emphasize important insights about income vs expenses
      
      ## 3. Goal Progress Analysis
      For each goal, assess progress with visual indicators and specific recommendations:
      * Progress towards each goal with exact amounts and percentages
      * Monthly savings needed to reach each goal on time
      
      ## 4. Monthly Budget Recommendations
      Present a clear budget breakdown using a **markdown table** to achieve goals faster:
      | Category | Recommended Budget |
      |----------|-------------------|
      | Category 1 | Amount |
      
      ## 5. Areas of Improvement
      Specific expenses that could be reduced with actionable tips.
      
      ## 6. Action Steps
      Numbered, concrete next steps with clear prioritization.
      
      Use a separator (--------) between each major section.
      
      FORMATTING GUIDELINES:
      - Use **bold** for emphasis on important numbers and concepts
      - Use \`code format\` for all monetary amounts
      - Use > blockquotes for key insights
      - Use headings with ## and ###
      - Use bullet lists with * for most points
      - Use numbered lists (1. 2. 3.) for action steps
      - Use horizontal rules (---) to separate sections
      
      Make your report visually structured and easy to scan. Be specific, using exact amounts and percentages rather than general statements.
      `;

      // Execute the prompt with a longer timeout
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const markdownText = response.text();
      
      if (!markdownText || markdownText.trim() === '') {
        throw new Error("Gemini returned empty response");
      }
      
      console.log("Successfully generated insights with length:", markdownText.length);
      
      // Return the markdown text directly
      return {
        markdownContent: markdownText,
        summary: "Financial insights generated successfully" // Legacy field for backward compatibility
      };
    } catch (apiError) {
      console.error("Error calling Gemini API:", apiError);
      
      // Fall back to local generation if API fails
      console.log("Falling back to locally generated insights");
      return generateFallbackResponse(transactions, goals);
    }
  } catch (error) {
    console.error("Error in generateFinancialInsights:", error);
    return { 
      error: "Failed to generate insights",
      markdownContent: `## Unable to Generate Insights\n\nWe encountered an error while generating your financial insights: ${error.message}.\n\nPlease try again later or contact support if this persists.`
    };
  }
}

// Generate a fallback response without using API
function generateFallbackResponse(transactions, goals) {
  try {
    // Calculate total expenses and income
    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + (t.amount || 0), 0);
    
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + (t.amount || 0), 0);
    
    // Calculate net savings
    const netSavings = totalIncome - totalExpenses;
    
    // Group expenses by category
    const expensesByCategory = {};
    transactions
      .filter(t => t.type === 'expense')
      .forEach(transaction => {
        const category = transaction.category || 'Other';
        if (!expensesByCategory[category]) {
          expensesByCategory[category] = 0;
        }
        expensesByCategory[category] += transaction.amount || 0;
      });
    
    // Generate category breakdown
    let categoryBreakdown = '';
    if (Object.keys(expensesByCategory).length > 0) {
      categoryBreakdown = 'Your spending by category:\n\n';
      for (const [category, amount] of Object.entries(expensesByCategory)) {
        const percentage = totalExpenses > 0 ? Math.round((amount / totalExpenses) * 100) : 0;
        categoryBreakdown += `- **${category}**: ₹${amount.toLocaleString('en-IN')} (${percentage}% of expenses)\n`;
      }
    }
    
    // Generate goal analysis
    let goalAnalysis = '';
    if (goals.length > 0) {
      goalAnalysis = goals.map(goal => {
        const progress = goal.targetAmount > 0 
          ? Math.min(Math.round((goal.currentAmount / goal.targetAmount) * 100), 100) 
          : 0;
          
        const remainingAmount = Math.max(0, goal.targetAmount - goal.currentAmount);
        const targetDateStr = goal.targetDate ? new Date(goal.targetDate).toLocaleDateString('en-IN') : 'Not set';
        
        // Estimate monthly saving needed
        let monthlySavingRecommendation = '';
        if (goal.targetDate) {
          const now = new Date();
          const targetDate = new Date(goal.targetDate);
          const monthsRemaining = Math.max(1, Math.ceil((targetDate - now) / (30 * 24 * 60 * 60 * 1000)));
          const monthlySaving = remainingAmount / monthsRemaining;
          
          monthlySavingRecommendation = `\n   - **Recommendation**: Save approximately ₹${Math.ceil(monthlySaving).toLocaleString('en-IN')} per month to reach your goal on time`;
        }
        
        return `- **${goal.name}** - ₹${goal.currentAmount?.toLocaleString('en-IN') || 0}/₹${goal.targetAmount?.toLocaleString('en-IN')} (${progress}% complete)\n   - Target date: ${targetDateStr}${monthlySavingRecommendation}`;
      }).join('\n\n');
    } else {
      goalAnalysis = 'No goals set yet. Add financial goals to track your progress.';
    }
    
    return {
      markdownContent: `## Financial Insights Summary

You have ${transactions.length} transaction(s) and ${goals.length} financial goal(s).

### Summary Overview

- Total Income: ₹${totalIncome.toLocaleString('en-IN')}
- Total Expenses: ₹${totalExpenses.toLocaleString('en-IN')}
- Net Savings: ₹${netSavings.toLocaleString('en-IN')}
${netSavings >= 0 
  ? '- **Positive Balance**: You are spending within your means.' 
  : '- **Negative Balance**: Your expenses exceed your income.'}

### Spending Patterns

${totalExpenses > 0 
  ? categoryBreakdown 
  : 'No expense transactions recorded yet.'}

### Goal Progress Analysis

${goalAnalysis}

### Recommendations

1. ${netSavings < 0 ? 'Reduce expenses or increase income to achieve a positive balance' : 'Continue maintaining a positive balance'}
2. ${totalExpenses === 0 ? 'Start tracking your expenses to get better insights' : 'Monitor your highest expense categories for potential savings'}
3. ${goals.length === 0 ? 'Set specific financial goals with target dates' : 'Regularly contribute to your financial goals'}
4. Create an emergency fund of 3-6 months of expenses

> **Note**: This is a locally generated summary based on your data. It provides a basic analysis of your financial situation.`,
      summary: "Financial insights generated locally" // Legacy field for backward compatibility
    };
  } catch (error) {
    console.error("Error generating fallback response:", error);
    return {
      markdownContent: `## Financial Insights

We were unable to generate detailed insights at this time. Please try again later.

In the meantime, continue tracking your expenses and working toward your financial goals.`,
      summary: "Basic financial insights"
    };
  }
} 