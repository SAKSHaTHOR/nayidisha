import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Mail, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Youtube, 
  Heart, 
  ArrowRight,
  Phone,
  MapPin,
  Send
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-purple-50/70 via-pink-50/60 to-purple-50/70 dark:from-purple-950/50 dark:via-pink-950/40 dark:to-purple-950/50 border-t border-purple-100 dark:border-purple-900/20">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: About */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 w-8 h-8 rounded-full flex items-center justify-center">
                <Heart className="h-4 w-4 text-white" />
              </div>
              <span className="text-2xl font-bold">NayiDisha</span>
            </div>
            <p className="text-muted-foreground">
              Empowering women through financial literacy and smart money management.
              Our platform combines user-friendly tools with AI technology to make finance accessible.
            </p>
            <div className="flex gap-3">
              <Link href="#" className="bg-white dark:bg-white/10 w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-transform hover:scale-110">
                <Instagram className="h-4 w-4 text-pink-500" />
              </Link>
              <Link href="#" className="bg-white dark:bg-white/10 w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-transform hover:scale-110">
                <Twitter className="h-4 w-4 text-purple-500" />
              </Link>
              <Link href="#" className="bg-white dark:bg-white/10 w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-transform hover:scale-110">
                <Linkedin className="h-4 w-4 text-pink-500" />
              </Link>
              <Link href="#" className="bg-white dark:bg-white/10 w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-transform hover:scale-110">
                <Youtube className="h-4 w-4 text-purple-500" />
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-pink-500 dark:hover:text-pink-400 transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" />
                  Home
                </Link>
              </li>
              <li>
                <Link href="/auth" className="text-muted-foreground hover:text-pink-500 dark:hover:text-pink-400 transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" />
                  Login/Register
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-pink-500 dark:hover:text-pink-400 transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-muted-foreground hover:text-pink-500 dark:hover:text-pink-400 transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" />
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-pink-500 dark:hover:text-pink-400 transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" />
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-pink-500 dark:hover:text-pink-400 transition-colors flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" />
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="space-y-6">
            <h3 className="font-semibold text-lg">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-pink-500 shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  123 Financial Center, MG Road<br />
                  Bengaluru, Karnataka 560001<br />
                  India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-purple-500 shrink-0" />
                <span className="text-muted-foreground">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-pink-500 shrink-0" />
                <span className="text-muted-foreground">help@nayidisha.in</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-6">
            <h3 className="font-semibold text-lg">Subscribe to Our Newsletter</h3>
            <p className="text-muted-foreground">
              Get financial tips, updates, and exclusive resources directly to your inbox.
            </p>
            <div className="flex flex-col gap-3">
              <div className="relative">
                <Input 
                  type="email" 
                  placeholder="Your email address" 
                  className="h-11 pl-4 pr-12 bg-white dark:bg-white/10"
                />
                <Button 
                  size="icon" 
                  className="absolute right-1 top-1 h-9 w-9 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                >
                  <Send className="h-4 w-4 text-white" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                By subscribing, you agree to our Privacy Policy and consent to receive updates.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-purple-100 dark:border-purple-900/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-1">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} NayiDisha. All rights reserved.
            </p>
            <span className="text-sm text-muted-foreground mx-1">|</span>
            <Link 
              href="https://www.linkedin.com/in/sakshat-walishetti-4132a1257" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm text-muted-foreground hover:text-pink-500 dark:hover:text-pink-400 transition-colors flex items-center"
            >
              Created with <Heart className="h-3 w-3 text-pink-500 mx-1 inline" /> by Sakshat
            </Link>
          </div>
          <div className="flex gap-6">
            <Link href="/about" className="text-sm text-muted-foreground hover:text-pink-500 dark:hover:text-pink-400 transition-colors">
              About Us
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-pink-500 dark:hover:text-pink-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-pink-500 dark:hover:text-pink-400 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 