'use client'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '@/firebase/clientApp'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress" // Keep for actual progress bars
import { Loader2 } from '@/components/ui/loader'; // <--- IMPORT Loader2
import { PlusCircle, BarChart3, BookOpen, Wallet, ArrowUpRight, Calendar, ArrowUp, ArrowDown, RefreshCw, Lightbulb, Mic } from "lucide-react"
import AddGoalDialog from '@/components/AddGoalDialog'
import AddTransactionDialog from '@/components/AddTransactionDialog'
import { format } from 'date-fns'
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { toast } from 'sonner'
import ReactMarkdown from 'react-markdown'
import VapiVoiceChat from '@/components/VapiVoiceChat'



export default function DashboardPage() {
  const [user, loading, error] = useAuthState(auth) // Added error state from hook
  const router = useRouter()
  const [goals, setGoals] = useState([])
  const [transactions, setTransactions] = useState([])
  const [goalsLoading, setGoalsLoading] = useState(true)
  const [transactionsLoading, setTransactionsLoading] = useState(true)
  const [insights, setInsights] = useState(null)
  const [insightsLoading, setInsightsLoading] = useState(false)

  // Authentication Check Effect
  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth')
    }
    if (error) {
      console.error("Auth Error:", error);
      toast.error("Authentication error", { description: error.message });
      // Optionally redirect to error page or auth page
      // router.push('/auth');
    }
  }, [user, loading, error, router])

  // Fetch goals when user is authenticated
  useEffect(() => {
    async function fetchGoals() {
      if (!user) {
        setGoals([]); // Clear goals if user logs out
        setGoalsLoading(false); // Set loading false if no user
        return;
      }

      try {
        setGoalsLoading(true)
        console.log(`Fetching goals for user: ${user.uid}`);
        const goalsQuery = query(
          collection(db, "goals"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        )

        const querySnapshot = await getDocs(goalsQuery)
        const goalsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          targetDate: doc.data().targetDate?.toDate(),
          createdAt: doc.data().createdAt?.toDate()
        }))
        console.log(`Fetched ${goalsData.length} goals.`);
        setGoals(goalsData)
      } catch (fetchError) { // Use different variable name to avoid conflict
        console.error("Error fetching goals:", fetchError)
        toast.error("Failed to fetch goals", { description: fetchError.message });
        setGoals([]); // Clear goals on error
      } finally {
        setGoalsLoading(false)
      }
    }

    fetchGoals()
  }, [user]) // Dependency: user

  // Fetch transactions when user is authenticated
  useEffect(() => {
    async function fetchTransactions() {
        if (!user) {
            setTransactions([]); // Clear transactions if user logs out
            setTransactionsLoading(false); // Set loading false if no user
            return;
        }

      try {
        setTransactionsLoading(true)
        console.log(`Fetching transactions for user: ${user.uid}`);
        const transactionsQuery = query(
          collection(db, "transactions"),
          where("userId", "==", user.uid),
          orderBy("date", "desc"),
          limit(5) // Only get the latest 5 transactions for dashboard display
        )

        const querySnapshot = await getDocs(transactionsQuery)
        const transactionsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          date: doc.data().date?.toDate(),
          createdAt: doc.data().createdAt?.toDate()
        }))
        console.log(`Fetched ${transactionsData.length} transactions.`);
        setTransactions(transactionsData)
      } catch (fetchError) { // Use different variable name
        console.error("Error fetching transactions:", fetchError)
        toast.error("Failed to fetch transactions", { description: fetchError.message });
        setTransactions([]); // Clear transactions on error
      } finally {
        setTransactionsLoading(false)
      }
    }

    fetchTransactions()
  }, [user]) // Dependency: user

  // Fetch financial insights (Using user.uid as requested)
  const fetchInsights = async () => {
    if (!user) {
        toast.warning("Please log in to fetch insights.");
        return;
    }
    if (insightsLoading) return; // Prevent concurrent requests

    try {
      setInsightsLoading(true)
      setInsights(null); // Clear previous insights
      console.log("Fetching financial insights via API for user:", user.uid);

      // *** Using user.uid as requested ***
      // Note: If your API expects a Firebase ID Token, this might need to be changed to:
      // const idToken = await user.getIdToken();
      // 'Authorization': `Bearer ${idToken}`
      const response = await fetch('/api/financial-insights', {
        method: 'GET', // Good practice to be explicit
        headers: {
          'Authorization': `Bearer ${user.uid}`, // Using UID as requested
          'Content-Type': 'application/json' // Good practice header
        }
      });

      console.log("Insights API response status:", response.status);

      if (!response.ok) {
        let errorData = { error: `HTTP error! status: ${response.status}`}; // Default error
        try {
            // Try to parse JSON error response from backend
            errorData = await response.json();
        } catch (jsonError) {
            console.warn("Could not parse error response as JSON:", jsonError);
             // Use statusText if available and response wasn't JSON
            errorData.error = response.statusText || errorData.error;
        }
        console.error("Insights API error response:", errorData);
        // Use the error message from parsed data if available, otherwise the default
        throw new Error(errorData.error || 'Failed to fetch insights');
      }

      const data = await response.json();
      console.log("Received insights data:", {
        hasInsights: !!data.insights,
        hasMarkdown: !!(data.insights?.markdownContent),
        contentLength: data.insights?.markdownContent?.length || 0
      });

      // Check if we have valid insights data (specifically markdown string)
      if (!data.insights || typeof data.insights.markdownContent !== 'string') {
         console.warn("Invalid or missing markdownContent in insights data:", data.insights);
        throw new Error("Invalid insights data received from server.");
      }

      setInsights(data.insights);

      toast.success("Insights updated", {
        description: "Your financial insights have been refreshed",
      });
    } catch (fetchError) { // Use different variable name
      console.error("Error fetching insights:", fetchError);
      toast.error("Failed to fetch financial insights", {
        description: fetchError.message || "Please try again later",
      });

      // Attempt to show fallback if fetch failed but local data exists
      if (goals.length > 0 || transactions.length > 0) {
        const fallbackInsights = generateFallbackInsights(goals, transactions);
        setInsights(fallbackInsights);
        toast.info("Showing fallback insights summary due to error.");
      } else {
        // Set specific error message if insights fetch fails and no local data
        setInsights({
          markdownContent: `## Unable to Generate Insights

We encountered a problem while analyzing your financial data: ${fetchError.message}.

Please ensure you have added some financial goals or transactions, then try refreshing. If the problem persists, contact support.`
        });
      }
    } finally {
      setInsightsLoading(false);
    }
  };


  // Generate fallback insights if API fails but we have data
  const generateFallbackInsights = (currentGoals, currentTransactions) => { // Use passed args
    // Calculate total expenses and income from the *recent* transactions passed
    const totalExpenses = currentTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + (t.amount || 0), 0);

    const totalIncome = currentTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + (t.amount || 0), 0);

    return {
      markdownContent: `## Financial Insights Summary (Fallback)

*You have ${currentTransactions.length} recent transaction(s) and ${currentGoals.length} financial goal(s).*

### Recent Spending & Income

${totalExpenses > 0
  ? `*   **Total Expenses (Recent):** ₹${totalExpenses.toLocaleString('en-IN')}`
  : '*   No recent expense transactions recorded.'}
${totalIncome > 0
  ? `*   **Total Income (Recent):** ₹${totalIncome.toLocaleString('en-IN')}`
  : '*   No recent income transactions recorded.'}

### Goal Progress Analysis

${currentGoals.length > 0
  ? currentGoals.map(goal => {
      const progress = goal.targetAmount > 0 && typeof goal.currentAmount === 'number'
        ? Math.min(Math.round((goal.currentAmount / goal.targetAmount) * 100), 100)
        : 0;
      return `*   **${goal.name || 'Unnamed Goal'}:** ₹${goal.currentAmount?.toLocaleString('en-IN') || 0} / ₹${goal.targetAmount?.toLocaleString('en-IN') || 'N/A'} (${progress}% complete)`;
    }).join('\n')
  : '*   No goals set yet. Add financial goals to track your progress.*'}

### Recommendations

1.  Continue tracking your expenses and income regularly.
2.  Set realistic financial goals with specific time frames.
3.  Review your progress weekly to stay on track.

> **Note:** This is a basic summary generated locally because the AI analysis could not be completed. Refresh to try connecting to the AI again.`
    };
  };

  // Fetch insights initially when data is loaded (Can be adjusted)
  useEffect(() => {
    // Fetch only if user exists, data is loaded, and insights haven't been fetched yet
    if (user && !goalsLoading && !transactionsLoading && !insights && !insightsLoading) {
       console.log("Triggering initial insights fetch.");
       fetchInsights();
    }
     // If you want insights to auto-refresh when goals/transactions change, add them back to dependency array.
     // Currently setup for manual refresh via button.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, goalsLoading, transactionsLoading]); // Trigger when user/data loads


  // Calculate financial summary
  const calculateSummary = () => {
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + (t.amount || 0), 0)

    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + (t.amount || 0), 0)

    const netSavings = totalIncome - totalExpenses // Based on recent transactions

    // Calculate counts based on the state arrays
    const activeGoalsCount = goals.length; // <--- CORRECTLY CALCULATED
    const recentActivityCount = transactions.length; // <--- CORRECTLY CALCULATED

    // Return all calculated values needed
    return { totalIncome, totalExpenses, netSavings, activeGoalsCount, recentActivityCount } // <--- CORRECT RETURN
  }

  // Destructure ALL the values you need from the summary
  const { netSavings, activeGoalsCount, recentActivityCount } = calculateSummary() // <--- CORRECT DESTRUCTURING


  // Loading state for the entire page based on auth loading
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        {/* Centered Loader */}
        <div className="flex flex-col items-center gap-4">
           <Loader2 className="h-12 w-12 text-primary/80" aria-label="Loading dashboard..."/> {/* Use Loader2 */}
           <p className="text-sm text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  // If auth finished but no user (e.g., redirecting)
  if (!user) {
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
             <p className="text-muted-foreground">Redirecting to login...</p>
        </div>
    );
  }

  // Main Dashboard Content
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl animate-in fade-in duration-500">
      {/* Header section */}
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Welcome, {user.displayName || user.email?.split('@')[0] || 'User'}
        </h1>
        <p className="text-muted-foreground">
          Your financial overview and AI assistant.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        {/* Net Savings (Recent) Card */}
        <Card className="bg-card/60 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Recent Net Flow</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={cn(
                "text-2xl font-bold",
                netSavings > 0 && "text-green-600",
                netSavings < 0 && "text-red-600"
             )}>
              {netSavings >= 0 ? '+' : ''}₹{netSavings.toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Based on last {transactions.length} transaction(s)
            </p>
          </CardContent>
        </Card>

        {/* Active Goals Card */}
        <Card className="bg-card/60 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold h-8 flex items-center"> {/* Added fixed height container */}
                {/* Use Loader2 here */}
                {goalsLoading ? (
                    <Loader2 className="h-6 w-6 text-muted-foreground" aria-label="Loading goals count"/>
                 ) : (
                    activeGoalsCount
                 )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {goalsLoading ? "Loading goals..." : (activeGoalsCount > 0 ? 'Goals currently tracked' : 'No active goals yet')}
            </p>
          </CardContent>
        </Card>

        {/* Recent Activity Card */}
        <Card className="bg-card/60 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             <div className="text-2xl font-bold h-8 flex items-center"> {/* Added fixed height container */}
                 {/* Use Loader2 here */}
                {transactionsLoading ? (
                    <Loader2 className="h-6 w-6 text-muted-foreground" aria-label="Loading transactions count"/>
                 ) : (
                    recentActivityCount
                )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {transactionsLoading ? "Loading transactions..." : (recentActivityCount > 0 ? 'Recent transactions shown' : 'No recent activity')}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main sections (2-column grid) */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Financial Goals */}
        <Card className="bg-card/60 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-primary">Financial Goals</CardTitle>
              {user && <AddGoalDialog />}
            </div>
            <CardDescription>Set and track your savings targets.</CardDescription>
          </CardHeader>
          <CardContent>
            {goalsLoading ? (
              // Skeleton Loader for Goals
              <div className="flex flex-col space-y-4 py-2">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 w-3/4 rounded bg-muted/50 animate-pulse"></div>
                    <div className="h-2 w-full rounded bg-muted/50 animate-pulse mt-1"></div>
                    <div className="flex justify-between mt-1">
                       <div className="h-3 w-1/3 rounded bg-muted/50 animate-pulse"></div>
                       <div className="h-3 w-1/4 rounded bg-muted/50 animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : goals.length > 0 ? (
              // Display Actual Goals
              <div className="space-y-4">
                {goals.map(goal => {
                  const isAmountValid = typeof goal.currentAmount === 'number' && typeof goal.targetAmount === 'number';
                  const progress = isAmountValid && goal.targetAmount > 0
                    ? Math.min(Math.round((goal.currentAmount / goal.targetAmount) * 100), 100)
                    : 0;

                  return (
                    <div key={goal.id} className="space-y-1.5 border-b border-border/10 pb-3 last:border-0 last:pb-0">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-sm">{goal.name || "Unnamed Goal"}</h3>
                        {isAmountValid && goal.targetAmount > 0 && (
                          <span className="text-xs font-semibold text-primary">
                            {progress}%
                          </span>
                        )}
                      </div>

                      {isAmountValid && goal.targetAmount > 0 && (
                          <Progress value={progress} className="h-2" aria-label={`${goal.name} progress ${progress}%`} />
                      )}

                      <div className="flex flex-wrap justify-between items-center text-xs text-muted-foreground pt-1 gap-x-4 gap-y-1">
                        {isAmountValid && (
                            <div className="flex items-center gap-1">
                            <Wallet className="h-3 w-3" />
                            <span>
                                ₹{goal.currentAmount?.toLocaleString('en-IN') ?? 'N/A'} /
                                ₹{goal.targetAmount?.toLocaleString('en-IN') ?? 'N/A'}
                            </span>
                            </div>
                        )}
                        {goal.targetDate && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>
                              Target: {format(goal.targetDate, 'PP')}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              // No Goals Placeholder
              <div className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground">
                <div className="rounded-full bg-primary/10 p-3 mb-3">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm mb-2">No goals created yet.</p>
                <p className="text-xs max-w-[18rem]">Click the '+' button above to set financial goals and track your savings progress.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="bg-card/60 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-primary">Recent Transactions</CardTitle>
              {user && <AddTransactionDialog />}
            </div>
            <CardDescription>Latest income and expenses.</CardDescription>
          </CardHeader>
          <CardContent>
            {transactionsLoading ? (
              // Skeleton Loader for Transactions
              <div className="flex flex-col space-y-4 py-2">
                 {[...Array(3)].map((_, i) => (
                     <div key={i} className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-muted/50 animate-pulse"></div>
                            <div className="space-y-1.5">
                                <div className="h-3.5 w-24 rounded bg-muted/50 animate-pulse"></div>
                                <div className="h-3 w-32 rounded bg-muted/50 animate-pulse"></div>
                            </div>
                        </div>
                         <div className="flex flex-col items-end space-y-1.5">
                             <div className="h-3.5 w-16 rounded bg-muted/50 animate-pulse"></div>
                             <div className="h-3 w-12 rounded bg-muted/50 animate-pulse"></div>
                         </div>
                     </div>
                 ))}
              </div>
            ) : transactions.length > 0 ? (
              // Display Actual Transactions
              <div className="space-y-1">
                {transactions.map(transaction => (
                  <div key={transaction.id} className="flex items-center justify-between py-2.5 border-b border-border/10 last:border-0">
                    <div className="flex items-start gap-3 flex-1 min-w-0"> {/* Allow left side to grow/shrink */}
                      <div className={cn(
                        "flex-shrink-0 rounded-full p-1.5 mt-0.5",
                        transaction.type === 'income'
                          ? "bg-green-500/10 text-green-500"
                          : "bg-red-500/10 text-red-500"
                      )}>
                        {transaction.type === 'income'
                          ? <ArrowUp className="h-3.5 w-3.5" />
                          : <ArrowDown className="h-3.5 w-3.5" />}
                      </div>
                      <div className="flex-1 min-w-0"> {/* Allow text wrap/truncate */}
                        <h4 className="text-sm font-medium truncate">{transaction.category || "Uncategorized"}</h4>
                        {transaction.description && (
                          <p className="text-xs text-muted-foreground truncate">
                            {transaction.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end ml-2 flex-shrink-0 text-right"> {/* Right align text */}
                      <span className={cn(
                        "text-sm font-medium whitespace-nowrap",
                        transaction.type === 'income' ? "text-green-600" : "text-red-600"
                      )}>
                        {transaction.type === 'income' ? '+' : '-'}₹{(transaction.amount ?? 0).toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {transaction.date ? format(transaction.date, 'dd MMM yyyy') : 'No date'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
               // No Transactions Placeholder
              <div className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground">
                <div className="rounded-full bg-primary/10 p-3 mb-3">
                  <Wallet className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm mb-2">No transactions logged yet.</p>
                <p className="text-xs max-w-[18rem]">Click the '+' button above to start logging your income and expenses.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* AI Financial Insights & Voice Assistant (Full width) */}
      <div className="mt-6">
        <Card className="bg-card/60 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all">
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
               <div className='flex-grow'>
                    <CardTitle className="text-primary flex items-center gap-2 mb-1">
                    <Lightbulb className="h-5 w-5 text-yellow-400" />
                    AI Financial Assistant
                    </CardTitle>
                    <CardDescription>Get text insights or ask questions via voice.</CardDescription>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 self-start sm:self-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={fetchInsights}
                      disabled={insightsLoading || !user}
                      className="gap-1 h-9"
                      aria-label="Refresh text-based financial insights"
                    >
                      {/* Use Loader2 for button loading state */}
                      {insightsLoading ? (
                          <Loader2 className="h-3.5 w-3.5" aria-hidden="true" />
                       ) : (
                          <RefreshCw className="h-3.5 w-3.5" aria-hidden="true"/>
                       )}
                      Refresh Insights
                    </Button>
                    {user && (
                        <VapiVoiceChat
                            user={user}
                            goals={goals}
                            transactions={transactions}
                        />
                    )}
                </div>
            </div>
          </CardHeader>
          <CardContent>
            {insightsLoading && !insights ? ( // Show skeleton only when loading initially or after clearing
              // Skeleton Loader for Insights
              <div className="flex flex-col gap-3 py-4">
                <div className="h-4 bg-muted/40 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-muted/40 rounded animate-pulse w-1/2"></div>
                <div className="h-4 bg-muted/40 rounded animate-pulse w-full"></div>
                <div className="h-4 bg-muted/40 rounded animate-pulse w-5/6"></div>
              </div>
            ) : insights?.markdownContent ? (
              // Display Markdown Insights
              <div className="prose prose-sm dark:prose-invert max-w-none markdown-insights">
                 <style jsx global>{`
                  .markdown-insights { color: hsl(var(--foreground)); line-height: 1.65; }
                  .markdown-insights h1, .markdown-insights h2, .markdown-insights h3, .markdown-insights h4 { font-weight: 600; margin-top: 1.5em; margin-bottom: 0.8em; line-height: 1.3; color: hsl(var(--foreground)); }
                  .markdown-insights h1 { font-size: 1.6rem; }
                  .markdown-insights h2 { font-size: 1.35rem; color: hsl(var(--primary)); border-bottom: 1px solid hsl(var(--border)); padding-bottom: 0.3em;}
                  .markdown-insights h3 { font-size: 1.15rem; color: hsl(var(--primary));}
                  .markdown-insights p { margin-bottom: 1em; }
                  .markdown-insights strong { font-weight: 600; color: hsl(var(--primary));}
                  .markdown-insights ul, .markdown-insights ol { padding-left: 1.5rem; margin-bottom: 1em; }
                  .markdown-insights li { margin-bottom: 0.4em; }
                  .markdown-insights ul li::marker { color: hsl(var(--primary)); }
                  .markdown-insights blockquote { border-left: 3px solid hsl(var(--primary)); padding-left: 1rem; margin: 1.5em 0; color: hsl(var(--muted-foreground)); font-style: italic; }
                  .markdown-insights code:not(pre code) { background-color: hsl(var(--muted)); padding: 0.2em 0.4em; border-radius: 4px; font-size: 0.9em; color: hsl(var(--foreground)); }
                  .markdown-insights pre { background-color: hsl(var(--muted)); padding: 1em; border-radius: 6px; overflow-x: auto; margin: 1.5em 0; }
                  .markdown-insights pre code { background-color: transparent; padding: 0; border-radius: 0; font-size: 0.9em; }
                  .markdown-insights hr { border-top: 1px solid hsl(var(--border)); margin: 2em 0; }
                  .markdown-insights table { width: auto; border-collapse: collapse; margin: 1.5em 0; }
                  .markdown-insights th, .markdown-insights td { border: 1px solid hsl(var(--border)); padding: 0.5em 0.8em; }
                  .markdown-insights th { background-color: hsl(var(--muted)); font-weight: 600; }
                `}</style>
                <ReactMarkdown>
                  {insights.markdownContent}
                </ReactMarkdown>
              </div>
            ) : (
              // Fallback / Initial State Message
              <div className="text-center py-6 text-muted-foreground">
                <p>
                  {goalsLoading || transactionsLoading
                    ? "Loading data..." // Show if data is still loading
                    : goals.length === 0 && transactions.length === 0
                    ? "Add transactions and goals, then refresh to get personalized insights."
                    : "Click 'Refresh Insights' to generate an analysis or use the voice assistant."}
                </p>
                {/* Optionally show a button here if needed */}
                 {!insightsLoading && !insights?.markdownContent && (goals.length > 0 || transactions.length > 0) && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={fetchInsights}
                        className="mt-4"
                        aria-label="Generate initial financial insights"
                    >
                        Generate Insights
                    </Button>
                 )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Resources Section (Last row) */}
      <div className="mt-6">
        <Card className="bg-card/60 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-primary">Financial Resources</CardTitle>
              <Button
                        variant="outline"
                        size="sm"
                        
                        className="mt-4"
                        aria-label="Generate initial financial insights"
                    >
                        <a href='/resources'>See resources</a>
                    </Button>
            </div>
            <CardDescription>Guides and articles to boost your financial literacy.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground">
              <div className="rounded-full bg-primary/10 p-3 mb-3">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <p className="text-sm mb-2">Learning resources</p>
              <p className="text-xs max-w-[20rem]">Explore guides on budgeting, saving, investing, and managing debt effectively.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}