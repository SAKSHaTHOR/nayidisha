'use client'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '@/firebase/clientApp'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { PlusCircle, BarChart3, BookOpen, Wallet, ArrowUpRight, Calendar, ArrowUp, ArrowDown, RefreshCw, Lightbulb } from "lucide-react"
import AddGoalDialog from '@/components/AddGoalDialog'
import AddTransactionDialog from '@/components/AddTransactionDialog'
import { format } from 'date-fns'
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { toast } from 'sonner'
import ReactMarkdown from 'react-markdown'

export default function DashboardPage() {
  const [user, loading] = useAuthState(auth)
  const router = useRouter()
  const [goals, setGoals] = useState([])
  const [transactions, setTransactions] = useState([])
  const [goalsLoading, setGoalsLoading] = useState(true)
  const [transactionsLoading, setTransactionsLoading] = useState(true)
  const [insights, setInsights] = useState(null)
  const [insightsLoading, setInsightsLoading] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth')
    }
  }, [user, loading, router])

  // Fetch goals when user is authenticated
  useEffect(() => {
    async function fetchGoals() {
      if (!user) return
      
      try {
        setGoalsLoading(true)
        const goalsQuery = query(
          collection(db, "goals"), 
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        )
        
        const querySnapshot = await getDocs(goalsQuery)
        const goalsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          // Convert Firebase Timestamp to JS Date
          targetDate: doc.data().targetDate?.toDate(),
          createdAt: doc.data().createdAt?.toDate()
        }))
        
        setGoals(goalsData)
      } catch (error) {
        console.error("Error fetching goals:", error)
      } finally {
        setGoalsLoading(false)
      }
    }
    
    fetchGoals()
  }, [user])

  // Fetch transactions when user is authenticated
  useEffect(() => {
    async function fetchTransactions() {
      if (!user) return
      
      try {
        setTransactionsLoading(true)
        const transactionsQuery = query(
          collection(db, "transactions"), 
          where("userId", "==", user.uid),
          orderBy("date", "desc"),
          limit(5) // Only get the latest 5 transactions
        )
        
        const querySnapshot = await getDocs(transactionsQuery)
        const transactionsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          // Convert Firebase Timestamp to JS Date
          date: doc.data().date?.toDate(),
          createdAt: doc.data().createdAt?.toDate()
        }))
        
        setTransactions(transactionsData)
      } catch (error) {
        console.error("Error fetching transactions:", error)
      } finally {
        setTransactionsLoading(false)
      }
    }
    
    fetchTransactions()
  }, [user])

  // Fetch financial insights
  const fetchInsights = async () => {
    if (!user) return
    
    try {
      setInsightsLoading(true)
      console.log("Fetching financial insights for user:", user.uid);
      
      const response = await fetch('/api/financial-insights', {
        headers: {
          'Authorization': `Bearer ${user.uid}`
        }
      });
      
      console.log("API response status:", response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error("API error response:", errorData);
        throw new Error(errorData.error || 'Failed to fetch insights');
      }
      
      const data = await response.json();
      console.log("Received insights data:", {
        hasInsights: !!data.insights,
        hasMarkdown: !!(data.insights?.markdownContent),
        contentLength: data.insights?.markdownContent?.length || 0
      });
      
      // Check if we have valid insights data
      if (!data.insights || !data.insights.markdownContent) {
        throw new Error("Invalid insights data received");
      }
      
      setInsights(data.insights);
      
      toast.success("Insights updated", {
        description: "Your financial insights have been refreshed",
      });
    } catch (error) {
      console.error("Error fetching insights:", error);
      toast.error("Failed to fetch financial insights", {
        description: error.message || "Please try again later",
      });
      
      // For demo purposes, provide fallback insights if fetch fails
      if (goals.length > 0 || transactions.length > 0) {
        const fallbackInsights = generateFallbackInsights(goals, transactions);
        setInsights(fallbackInsights);
      } else {
        // Set default error message if insights fetch fails and no data
        setInsights({
          markdownContent: `## Unable to Generate Insights

We encountered a problem while analyzing your financial data: ${error.message}.

Please try again later or contact support if this problem persists.`
        });
      }
    } finally {
      setInsightsLoading(false);
    }
  };

  // Generate fallback insights if API fails but we have data
  const generateFallbackInsights = (goals, transactions) => {
    // Calculate total expenses and income
    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + (t.amount || 0), 0);
    
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + (t.amount || 0), 0);
    
    return {
      markdownContent: `## Financial Insights Summary

You have ${transactions.length} transaction(s) and ${goals.length} financial goal(s).

### Spending Patterns

${totalExpenses > 0 
  ? `Your total expenses are ₹${totalExpenses.toLocaleString('en-IN')}.` 
  : 'No expense transactions recorded yet.'}

${totalIncome > 0 
  ? `Your total income is ₹${totalIncome.toLocaleString('en-IN')}.` 
  : 'No income transactions recorded yet.'}

### Goal Progress Analysis

${goals.length > 0 
  ? goals.map(goal => {
      const progress = goal.targetAmount > 0 
        ? Math.min(Math.round((goal.currentAmount / goal.targetAmount) * 100), 100) 
        : 0;
      return `- **${goal.name}** - ₹${goal.currentAmount?.toLocaleString('en-IN') || 0}/₹${goal.targetAmount?.toLocaleString('en-IN')} (${progress}% complete)`;
    }).join('\n')
  : 'No goals set yet. Add financial goals to track your progress.'}

### Recommendations

1. Continue tracking your expenses and income regularly
2. Set realistic financial goals with specific time frames
3. Review your progress weekly to stay on track

> **Note**: This is a fallback summary generated locally. Refresh to try connecting to the AI for more detailed insights.`
    };
  };
  
  // Fetch insights when transactions or goals change
  useEffect(() => {
    if (user && !goalsLoading && !transactionsLoading) {
      fetchInsights()
    }
  }, [user, goalsLoading, transactionsLoading])

  // Calculate financial summary
  const calculateSummary = () => {
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + (t.amount || 0), 0)
    
    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + (t.amount || 0), 0)
    
    const netSavings = totalIncome - totalExpenses
    
    const recentActivity = transactions.length

    return { totalIncome, totalExpenses, netSavings, recentActivity }
  }

  const { totalIncome, totalExpenses, netSavings, recentActivity } = calculateSummary()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-primary/20"></div>
          <div className="h-4 w-32 rounded-md bg-muted"></div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl animate-in fade-in duration-500">
      {/* Header section */}
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Welcome, {user.displayName || 'User'}
        </h1>
        <p className="text-muted-foreground">
          Track your financial journey and achieve your goals
        </p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card className="bg-card/60 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Net Savings</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{netSavings.toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {transactions.length > 0 
                ? 'Income minus expenses' 
                : 'Start tracking your finances'}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card/60 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{goals.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {goals.length > 0 ? 'Goals in progress' : 'No active goals yet'}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card/60 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentActivity}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {recentActivity > 0 
                ? `Transactions in the last ${recentActivity} days` 
                : 'No recent transactions'}
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
              <AddGoalDialog />
            </div>
            <CardDescription>Set and track your savings goals</CardDescription>
          </CardHeader>
          <CardContent>
            {goalsLoading ? (
              <div className="flex flex-col space-y-3 py-2">
                <div className="space-y-2">
                  <div className="h-4 w-3/4 rounded bg-primary/10 animate-pulse"></div>
                  <div className="h-3 w-1/2 rounded bg-primary/10 animate-pulse"></div>
                  <div className="h-2 w-full rounded bg-primary/10 animate-pulse mt-2"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-3/4 rounded bg-primary/10 animate-pulse"></div>
                  <div className="h-3 w-1/2 rounded bg-primary/10 animate-pulse"></div>
                  <div className="h-2 w-full rounded bg-primary/10 animate-pulse mt-2"></div>
                </div>
              </div>
            ) : goals.length > 0 ? (
              <div className="space-y-4">
                {goals.map(goal => {
                  const progress = goal.targetAmount > 0 
                    ? Math.min(Math.round((goal.currentAmount / goal.targetAmount) * 100), 100) 
                    : 0
                    
                  return (
                    <div key={goal.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-sm">{goal.name}</h3>
                        <span className="text-xs text-muted-foreground">
                          {progress}%
                        </span>
                      </div>
                      
                      <Progress value={progress} className="h-2" />
                      
                      <div className="flex justify-between text-xs text-muted-foreground pt-1">
                        <div className="flex items-center gap-1">
                          <Wallet className="h-3 w-3" />
                          <span>
                            ₹{goal.currentAmount?.toLocaleString('en-IN') || 0} / 
                            ₹{goal.targetAmount?.toLocaleString('en-IN')}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>
                            {goal.targetDate ? format(goal.targetDate, 'PP') : 'No date'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground">
                <div className="rounded-full bg-primary/10 p-3 mb-3">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm mb-2">No goals created yet</p>
                <p className="text-xs max-w-[15rem]">Set financial goals to track your savings progress</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="bg-card/60 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-primary">Recent Transactions</CardTitle>
              <AddTransactionDialog />
            </div>
            <CardDescription>Track your income and expenses</CardDescription>
          </CardHeader>
          <CardContent>
            {transactionsLoading ? (
              <div className="flex flex-col space-y-3 py-2">
                <div className="space-y-2">
                  <div className="h-4 w-3/4 rounded bg-primary/10 animate-pulse"></div>
                  <div className="h-3 w-1/2 rounded bg-primary/10 animate-pulse"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-3/4 rounded bg-primary/10 animate-pulse"></div>
                  <div className="h-3 w-1/2 rounded bg-primary/10 animate-pulse"></div>
                </div>
              </div>
            ) : transactions.length > 0 ? (
              <div className="space-y-3">
                {transactions.map(transaction => (
                  <div key={transaction.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "rounded-full p-2 mt-0.5", 
                        transaction.type === 'income' 
                          ? "bg-green-500/10 text-green-500" 
                          : "bg-red-500/10 text-red-500"
                      )}>
                        {transaction.type === 'income' 
                          ? <ArrowUp className="h-3 w-3" /> 
                          : <ArrowDown className="h-3 w-3" />}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">{transaction.category}</h4>
                        {transaction.description && (
                          <p className="text-xs text-muted-foreground line-clamp-1 max-w-[160px]">
                            {transaction.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={cn(
                        "text-sm font-medium", 
                        transaction.type === 'income' ? "text-green-500" : "text-red-500"
                      )}>
                        {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {transaction.date ? format(transaction.date, 'dd MMM') : 'No date'}
                      </span>
                    </div>
                  </div>
                ))}
                <div className="flex justify-center pt-2">
                  <Button variant="ghost" size="sm" className="text-xs">
                    View All Transactions
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground">
                <div className="rounded-full bg-primary/10 p-3 mb-3">
                  <Wallet className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm mb-2">No transactions yet</p>
                <p className="text-xs max-w-[15rem]">Start logging your transactions to track your spending</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* AI Financial Insights (Full width) */}
      <div className="mt-6">
        <Card className="bg-card/60 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-primary flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                AI Financial Insights
              </CardTitle>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={fetchInsights} 
                disabled={insightsLoading}
                className="gap-1"
              >
                <RefreshCw className={cn("h-3.5 w-3.5", insightsLoading && "animate-spin")} />
                Refresh
              </Button>
            </div>
            <CardDescription>Personalized analysis of your financial data</CardDescription>
          </CardHeader>
          <CardContent>
            {insightsLoading ? (
              <div className="flex flex-col gap-4">
                <div className="h-4 bg-muted/30 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-muted/30 rounded animate-pulse w-1/2"></div>
                <div className="h-4 bg-muted/30 rounded animate-pulse w-5/6"></div>
              </div>
            ) : insights?.markdownContent ? (
              <div className="markdown-insights">
                <style jsx global>{`
                  .markdown-insights {
                    color: var(--foreground);
                    max-width: 100%;
                  }
                  .markdown-insights h1 {
                    font-size: 1.5rem;
                    font-weight: 600;
                    margin-top: 1.5rem;
                    margin-bottom: 1rem;
                    color: var(--foreground);
                  }
                  .markdown-insights h2 {
                    font-size: 1.3rem;
                    font-weight: 600;
                    margin-top: 1.25rem;
                    margin-bottom: 0.75rem;
                    color: hsl(var(--primary));
                  }
                  .markdown-insights h3 {
                    font-size: 1.1rem;
                    font-weight: 600;
                    margin-top: 1rem;
                    margin-bottom: 0.5rem;
                    color: hsl(var(--primary));
                  }
                  .markdown-insights p {
                    margin-bottom: 0.75rem;
                    line-height: 1.6;
                  }
                  .markdown-insights strong {
                    font-weight: 600;
                    color: hsl(var(--primary));
                  }
                  .markdown-insights ul, .markdown-insights ol {
                    padding-left: 1.5rem;
                    margin-bottom: 1rem;
                  }
                  .markdown-insights ul li, .markdown-insights ol li {
                    margin-bottom: 0.25rem;
                  }
                  .markdown-insights ul li::marker {
                    color: hsl(var(--primary));
                  }
                  .markdown-insights ol li::marker {
                    color: hsl(var(--primary));
                  }
                  .markdown-insights blockquote {
                    border-left: 3px solid hsl(var(--primary));
                    padding-left: 1rem;
                    font-style: italic;
                    margin: 1rem 0;
                    color: hsl(var(--muted-foreground));
                  }
                  .markdown-insights code {
                    background-color: hsl(var(--muted));
                    padding: 0.2em 0.4em;
                    border-radius: 0.25rem;
                    font-family: monospace;
                    font-size: 0.9em;
                  }
                  .markdown-insights hr {
                    border: 0;
                    border-top: 1px solid hsl(var(--border));
                    margin: 1.5rem 0;
                  }
                  .markdown-insights table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 1rem 0;
                  }
                  .markdown-insights th, .markdown-insights td {
                    border: 1px solid hsl(var(--border));
                    padding: 0.5rem;
                  }
                  .markdown-insights th {
                    background-color: hsl(var(--muted));
                    font-weight: 600;
                  }
                `}</style>
                <ReactMarkdown>
                  {insights.markdownContent}
                </ReactMarkdown>
              </div>
            ) : insights?.error ? (
              <div className="markdown-insights">
                <style jsx global>{`
                  .markdown-insights .error-title {
                    font-size: 1.3rem;
                    font-weight: 600;
                    margin-top: 1.25rem;
                    margin-bottom: 0.75rem;
                    color: #e11d48; /* Red color for error */
                  }
                  .markdown-insights .error-message {
                    margin-bottom: 0.75rem;
                    line-height: 1.6;
                  }
                  .markdown-insights .error-help {
                    margin-bottom: 0.75rem;
                    line-height: 1.6;
                    color: hsl(var(--muted-foreground));
                  }
                `}</style>
                <h2 className="error-title">Error</h2>
                <p className="error-message">{insights.error}</p>
                <p className="error-help">Please try refreshing the insights or contact support if the problem persists.</p>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">Add transactions and goals to get personalized insights</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={fetchInsights} 
                  className="mt-4"
                >
                  Generate Insights
                </Button>
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
              <Button size="sm" variant="outline" asChild className="h-8">
                <a href="/resources">View All</a>
              </Button>
            </div>
            <CardDescription>Learn financial management skills</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground">
              <div className="rounded-full bg-primary/10 p-3 mb-3">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <p className="text-sm mb-2">Explore learning resources</p>
              <p className="text-xs max-w-[15rem]">Access guides and articles about personal finance</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 