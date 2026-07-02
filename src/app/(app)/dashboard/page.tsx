import { createClient } from "@/lib/supabase/server";

export default async function UserPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name")
    .eq("id", user!.id)
    .single();

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">
        Hello, {profile?.display_name ?? "User"} 👋
      </h1>
      <p className="mt-2 text-muted-foreground">
        Welcome to the Section Vault admin or user panel.
      </p>
    </div>
  );
}
