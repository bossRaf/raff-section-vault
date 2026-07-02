"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

type AppHeaderProps = {
  displayName: string | null;
  isAdmin: boolean;
};

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/profile": "Edit Profile",
  "/directory": "Directory",
  "/memories": "Memories",
  "/announcements": "Announcements",

  "/admin": "Overview",
  "/admin/profiles": "Users",
  "/admin/classmates": "Classmates",
  "/admin/announcements": "Announcements",
  "/admin/settings": "Settings",
};

export function AppHeader({ displayName, isAdmin }: AppHeaderProps) {
  const pathname = usePathname();

  const title = useMemo(() => {
    const exact = pageTitles[pathname];
    if (exact) return exact;

    const matched = Object.keys(pageTitles)
      .sort((a, b) => b.length - a.length)
      .find((route) => pathname.startsWith(route));

    return matched ? pageTitles[matched] : "Section Vault";
  }, [pathname]);

  const initial = (displayName ?? "G").charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-muted px-6">
      {/* Logo */}
      <div className="border-b px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground">
            SV
          </div>

          <div>
            <h1 className="text-lg font-bold">Section Vault</h1>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
          {initial}
        </div>

        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium">{displayName ?? "Guest"}</p>

          <p className="text-xs text-muted-foreground">
            {isAdmin ? "Administrator" : "Classmate"}
          </p>
        </div>
      </div>
    </header>
  );
}
