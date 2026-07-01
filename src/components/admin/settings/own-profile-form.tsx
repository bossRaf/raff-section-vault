"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { updateOwnProfile } from "@/app/(app)/admin/settings/actions";

type OwnProfile = {
  display_name: string | null;
  nickname: string | null;
  bio: string | null;
  occupation: string | null;
  company: string | null;
  employment_status: string | null;
  college: string | null;
  course: string | null;
  location: string | null;
};

export function OwnProfileForm({ profile }: { profile: OwnProfile }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setSuccess(false);
    setLoading(true);

    const result = await updateOwnProfile(formData);

    setLoading(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    setSuccess(true);
    router.refresh();
  }

  return (
    <form action={handleSubmit} className="space-y-4 rounded-lg border p-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="display_name">Display Name</Label>
          <Input
            id="display_name"
            name="display_name"
            defaultValue={profile.display_name ?? ""}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="nickname">Nickname</Label>
          <Input
            id="nickname"
            name="nickname"
            defaultValue={profile.nickname ?? ""}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          name="bio"
          defaultValue={profile.bio ?? ""}
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="occupation">Occupation</Label>
          <Input
            id="occupation"
            name="occupation"
            defaultValue={profile.occupation ?? ""}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            name="company"
            defaultValue={profile.company ?? ""}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="employment_status">Employment Status</Label>
          <Input
            id="employment_status"
            name="employment_status"
            defaultValue={profile.employment_status ?? ""}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            defaultValue={profile.location ?? ""}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="college">College</Label>
          <Input
            id="college"
            name="college"
            defaultValue={profile.college ?? ""}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="course">Course</Label>
          <Input
            id="course"
            name="course"
            defaultValue={profile.course ?? ""}
          />
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}
      {success && <p className="text-sm text-emerald-600">Profile updated.</p>}

      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Profile"}
      </Button>
    </form>
  );
}
