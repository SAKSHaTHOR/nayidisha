import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Download, 
  Play, 
  BookOpen, 
  Calculator, 
  ArrowRight, 
  BadgeIndianRupee, 
  Wallet, 
  Clock, 
  Sparkles,
  Search,
  Briefcase,
  Home,
  GraduationCap
} from "lucide-react";

export const metadata = {
  title: "Financial Resources - Nayidisha",
  description: "Educational resources, tools, and guides for women's financial empowerment",
};

export default function ResourcesPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-20 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100/40 via-purple-100/30 to-background dark:from-pink-950/40 dark:via-purple-950/30 dark:to-background -z-10" />
        
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-pink-200/20 dark:bg-pink-900/10 rounded-full filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-200/20 dark:bg-purple-900/10 rounded-full filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2" />
        
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl font-bold tracking-tight animate-in fade-in slide-in-from-bottom-5 duration-700">
              Financial Resources for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 dark:from-pink-400 dark:to-purple-500">
                Every Woman
              </span>
            </h1>
            <p className="text-xl text-muted-foreground animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
              Access curated guides, tools, and educational content designed to empower your financial journey.
            </p>
            <div className="relative max-w-lg mx-auto animate-in fade-in slide-in-from-bottom-7 duration-700 delay-300">
              <div className="bg-white dark:bg-white/5 border border-purple-100 dark:border-purple-800/20 flex items-center rounded-full px-4 py-2 shadow-sm">
                <Search className="h-5 w-5 text-muted-foreground mr-2" />
                <input 
                  type="text" 
                  placeholder="Search for resources..." 
                  className="flex-1 bg-transparent border-none outline-none py-2 text-foreground placeholder:text-muted-foreground"
                />
                <Button size="sm" className="rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white h-9 px-4">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 dark:from-pink-400 dark:to-purple-500">
            Featured Resources
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Featured Resource 1 */}
            <div className="group relative overflow-hidden rounded-xl bg-white dark:bg-card/60 border border-purple-100 dark:border-purple-900/20 shadow-md hover:shadow-lg transition-all">
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/6963944/pexels-photo-6963944.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Indian women discussing finances"
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="absolute top-4 right-4 bg-pink-500 text-white text-xs font-medium px-2.5 py-1 rounded">
                New
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <BadgeIndianRupee className="h-4 w-4 text-pink-500" />
                  <span className="text-xs font-medium text-pink-500">Financial Planning</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-pink-500 transition-colors">
                  Building Financial Independence: A Guide for Indian Women
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  Learn how to take control of your finances, build savings, and achieve true financial independence.
                </p>
                <Button variant="outline" className="w-full justify-between group-hover:border-pink-500 group-hover:text-pink-500 transition-colors">
                  Read Guide
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Featured Resource 2 */}
            <div className="group relative overflow-hidden rounded-xl bg-white dark:bg-card/60 border border-purple-100 dark:border-purple-900/20 shadow-md hover:shadow-lg transition-all">
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/7841819/pexels-photo-7841819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Indian woman using laptop for finances"
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="absolute top-4 right-4 bg-purple-500 text-white text-xs font-medium px-2.5 py-1 rounded">
                Video
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase className="h-4 w-4 text-purple-500" />
                  <span className="text-xs font-medium text-purple-500">Career & Finance</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-500 transition-colors">
                  Negotiating Your Salary: Tips for Professional Women in India
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  Learn effective strategies to negotiate your worth in the workplace with confidence.
                </p>
                <Button variant="outline" className="w-full justify-between group-hover:border-purple-500 group-hover:text-purple-500 transition-colors">
                  Watch Video
                  <Play className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Featured Resource 3 */}
            <div className="group relative overflow-hidden rounded-xl bg-white dark:bg-card/60 border border-purple-100 dark:border-purple-900/20 shadow-md hover:shadow-lg transition-all">
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/7821478/pexels-photo-7821478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Indian woman with child planning finances"
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="absolute top-4 right-4 bg-pink-500 text-white text-xs font-medium px-2.5 py-1 rounded">
                Guide
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap className="h-4 w-4 text-pink-500" />
                  <span className="text-xs font-medium text-pink-500">Family Finance</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-pink-500 transition-colors">
                  Planning for Your Child's Education: A Mother's Guide
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  Strategic approaches to saving and investing for your children's educational future.
                </p>
                <Button variant="outline" className="w-full justify-between group-hover:border-pink-500 group-hover:text-pink-500 transition-colors">
                  Read Guide
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 md:py-16 bg-purple-50/50 dark:bg-purple-950/10">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-12 text-center">Browse by Category</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {/* Category 1 */}
            <Link href="#" className="group flex flex-col items-center p-6 rounded-xl bg-white dark:bg-card/60 border border-purple-100 dark:border-purple-900/20 shadow-sm hover:shadow-md hover:border-pink-300 dark:hover:border-pink-700 transition-all">
              <div className="w-14 h-14 rounded-full bg-pink-100 dark:bg-pink-900/20 flex items-center justify-center mb-4 group-hover:bg-pink-200 dark:group-hover:bg-pink-800/30 transition-colors">
                <BadgeIndianRupee className="h-6 w-6 text-pink-500" />
              </div>
              <h3 className="text-base font-medium text-center">Basic Financial Planning</h3>
            </Link>

            {/* Category 2 */}
            <Link href="#" className="group flex flex-col items-center p-6 rounded-xl bg-white dark:bg-card/60 border border-purple-100 dark:border-purple-900/20 shadow-sm hover:shadow-md hover:border-purple-300 dark:hover:border-purple-700 transition-all">
              <div className="w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mb-4 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/30 transition-colors">
                <Wallet className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-base font-medium text-center">Savings & Investments</h3>
            </Link>

            {/* Category 3 */}
            <Link href="#" className="group flex flex-col items-center p-6 rounded-xl bg-white dark:bg-card/60 border border-purple-100 dark:border-purple-900/20 shadow-sm hover:shadow-md hover:border-pink-300 dark:hover:border-pink-700 transition-all">
              <div className="w-14 h-14 rounded-full bg-pink-100 dark:bg-pink-900/20 flex items-center justify-center mb-4 group-hover:bg-pink-200 dark:group-hover:bg-pink-800/30 transition-colors">
                <Home className="h-6 w-6 text-pink-500" />
              </div>
              <h3 className="text-base font-medium text-center">Home Ownership</h3>
            </Link>

            {/* Category 4 */}
            <Link href="#" className="group flex flex-col items-center p-6 rounded-xl bg-white dark:bg-card/60 border border-purple-100 dark:border-purple-900/20 shadow-sm hover:shadow-md hover:border-purple-300 dark:hover:border-purple-700 transition-all">
              <div className="w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mb-4 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/30 transition-colors">
                <Briefcase className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-base font-medium text-center">Career Growth</h3>
            </Link>

            {/* Category 5 */}
            <Link href="#" className="group flex flex-col items-center p-6 rounded-xl bg-white dark:bg-card/60 border border-purple-100 dark:border-purple-900/20 shadow-sm hover:shadow-md hover:border-pink-300 dark:hover:border-pink-700 transition-all">
              <div className="w-14 h-14 rounded-full bg-pink-100 dark:bg-pink-900/20 flex items-center justify-center mb-4 group-hover:bg-pink-200 dark:group-hover:bg-pink-800/30 transition-colors">
                <GraduationCap className="h-6 w-6 text-pink-500" />
              </div>
              <h3 className="text-base font-medium text-center">Education Planning</h3>
            </Link>

            {/* Category 6 */}
            <Link href="#" className="group flex flex-col items-center p-6 rounded-xl bg-white dark:bg-card/60 border border-purple-100 dark:border-purple-900/20 shadow-sm hover:shadow-md hover:border-purple-300 dark:hover:border-purple-700 transition-all">
              <div className="w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mb-4 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/30 transition-colors">
                <Clock className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-base font-medium text-center">Retirement Planning</h3>
            </Link>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
            <div>
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 dark:from-pink-400 dark:to-purple-500">
                Financial Tools
              </h2>
              <p className="text-muted-foreground">
                Interactive calculators and tools to help you plan your financial future
              </p>
            </div>
            <Button variant="outline" className="text-sm gap-2">
              View All Tools
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Tool 1 */}
            <div className="rounded-xl bg-white dark:bg-card/60 border border-purple-100 dark:border-purple-900/20 shadow-md p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-900/20 flex items-center justify-center mb-4">
                <Calculator className="h-6 w-6 text-pink-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Investment Calculator</h3>
              <p className="text-muted-foreground mb-4">
                Calculate the potential growth of your investments over time with different scenarios.
              </p>
              <Button variant="outline" className="w-full">
                Use Calculator
              </Button>
            </div>

            {/* Tool 2 */}
            <div className="rounded-xl bg-white dark:bg-card/60 border border-purple-100 dark:border-purple-900/20 shadow-md p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mb-4">
                <Home className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Home Loan EMI Calculator</h3>
              <p className="text-muted-foreground mb-4">
                Plan your home purchase by calculating your monthly EMI based on loan amount and interest rate.
              </p>
              <Button variant="outline" className="w-full">
                Use Calculator
              </Button>
            </div>

            {/* Tool 3 */}
            <div className="rounded-xl bg-white dark:bg-card/60 border border-purple-100 dark:border-purple-900/20 shadow-md p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-900/20 flex items-center justify-center mb-4">
                <GraduationCap className="h-6 w-6 text-pink-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Education Fund Calculator</h3>
              <p className="text-muted-foreground mb-4">
                Estimate how much you need to save for your child's higher education with inflation adjustments.
              </p>
              <Button variant="outline" className="w-full">
                Use Calculator
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Webinars Section */}
      <section className="py-12 md:py-16 bg-pink-50/50 dark:bg-pink-950/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-center">
            <div className="md:w-1/2 space-y-6">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 dark:from-pink-400 dark:to-purple-500">
                Upcoming Webinars & Workshops
              </h2>
              <p className="text-lg text-muted-foreground">
                Join our live sessions with financial experts to deepen your knowledge and ask questions in real-time.
              </p>
              
              <div className="space-y-4">
                {/* Webinar 1 */}
                <div className="bg-white dark:bg-card/60 border border-pink-100 dark:border-pink-800/20 rounded-lg p-4 shadow-sm">
                  <div className="flex gap-4">
                    <div className="min-w-16 text-center">
                      <div className="font-bold text-purple-500 text-lg">15</div>
                      <div className="text-xs text-muted-foreground">JUN</div>
                    </div>
                    <div>
                      <h3 className="font-medium">Women in Investing: Breaking Barriers in the Indian Market</h3>
                      <p className="text-sm text-muted-foreground mt-1">By Priya Sharma, Investment Specialist</p>
                    </div>
                  </div>
                </div>
                
                {/* Webinar 2 */}
                <div className="bg-white dark:bg-card/60 border border-purple-100 dark:border-purple-800/20 rounded-lg p-4 shadow-sm">
                  <div className="flex gap-4">
                    <div className="min-w-16 text-center">
                      <div className="font-bold text-pink-500 text-lg">22</div>
                      <div className="text-xs text-muted-foreground">JUN</div>
                    </div>
                    <div>
                      <h3 className="font-medium">Financial Independence for Homemakers: Managing Household Finances</h3>
                      <p className="text-sm text-muted-foreground mt-1">By Anita Desai, Personal Finance Coach</p>
                    </div>
                  </div>
                </div>
                
                {/* Webinar 3 */}
                <div className="bg-white dark:bg-card/60 border border-pink-100 dark:border-pink-800/20 rounded-lg p-4 shadow-sm">
                  <div className="flex gap-4">
                    <div className="min-w-16 text-center">
                      <div className="font-bold text-purple-500 text-lg">30</div>
                      <div className="text-xs text-muted-foreground">JUN</div>
                    </div>
                    <div>
                      <h3 className="font-medium">Tax Planning for Working Women: Maximizing Your Tax Benefits</h3>
                      <p className="text-sm text-muted-foreground mt-1">By Meera Patel, Tax Consultant</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white">
                View All Upcoming Events
              </Button>
            </div>
            
            <div className="md:w-1/2">
              <div className="relative">
                <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
                  <img
                    src="https://images.pexels.com/photos/5313361/pexels-photo-5313361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Women in a financial workshop"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button size="icon" className="h-16 w-16 rounded-full bg-pink-500/90 hover:bg-pink-600/90 text-white shadow-lg">
                    <Play className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free E-Books */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
            <div>
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 dark:from-pink-400 dark:to-purple-500">
                Free E-Books & Guides
              </h2>
              <p className="text-muted-foreground">
                Comprehensive resources you can download and read at your own pace
              </p>
            </div>
            <Button variant="outline" className="text-sm gap-2">
              View All E-Books
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* E-Book 1 */}
            <div className="group bg-white dark:bg-card/60 rounded-xl border border-purple-100 dark:border-purple-900/20 shadow-md overflow-hidden hover:shadow-lg transition-all">
              <div className="aspect-[3/4] relative overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/3755755/pexels-photo-3755755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Indian women discussing finances"
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                  <h3 className="text-white font-semibold text-lg mb-1">The Smart Woman's Guide to Investing</h3>
                  <p className="text-white/80 text-sm line-clamp-2">
                    A beginner-friendly guide to investing in Indian markets.
                  </p>
                </div>
              </div>
              <div className="p-4 flex justify-between items-center">
                <div className="text-xs font-medium text-muted-foreground">35 pages</div>
                <Button size="sm" variant="outline" className="gap-1">
                  <Download className="h-3.5 w-3.5" />
                  Download
                </Button>
              </div>
            </div>

            {/* E-Book 2 */}
            <div className="group bg-white dark:bg-card/60 rounded-xl border border-purple-100 dark:border-purple-900/20 shadow-md overflow-hidden hover:shadow-lg transition-all">
              <div className="aspect-[3/4] relative overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/7654357/pexels-photo-7654357.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Woman reading financial guide"
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                  <h3 className="text-white font-semibold text-lg mb-1">Budgeting Mastery for Working Women</h3>
                  <p className="text-white/80 text-sm line-clamp-2">
                    Practical techniques to manage expenses and build savings.
                  </p>
                </div>
              </div>
              <div className="p-4 flex justify-between items-center">
                <div className="text-xs font-medium text-muted-foreground">42 pages</div>
                <Button size="sm" variant="outline" className="gap-1">
                  <Download className="h-3.5 w-3.5" />
                  Download
                </Button>
              </div>
            </div>

            {/* E-Book 3 */}
            <div className="group bg-white dark:bg-card/60 rounded-xl border border-purple-100 dark:border-purple-900/20 shadow-md overflow-hidden hover:shadow-lg transition-all">
              <div className="aspect-[3/4] relative overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/7261499/pexels-photo-7261499.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Indian woman with tablet"
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                  <h3 className="text-white font-semibold text-lg mb-1">Financial Planning After Marriage</h3>
                  <p className="text-white/80 text-sm line-clamp-2">
                    Managing joint finances and building wealth together.
                  </p>
                </div>
              </div>
              <div className="p-4 flex justify-between items-center">
                <div className="text-xs font-medium text-muted-foreground">28 pages</div>
                <Button size="sm" variant="outline" className="gap-1">
                  <Download className="h-3.5 w-3.5" />
                  Download
                </Button>
              </div>
            </div>

            {/* E-Book 4 */}
            <div className="group bg-white dark:bg-card/60 rounded-xl border border-purple-100 dark:border-purple-900/20 shadow-md overflow-hidden hover:shadow-lg transition-all">
              <div className="aspect-[3/4] relative overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/6990544/pexels-photo-6990544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Woman entrepreneur"
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                  <h3 className="text-white font-semibold text-lg mb-1">Entrepreneurship Guide for Indian Women</h3>
                  <p className="text-white/80 text-sm line-clamp-2">
                    From idea to execution: Building your own business.
                  </p>
                </div>
              </div>
              <div className="p-4 flex justify-between items-center">
                <div className="text-xs font-medium text-muted-foreground">53 pages</div>
                <Button size="sm" variant="outline" className="gap-1">
                  <Download className="h-3.5 w-3.5" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-white" />
                <span className="text-sm font-medium">Personalized Learning</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold">Ready to Start Your Financial Education Journey?</h2>
            <p className="text-xl opacity-90">
              Create an account to access all resources, track your progress, and receive personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
              <Button asChild size="lg" variant="secondary" className="text-base bg-white text-purple-600 hover:bg-gray-100 shadow-lg">
                <Link href="/auth">Create Your Account</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base bg-transparent border-white text-white hover:bg-white/10">
                <Link href="/#how-it-works">Learn How It Works</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 