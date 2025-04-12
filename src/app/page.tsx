import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Brain, 
  BookOpen, 
  Shield, 
  Mic, 
  ArrowRight, 
  CheckCircle2, 
  LightbulbIcon, 
  Users,
  BarChart3
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 lg:py-32 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100/40 via-purple-100/30 to-background dark:from-pink-950/40 dark:via-purple-950/30 dark:to-background -z-10" />
        
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-pink-200 dark:bg-pink-900/20 rounded-full filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 dark:bg-purple-900/20 rounded-full filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2" />
        
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="flex flex-col space-y-6 lg:w-1/2 text-center lg:text-left">
              <div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter mb-4 animate-in fade-in slide-in-from-bottom-5 duration-700">
                  Empowering Women's{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 dark:from-pink-400 dark:to-purple-500">
                    Financial Freedom
                  </span>
          </h1>
                <p className="text-xl text-muted-foreground max-w-[42rem] mx-auto lg:mx-0 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
            Take control of your financial future with Nayidisha. Smart goal tracking,
            AI-powered insights, and a supportive community designed for women.
          </p>
              </div>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 animate-in fade-in slide-in-from-bottom-7 duration-700 delay-300">
                <Button asChild size="lg" className="text-base gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-md">
                  <Link href="/auth">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Link>
            </Button>
                <Button asChild variant="outline" size="lg" className="text-base">
                  <Link href="#how-it-works">How It Works</Link>
            </Button>
              </div>
            </div>
            
            <div className="lg:w-1/2 animate-in fade-in slide-in-from-right-6 duration-1000">
              <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-xl">
                <img
                  src="https://images.pexels.com/photos/7172830/pexels-photo-7172830.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Women discussing finances"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-white text-xl font-medium mb-1">Join 1,000+ women</p>
                    <p className="text-white/90 text-sm">Building their financial future with Nayidisha</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-pink-50/50 dark:bg-pink-950/10" id="features">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 dark:from-pink-400 dark:to-purple-500">
              Features Designed For You
          </h2>
            <p className="text-lg text-muted-foreground">
              We've built tools that make financial management accessible, intuitive, and tailored to your needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-card/60 backdrop-blur-sm rounded-xl p-6 shadow-md border border-purple-100 dark:border-purple-900/20 hover:shadow-lg hover:border-purple-200 dark:hover:border-purple-800/30 transition-all">
              <div className="bg-pink-100 dark:bg-pink-900/30 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-pink-600 dark:text-pink-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Goal Setting</h3>
              <p className="text-muted-foreground">
                Set personalized financial goals with intelligent suggestions based on your income and spending patterns. Track progress visually and celebrate achievements.
              </p>
            </div>
            
            <div className="bg-white dark:bg-card/60 backdrop-blur-sm rounded-xl p-6 shadow-md border border-purple-100 dark:border-purple-900/20 hover:shadow-lg hover:border-purple-200 dark:hover:border-purple-800/30 transition-all">
              <div className="bg-purple-100 dark:bg-purple-900/30 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Mic className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Voice-Enabled Tracking</h3>
              <p className="text-muted-foreground">
                Simply speak your transactions and our AI will categorize and log them automatically. No more tedious manual entry or forgotten expenses.
              </p>
            </div>
            
            <div className="bg-white dark:bg-card/60 backdrop-blur-sm rounded-xl p-6 shadow-md border border-purple-100 dark:border-purple-900/20 hover:shadow-lg hover:border-purple-200 dark:hover:border-purple-800/30 transition-all">
              <div className="bg-pink-100 dark:bg-pink-900/30 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-pink-600 dark:text-pink-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Financial Education</h3>
              <p className="text-muted-foreground">
                Access bite-sized, practical learning modules on investing, budgeting, and long-term planning - designed specifically for women's financial journeys.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20" id="how-it-works">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 dark:from-pink-400 dark:to-purple-500">
              How NayiDisha Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Our intuitive platform makes financial management simple and effective
            </p>
          </div>

          <div className="grid gap-12 relative">
            {/* Decorative line */}
            <div className="absolute left-[42px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-300 to-purple-400 dark:from-pink-600 dark:to-purple-600 hidden md:block"></div>

            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 text-2xl font-bold shrink-0 border-4 border-background z-10">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-3">Set Your Financial Goals</h3>
                <p className="text-muted-foreground mb-4">
                  Define what financial success means to you. Whether it's saving for a home, starting a business, or building an emergency fund, Nayidisha helps you set realistic and achievable goals.
                </p>
                <div className="relative w-full h-[200px] rounded-lg overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/7691668/pexels-photo-7691668.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Woman setting financial goals"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-2xl font-bold shrink-0 border-4 border-background z-10">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-3">Track Your Progress Effortlessly</h3>
                <p className="text-muted-foreground mb-4">
                  Log transactions with a simple voice command or quick entry. Our AI assistant categorizes your spending and updates your progress automatically, giving you real-time insights.
                </p>
                <div className="relative w-full h-[200px] rounded-lg overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/7680751/pexels-photo-7680751.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Woman using mobile app"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 text-2xl font-bold shrink-0 border-4 border-background z-10">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-3">Gain Financial Insight</h3>
                <p className="text-muted-foreground mb-4">
                  Receive personalized insights and recommendations based on your spending patterns and goals. Our AI identifies opportunities for savings and helps you make informed financial decisions.
                </p>
                <div className="relative w-full h-[200px] rounded-lg overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/6266272/pexels-photo-6266272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Woman analyzing finances"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-purple-50/50 dark:bg-purple-950/10" id="why-us">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-xl">
                <img
                  src="https://images.pexels.com/photos/5900029/pexels-photo-5900029.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Women discussing finances"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-white text-xl font-medium mb-1">Created by the Men, for women</p>
                    <p className="text-white/90 text-sm">Understanding the unique financial journey of women</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 dark:from-pink-400 dark:to-purple-500">
                Why Choose Nayidisha
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We understand the unique financial challenges women face and have built a platform that addresses these specific needs.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <CheckCircle2 className="h-6 w-6 text-pink-600 dark:text-pink-400 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium mb-1">Designed Specifically for Women</h3>
                    <p className="text-muted-foreground">
                      We acknowledge the gender-specific financial challenges like pay gaps, career breaks, and longer life expectancy that impact women's financial planning.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <CheckCircle2 className="h-6 w-6 text-purple-600 dark:text-purple-400 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium mb-1">Privacy and Security Focused</h3>
                    <p className="text-muted-foreground">
                      Your financial data is encrypted and private. We implement bank-level security measures to keep your information safe.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <CheckCircle2 className="h-6 w-6 text-pink-600 dark:text-pink-400 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium mb-1">Judgment-Free Zone</h3>
                    <p className="text-muted-foreground">
                      We provide a supportive environment where you can learn and grow financially without feeling judged for your current knowledge or situation.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <CheckCircle2 className="h-6 w-6 text-purple-600 dark:text-purple-400 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium mb-1">Practical AI Technology</h3>
                    <p className="text-muted-foreground">
                      Our AI is designed to fit into your life seamlessly, making financial management easier rather than more complicated.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 dark:from-pink-400 dark:to-purple-500">
              Success Stories
            </h2>
            <p className="text-lg text-muted-foreground">
              Hear from women who have transformed their financial lives with Nayidisha
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-pink-50 dark:bg-pink-900/10 rounded-xl p-6 border border-pink-100 dark:border-pink-800/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden relative">
                  <img
                    src="https://images.pexels.com/photos/28943576/pexels-photo-28943576/free-photo-of-elegant-woman-reading-newspaper-outdoors.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Priya S."
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Priya S.</h4>
                  <p className="text-sm text-muted-foreground">Small Business Owner</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "Nayidisha helped me save enough to expand my business while balancing my personal finances. The voice tracking feature saves me so much time!"
              </p>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/10 rounded-xl p-6 border border-purple-100 dark:border-purple-800/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden relative">
                  <img
                    src="https://images.pexels.com/photos/17348075/pexels-photo-17348075/free-photo-of-woman-in-eyeglasses-on-sea-shore.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Aisha J."
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Aisha J.</h4>
                  <p className="text-sm text-muted-foreground">Teacher</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "After my divorce, I needed to rebuild my financial confidence. Nayidisha's educational resources and goal tracking gave me the tools I needed."
              </p>
            </div>
            
            <div className="bg-pink-50 dark:bg-pink-900/10 rounded-xl p-6 border border-pink-100 dark:border-pink-800/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1558507652-2d9626c4e67a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80"
                    alt="Maya T."
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Maya T.</h4>
                  <p className="text-sm text-muted-foreground">Healthcare Professional</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "I've tried other financial apps but none understood my needs as a single mother. Nayidisha's insights helped me balance saving for my daughter's education and my retirement."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold">Ready to Transform Your Financial Future?</h2>
            <p className="text-xl opacity-90">
              Join thousands of women taking control of their finances and building a brighter tomorrow.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" variant="secondary" className="text-base bg-white text-purple-600 hover:bg-gray-100 shadow-lg">
            <Link href="/auth">Create Your Account</Link>
          </Button>
              <Button asChild size="lg" variant="outline" className="text-base bg-transparent border-white text-white hover:bg-white/10">
                <Link href="/resources">Explore Resources</Link>
              </Button>
            </div>
            <p className="text-sm opacity-80 max-w-lg mx-auto">
              Get started for free. No credit card required. Begin your journey to financial empowerment today.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
