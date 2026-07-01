import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { UserSidebar } from "@/components/dashboard/user-sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, display_name")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "user") {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen">
      <UserSidebar displayName={profile.display_name} />
      <main className="flex-1 bg-muted/30 p-8">{children}</main>
    </div>
  );
}
