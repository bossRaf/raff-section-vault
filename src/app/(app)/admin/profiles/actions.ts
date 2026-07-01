"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

type ActionResult = { error?: string; success?: boolean };

export async function updateProfileRole(
  profileId: string,
  newRole: "user" | "admin",
): Promise<ActionResult> {
  const supabase = await createClient();

  const { error } = await supabase.rpc("promote_user", {
    user_id: profileId,
    new_role: newRole,
  });

  if (error) {
    if (error.message.includes("Permission denied")) {
      return { error: "You don't have permission to change roles." };
    }
    return { error: "Failed to update role. Please try again." };
  }

  revalidatePath("/admin/profiles");
  return { success: true };
}

export async function deleteProfile(id: string): Promise<ActionResult> {
  const supabase = await createClient();

  const { error } = await supabase.from("profiles").delete().eq("id", id);

  if (error) {
    return { error: "Failed to delete profile. Please try again." };
  }

  revalidatePath("/admin/profiles");
  return { success: true };
}
