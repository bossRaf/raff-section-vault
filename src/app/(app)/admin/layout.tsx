import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppHeader } from "@/components/layout/app-header";
import { Footer } from "@/components/layout/footer";
import { AppSidebar } from "@/components/layout/app-sidebar";

export default async function AdminLayout({
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

  if (!profile || profile.role !== "admin") {
    redirect("/");
  }

  return (
    // <div className="min-h-screen bg-background">
    //   <AppHeader
    //     displayName={profile.display_name}
    //     isAdmin={profile.role === "admin"}
    //   />

    //   <div className="flex">
    //     <AppSidebar isAdmin={profile.role === "admin"} />
    //     <main className="flex-1 p-8">
    //       {children}
    //       <Footer />
    //     </main>
    //   </div>
    // </div>

    <div className="flex min-h-screen flex-col">
      <AppHeader
        displayName={profile.display_name}
        isAdmin={profile.role === "admin"}
      />

      <div className="flex flex-1">
        <AppSidebar isAdmin={profile.role === "admin"} />

        <main className="flex flex-1 flex-col">
          <div className="flex-1 p-8">{children}</div>

          <Footer />
        </main>
      </div>
    </div>
  );
}
