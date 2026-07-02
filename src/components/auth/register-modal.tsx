"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

interface RegisterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToLogin: () => void;
}

export function RegisterModal({
  open,
  onOpenChange,
  onSwitchToLogin,
}: RegisterModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const supabase = createClient();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { data: registrationEnabled, error: settingsError } =
      await supabase.rpc("is_registration_enabled");

    if (settingsError || !registrationEnabled) {
      setLoading(false);
      setError("Registration is currently closed. Please check back later.");
      return;
    }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError || !data.user) {
      setLoading(false);
      setError(signUpError?.message ?? "Something went wrong.");
      return;
    }

    const { data: classmateId, error: rpcError } = await supabase.rpc(
      "get_classmate_id_by_email",
      { check_email: email },
    );

    if (rpcError || !classmateId) {
      await supabase.auth.signOut();
      setLoading(false);
      setError("This email is not on the classmate whitelist.");
      return;
    }

    const { error: insertError } = await supabase.from("profiles").insert({
      id: data.user.id,
      classmate_id: classmateId,
      role: "user",
      display_name: null,
      profile_completed: false,
    });

    if (insertError) {
      await supabase.auth.signOut();
      setLoading(false);
      setError("Could not create your profile. Try again.");
      return;
    }

    setLoading(false);
    onOpenChange(false);
    router.push("/dashboard");
    router.refresh();
  }

  async function handleGoogleRegister() {
    setError(null);

    const { data: registrationEnabled, error: settingsError } =
      await supabase.rpc("is_registration_enabled");

    if (settingsError || !registrationEnabled) {
      setLoading(false);
      setError("Registration is currently closed. Please check back later.");
      return;
    }

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="font-bold">Create your account</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="register-email">Email</Label>
            <Input
              id="register-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="register-password">Password</Label>
            <div className="relative">
              <Input
                id="register-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Create account
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">or</span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full bg-accent"
          onClick={handleGoogleRegister}
        >
          <FcGoogle className="h-4 w-4" />
          Continue with Google
        </Button>

        <div className="rounded-lg border bg-muted/50 p-3 text-center text-sm text-muted-foreground">
          🔒 Only approved classmates can register. Your email must be on the
          whitelist to proceed.
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="font-medium text-primary hover:underline"
          >
            Login
          </button>
        </p>
      </DialogContent>
    </Dialog>
  );
}
