'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Book, ShoppingBag, Wallet, User, Menu, Settings, LogOut } from 'lucide-react'

const navItems = [
  { name: 'Catalogue', href: '/catalogue', icon: Book },
  { name: 'Orders', href: '/orders', icon: ShoppingBag },
  { name: 'Wallet', href: '/wallet', icon: Wallet },
  { name: 'Business Profile', href: '/profile', icon: User },
]

function NavItem({ item, isMobile = false }: { item: typeof navItems[0], isMobile?: boolean }) {
  const pathname = usePathname()
  const isActive = pathname === item.href

  return (
    <Link
      href={item.href}
      className={`flex items-center space-x-3 ${
        isMobile ? 'justify-center' : 'px-3 py-2'
      } rounded-md text-sm font-medium transition-colors ${
        isActive
          ? 'bg-primary text-primary-foreground'
          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
      }`}
    >
      <item.icon className={`h-5 w-5 ${isMobile ? 'mx-auto' : ''}`} />
      {!isMobile && <span>{item.name}</span>}
    </Link>
  )
}

function Sidebar() {
  return (
    <div className="hidden h-screen w-64 flex-col border-r bg-background lg:flex">
      <div className="flex h-14 items-center border-b px-4">
        <h1 className="text-lg font-semibold">Your Business</h1>
      </div>
      <nav className="flex-1 space-y-2 p-4">
        {navItems.map((item) => (
          <NavItem key={item.name} item={item} />
        ))}
      </nav>
    </div>
  )
}

function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t bg-background lg:hidden">
      {navItems.map((item) => (
        <NavItem key={item.name} item={item} isMobile />
      ))}
    </nav>
  )
}

function ProfileButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="@username" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">username</p>
            <p className="text-xs leading-none text-muted-foreground">
              user@example.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/settings">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function HomeLayoutComponent({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-14 items-center justify-between border-b px-4 lg:justify-end">
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle sidebar</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="flex h-14 items-center border-b px-4">
                <h2 className="text-lg font-semibold">Your Business</h2>
              </div>
              <nav className="flex-1 space-y-2 p-4">
                {navItems.map((item) => (
                  <NavItem key={item.name} item={item} />
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <ProfileButton />
        </header>
        <main className="flex-1 overflow-auto p-4">{children}</main>
        <MobileNav />
      </div>
    </div>
  )
}