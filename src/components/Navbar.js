'use client'

import Link from 'next/link'
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { auth } from '@/firebase/clientApp'
import { useAuthState } from 'react-firebase-hooks/auth'
import { ThemeToggle } from './theme/ThemeToggle'
import { UserIcon } from 'lucide-react'

export default function Navbar() {
  const [user] = useAuthState(auth)

  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <Link href="/" className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-primary"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M9 12h6" />
            <path d="M12 9v6" />
          </svg>
          <span className="font-bold text-xl hidden sm:inline-block">NayiDisha</span>
        </Link>
        
        <NavigationMenu className="mx-6 hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/dashboard" className="text-sm font-medium px-4 py-2 hover:text-primary transition-colors">
                Dashboard
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/resources" className="text-sm font-medium px-4 py-2 hover:text-primary transition-colors">
                Resources
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex items-center gap-4">
          <ThemeToggle />
          
          {user ? (
            <div className="flex items-center gap-2">
              
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <UserIcon className="h-4 w-4 text-primary-foreground" />
                </div>
            
              <Button
                variant="ghost"
                onClick={() => auth.signOut()}
                className="text-sm font-medium hidden sm:inline-flex"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <Button asChild size="sm" className="font-medium">
              <Link href="/auth">
                Sign In
              </Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  )
} 