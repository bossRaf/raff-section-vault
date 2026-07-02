"use client";

type AppHeaderProps = {
  displayName: string | null;
  isAdmin: boolean;
};

export function AppHeader({ displayName, isAdmin }: AppHeaderProps) {
  const initial = (displayName ?? "G").charAt(0).toUpperCase();
  const firstName = (displayName ?? "Guest").trim().split(" ")[0];

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-muted px-6">
      {/* Logo */}
      <div className="border-b px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground">
            SV
          </div>

          <div>
            <h1 className="text-lg font-bold">Section Vault</h1>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
          {initial}
        </div>

        <div className="hidden items-center gap-2 text-sm sm:flex">
          <span className="font-semibold">{firstName}</span>

          <span className="text-muted-foreground">•</span>

          <span className="text-muted-foreground">
            {isAdmin ? "Admin" : "User"}
          </span>
        </div>
      </div>
    </header>
  );
}
