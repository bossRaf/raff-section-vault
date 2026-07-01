import { createClient } from "@/lib/supabase/server";

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  //   const { data: profile } = await supabase
  //     .from("profiles")
  //     .select("display_name")
  //     .eq("id", user!.id)
  //     .single();

  return <h1>Settings</h1>;
}
