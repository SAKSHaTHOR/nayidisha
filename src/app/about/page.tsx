import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Heart, Users, Goal, Award, ArrowRight } from "lucide-react";

export const metadata = {
  title: "About Us - Nayidisha",
  description: "Learn about Nayidisha's mission to empower women through financial literacy",
};

export default function AboutPage() {
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
              About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 dark:from-pink-400 dark:to-purple-500">
                NayiDisha
              </span>
            </h1>
            <p className="text-xl text-muted-foreground animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
              Empowering women across India through financial education, tools, and community support.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://images.pexels.com/photos/7580636/pexels-photo-7580636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Women discussing financial planning"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl p-6 shadow-lg max-w-xs">
                <div className="text-white text-lg font-medium">
                  "Financial independence is about giving women the freedom to make their own choices."
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-pink-100 dark:bg-pink-900/20 rounded-full px-3 py-1">
                <Heart className="w-4 h-4 text-pink-500" />
                <span className="text-sm font-medium text-pink-700 dark:text-pink-300">Our Story</span>
              </div>
              
              <h2 className="text-3xl font-bold">Bridging the Financial Literacy Gap</h2>
              
              <p className="text-lg text-muted-foreground">
                NayiDisha was founded in 2022 with a clear mission: to help close the financial literacy gap for women in India. 
                Our founders recognized that despite tremendous progress in education and career opportunities, many women still 
                lacked access to practical financial knowledge and tools tailored to their unique needs.
              </p>
              
              <p className="text-lg text-muted-foreground">
                What began as a small workshop series in Bangalore quickly grew into a comprehensive platform that now 
                serves thousands of women across the country. We combine technology with empathy to create solutions that 
                truly address the challenges women face in building financial independence.
              </p>
              
              <div className="pt-4">
                <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white">
                  Join Our Community
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-12 md:py-16 bg-purple-50/50 dark:bg-purple-950/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/20 rounded-full px-3 py-1">
              <Goal className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Our Mission</span>
            </div>
            
            <h2 className="text-3xl font-bold">What Drives Us Every Day</h2>
            
            <p className="text-lg text-muted-foreground">
              We're on a mission to empower 1 million women in India with the financial knowledge, 
              confidence, and tools they need to secure their future.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white dark:bg-card/60 rounded-xl border border-purple-100 dark:border-purple-900/20 p-6 shadow-md hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-900/20 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Inclusive Access</h3>
              <p className="text-muted-foreground">
                Making financial education accessible to women from all walks of life, regardless of their background or current knowledge level.
              </p>
            </div>
            
            {/* Card 2 */}
            <div className="bg-white dark:bg-card/60 rounded-xl border border-purple-100 dark:border-purple-900/20 p-6 shadow-md hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality Content</h3>
              <p className="text-muted-foreground">
                Providing expert-verified, jargon-free educational resources that explain complex financial concepts in simple terms.
              </p>
            </div>
            
            {/* Card 3 */}
            <div className="bg-white dark:bg-card/60 rounded-xl border border-purple-100 dark:border-purple-900/20 p-6 shadow-md hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-900/20 flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community Support</h3>
              <p className="text-muted-foreground">
                Building a supportive network where women can learn from each other's experiences and celebrate financial wins together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 bg-pink-100 dark:bg-pink-900/20 rounded-full px-3 py-1">
              <Users className="w-4 h-4 text-pink-500" />
              <span className="text-sm font-medium text-pink-700 dark:text-pink-300">Our Team</span>
            </div>
            
            <h2 className="text-3xl font-bold">Meet the People Behind NayiDisha</h2>
            
            <p className="text-lg text-muted-foreground">
              Our diverse team brings together expertise in finance, education, and technology
              with a shared passion for women's empowerment.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="text-center">
              <div className="aspect-square rounded-full overflow-hidden mx-auto mb-4 w-40 h-40 border-4 border-purple-100 dark:border-purple-900/20">
                <img
                  src="https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Priya Sharma"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-xl">Priya Sharma</h3>
              <p className="text-pink-500 dark:text-pink-400 mb-2">Founder & CEO</p>
              <p className="text-sm text-muted-foreground">
                Former investment banker with a passion for financial education.
              </p>
            </div>
            
            {/* Team Member 2 */}
            <div className="text-center">
              <div className="aspect-square rounded-full overflow-hidden mx-auto mb-4 w-40 h-40 border-4 border-purple-100 dark:border-purple-900/20">
                <img
                  src="https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Anjali Patel"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-xl">Anjali Patel</h3>
              <p className="text-purple-500 dark:text-purple-400 mb-2">Head of Content</p>
              <p className="text-sm text-muted-foreground">
                Financial educator with 10+ years experience in simplifying complex concepts.
              </p>
            </div>
            
            {/* Team Member 3 */}
            <div className="text-center">
              <div className="aspect-square rounded-full overflow-hidden mx-auto mb-4 w-40 h-40 border-4 border-purple-100 dark:border-purple-900/20">
                <img
                  src="https://images.pexels.com/photos/8437857/pexels-photo-8437857.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Raj Malhotra"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-xl">Raj Malhotra</h3>
              <p className="text-pink-500 dark:text-pink-400 mb-2">CTO</p>
              <p className="text-sm text-muted-foreground">
                Tech innovator focused on creating accessible financial tools.
              </p>
            </div>
            
            {/* Team Member 4 */}
            <div className="text-center">
              <div className="aspect-square rounded-full overflow-hidden mx-auto mb-4 w-40 h-40 border-4 border-purple-100 dark:border-purple-900/20">
                <img
                  src="https://images.pexels.com/photos/5905516/pexels-photo-5905516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Neha Gupta"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-xl">Neha Gupta</h3>
              <p className="text-purple-500 dark:text-purple-400 mb-2">Community Manager</p>
              <p className="text-sm text-muted-foreground">
                Community builder focused on creating supportive learning environments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">Join Us in Our Mission</h2>
            <p className="text-xl opacity-90">
              Be part of a growing community of financially empowered women across India.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
              <Button asChild size="lg" variant="secondary" className="text-base bg-white text-purple-600 hover:bg-gray-100 shadow-lg">
                <Link href="/auth">Create Your Account</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base bg-transparent border-white text-white hover:bg-white/10">
                <Link href="/resources">Explore Resources</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 