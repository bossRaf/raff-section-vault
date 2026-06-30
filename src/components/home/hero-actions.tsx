"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AuthModals } from "@/components/auth/auth-modals";

export function HeroActions() {
  return (
    <AuthModals>
      {({ openLogin }) => (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" className="bg-primary" onClick={openLogin}>
            Log in to your account
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="bg-accent text-accent-foreground hover:bg-accent/80"
            asChild
          >
            <Link href="/about">Learn more</Link>
          </Button>
        </div>
      )}
    </AuthModals>
  );
}
