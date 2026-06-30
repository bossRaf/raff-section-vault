"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AuthModals } from "@/components/auth/auth-modals";

export function Header() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
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

        <AuthModals>
          {({ openLogin, openRegister }) => (
            <div className="flex items-center gap-3">
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
