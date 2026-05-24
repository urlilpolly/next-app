"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserName } from "./username";


const navItems = [
  {
    title: "Главная",
    href: "/",
  },
  {
    title: "Фильмы",
    href: "/dashboard",
  },
]

export default function Navbar() {
    const pathname = usePathname()

    return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold">
          GOSI
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.title}
              </Link>
            )
          })}
        </nav>
        <div className="hidden md:flex items-center gap-4">
            <UserName />
        </div>

        
      </div>
    </header>
  )
}