import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground">
            SV
          </div>
          <span className="font-semibold text-foreground">Section Vault</span>
        </Link>

        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Section Vault. Private and
          invite-only.
        </p>
      </div>
    </footer>
  );
}
