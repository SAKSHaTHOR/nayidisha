'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { auth } from '@/firebase/clientApp'
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { ArrowRight, Mail, Lock, User, Key, Sparkles, Heart } from 'lucide-react'
import Link from 'next/link'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('signin')
  const router = useRouter()
  const googleProvider = new GoogleAuthProvider()

  const handleEmailSignIn = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error('Please enter email and password')
      return
    }
    
    setIsLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast.success('Successfully signed in!')
      router.push('/dashboard')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailSignUp = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error('Please enter email and password')
      return
    }
    
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }
    
    setIsLoading(true)
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      toast.success('Account created successfully!')
      router.push('/dashboard')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      await signInWithPopup(auth, googleProvider)
      toast.success('Successfully signed in with Google!')
      router.push('/dashboard')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-pink-200/30 dark:bg-pink-900/20 rounded-full filter blur-3xl opacity-50 -translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-200/30 dark:bg-purple-900/20 rounded-full filter blur-3xl opacity-50 translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-100/20 dark:bg-pink-800/10 rounded-full filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2" />
      
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left column with illustration and text */}
          <div className="hidden lg:flex flex-col lg:w-1/2 text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold">
                Welcome to{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 dark:from-pink-400 dark:to-purple-500">
                  Nayidisha
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Your journey to financial freedom starts here
              </p>
            </div>
            
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1573164574572-cb89e39749b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" 
                  alt="Women empowerment"
                  className="w-full h-auto object-cover"
                />
              </div>
              
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-black/70 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="flex gap-3 items-center">
                  <Sparkles className="h-5 w-5 text-pink-500" />
                  <p className="font-medium">Join 1,000+ women already taking control of their finances</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex gap-2 items-center">
                <Heart className="h-5 w-5 text-pink-500" />
                <p>Safe, secure, and designed specifically for women</p>
              </div>
              <div className="flex gap-2 items-center">
                <Heart className="h-5 w-5 text-purple-500" />
                <p>Financial tools that understand your unique journey</p>
              </div>
            </div>
          </div>
          
          {/* Right column with auth form */}
          <div className="w-full lg:w-1/2 max-w-md mx-auto">
            <div className="lg:hidden text-center mb-8 space-y-3">
              <h1 className="text-3xl font-bold">
                Welcome to{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 dark:from-pink-400 dark:to-purple-500">
                  Nayidisha
                </span>
              </h1>
              <p className="text-muted-foreground">Your journey to financial freedom starts here</p>
            </div>
            
            <Card className="border border-purple-100/70 dark:border-purple-800/20 shadow-xl backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
              <CardHeader className="space-y-1 pb-2">
                <CardTitle className="text-2xl font-bold text-center">
                  {activeTab === 'signin' ? 'Sign In' : 'Create Account'}
                </CardTitle>
                <CardDescription className="text-center">
                  {activeTab === 'signin' 
                    ? 'Enter your email below to access your account' 
                    : 'Enter your details to create your account'}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <Tabs 
                  defaultValue="signin" 
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger 
                      value="signin"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                    >
                      Sign In
                    </TabsTrigger>
                    <TabsTrigger 
                      value="signup"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                    >
                      Sign Up
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="signin" className="space-y-5">
                    <form onSubmit={handleEmailSignIn} className="space-y-5">
                      <div className="space-y-2">
                        <Label 
                          htmlFor="email"
                          className="text-sm font-medium flex items-center gap-2"
                        >
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          Email
                        </Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          disabled={isLoading}
                          className="h-11 px-4 bg-muted/40"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label 
                            htmlFor="password"
                            className="text-sm font-medium flex items-center gap-2"
                          >
                            <Lock className="h-4 w-4 text-muted-foreground" />
                            Password
                          </Label>
                          <a href="#" className="text-xs text-primary hover:underline flex items-center gap-1">
                            <Key className="h-3 w-3" />
                            Forgot password?
                          </a>
                        </div>
                        <Input 
                          id="password" 
                          type="password" 
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          disabled={isLoading}
                          className="h-11 px-4 bg-muted/40"
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full h-11 text-base bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transition-all duration-300" 
                        disabled={isLoading}
                      >
                        {isLoading ? 'Signing in...' : 'Sign In'} 
                        {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                      </Button>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="signup" className="space-y-5">
                    <form onSubmit={handleEmailSignUp} className="space-y-5">
                      <div className="space-y-2">
                        <Label 
                          htmlFor="name-signup"
                          className="text-sm font-medium flex items-center gap-2"
                        >
                          <User className="h-4 w-4 text-muted-foreground" />
                          Name
                        </Label>
                        <Input 
                          id="name-signup" 
                          type="text" 
                          placeholder="Your Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="h-11 px-4 bg-muted/40"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label 
                          htmlFor="email-signup"
                          className="text-sm font-medium flex items-center gap-2"
                        >
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          Email
                        </Label>
                        <Input 
                          id="email-signup" 
                          type="email" 
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          disabled={isLoading}
                          className="h-11 px-4 bg-muted/40"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label 
                          htmlFor="password-signup"
                          className="text-sm font-medium flex items-center gap-2"
                        >
                          <Lock className="h-4 w-4 text-muted-foreground" />
                          Password
                        </Label>
                        <Input 
                          id="password-signup" 
                          type="password" 
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          disabled={isLoading}
                          className="h-11 px-4 bg-muted/40"
                        />
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Key className="h-3 w-3" />
                          Password must be at least 6 characters
                        </p>
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full h-11 text-base bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transition-all duration-300" 
                        disabled={isLoading}
                      >
                        {isLoading ? 'Creating account...' : 'Create Account'}
                        {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
                
                <div className="relative mt-8 mb-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-3 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full h-11 border-purple-100 dark:border-purple-800/30 hover:bg-purple-50/50 dark:hover:bg-purple-900/20 relative overflow-hidden group" 
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                >
                  <span className="absolute inset-0 w-0 bg-gradient-to-r from-pink-100/20 to-purple-100/20 dark:from-pink-800/20 dark:to-purple-800/20 group-hover:w-full transition-all duration-300"></span>
                  <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                    <path d="M1 1h22v22H1z" fill="none" />
                  </svg>
                  <span className="relative">Sign in with Google</span>
                </Button>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4 mt-2">
                <p className="text-xs text-center text-muted-foreground">
                  By signing up, you agree to our{" "}
                  <Link href="#" className="text-primary hover:underline">Terms of Service</Link>
                  {" "}and{" "}
                  <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>
                </p>
                
                <div className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
                  <Sparkles className="h-3 w-3 text-pink-500" />
                  <span>Your financial journey is about to get a whole lot better</span>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 