"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

type ActionResult = { error?: string; success?: boolean };

export async function updateSettings(
  formData: FormData,
): Promise<ActionResult> {
  const supabase = await createClient();

  const site_name = (formData.get("site_name") as string)?.trim();
  const registration_enabled = formData.get("registration_enabled") === "on";

  if (!site_name) {
    return { error: "Site name is required." };
  }

  const { error } = await supabase
    .from("settings")
    .update({ site_name, registration_enabled })
    .eq("id", 1);

  if (error) {
    return { error: "Failed to update settings. Please try again." };
  }

  revalidatePath("/admin/settings");
  return { success: true };
}

export async function updateOwnProfile(
  formData: FormData,
): Promise<ActionResult> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated." };
  }

  const display_name = (formData.get("display_name") as string)?.trim() || null;
  const nickname = (formData.get("nickname") as string)?.trim() || null;
  const bio = (formData.get("bio") as string)?.trim() || null;
  const occupation = (formData.get("occupation") as string)?.trim() || null;
  const company = (formData.get("company") as string)?.trim() || null;
  const employment_status =
    (formData.get("employment_status") as string)?.trim() || null;
  const college = (formData.get("college") as string)?.trim() || null;
  const course = (formData.get("course") as string)?.trim() || null;
  const location = (formData.get("location") as string)?.trim() || null;

  const { error } = await supabase
    .from("profiles")
    .update({
      display_name,
      nickname,
      bio,
      occupation,
      company,
      employment_status,
      college,
      course,
      location,
    })
    .eq("id", user.id);

  if (error) {
    return { error: "Failed to update profile. Please try again." };
  }

  revalidatePath("/admin/settings");
  return { success: true };
}
