import { createClient } from "@/lib/supabase/server";
import { SettingsForm } from "@/components/admin/settings/settings-form";
import { OwnProfileForm } from "@/components/admin/settings/own-profile-form";

export default async function SettingsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [
    { data: settings, error: settingsError },
    { data: profile, error: profileError },
  ] = await Promise.all([
    supabase
      .from("settings")
      .select("site_name, registration_enabled")
      .eq("id", 1)
      .single(),
    supabase
      .from("profiles")
      .select(
        "display_name, nickname, bio, occupation, company, employment_status, college, course, location",
      )
      .eq("id", user!.id)
      .single(),
  ]);

  if (settingsError || !settings) {
    return (
      <div className="p-6">
        <p className="text-destructive">Failed to load settings.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 max-w-lg">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage site-wide configuration and your profile.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Site Settings</h2>
        <SettingsForm settings={settings} />
      </div>

      {profile && !profileError && (
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">My Profile</h2>
          <OwnProfileForm profile={profile} />
        </div>
      )}
    </div>
  );
}
