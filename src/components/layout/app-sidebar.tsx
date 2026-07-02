"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { LogoutButton } from "@/components/auth/logout-button";
import { mainNav, adminNav } from "./nav-items";

type AppSidebarProps = {
  isAdmin: boolean;
};

export function AppSidebar({ isAdmin }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="sticky top-16 h-[calc(100vh-4rem)] w-72 shrink-0 border-r bg-background">
      <nav className="flex-1 px-4 py-6">
        <div className="space-y-1">
          <p className="mb-3 px-3 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Main
          </p>

          {mainNav.map((item) => {
            const active = pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </div>

        {isAdmin && (
          <>
            <div className="my-6 border-t" />

            <div className="space-y-1">
              <p className="mb-3 px-3 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                Admin Panel
              </p>

              {adminNav.map((item) => {
                const active =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      active
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </nav>

      <div className="border-t p-4">
        <div className="border-t p-4">
          <LogoutButton />
        </div>
      </div>
    </aside>
  );
}
