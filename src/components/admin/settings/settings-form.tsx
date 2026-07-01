"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { updateSettings } from "@/app/(app)/admin/settings/actions";

export function SettingsForm({
  settings,
}: {
  settings: { site_name: string; registration_enabled: boolean };
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registrationEnabled, setRegistrationEnabled] = useState(
    settings.registration_enabled,
  );

  async function handleSubmit(formData: FormData) {
    setError(null);
    setSuccess(false);
    setLoading(true);

    // Switch doesn't submit a value in FormData unless checked, so set it explicitly
    if (registrationEnabled) {
      formData.set("registration_enabled", "on");
    } else {
      formData.delete("registration_enabled");
    }

    const result = await updateSettings(formData);

    setLoading(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    setSuccess(true);
    router.refresh();
  }

  return (
    <form action={handleSubmit} className="space-y-6 rounded-lg border p-6">
      <div className="space-y-2">
        <Label htmlFor="site_name">Site Name</Label>
        <Input
          id="site_name"
          name="site_name"
          defaultValue={settings.site_name}
          required
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="registration_enabled">Registration Enabled</Label>
          <p className="text-sm text-muted-foreground">
            Allow whitelisted classmates to register new accounts.
          </p>
        </div>
        <Switch
          id="registration_enabled"
          checked={registrationEnabled}
          onCheckedChange={setRegistrationEnabled}
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}
      {success && <p className="text-sm text-emerald-600">Settings saved.</p>}

      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}
