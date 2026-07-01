"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AuthModals } from "@/components/auth/auth-modals";
import { Menu, X } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Desktop logo and nav links */}
        <Link href="/" className="hidden items-center gap-2 md:flex">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground">
            SV
          </div>
          <span className="text-lg font-bold text-foreground">
            Section Vault
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-lg bg-accent p-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                pathname === link.href &&
                  "bg-background text-foreground shadow-sm",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                {open ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Section Vault</DropdownMenuLabel>

              <DropdownMenuSeparator />

              {navLinks.map((link) => (
                <DropdownMenuItem asChild key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "w-full py-2.5",
                      pathname === link.href && "font-semibold",
                    )}
                  >
                    {link.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Desktop Header Login/Register  */}
        <AuthModals>
          {({ openLogin, openRegister }) => (
            <div className="hidden items-center gap-3 md:flex">
              <Button
                size="lg"
                variant="outline"
                className="bg-accent text-accent-foreground hover:bg-accent/80"
                onClick={openLogin}
              >
                Login
              </Button>

              <Button size="lg" className="bg-primary" onClick={openRegister}>
                Register
              </Button>
            </div>
          )}
        </AuthModals>
      </div>
    </header>
  );
}
