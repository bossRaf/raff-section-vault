"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

type ActionResult = { error?: string; success?: boolean };

export async function addClassmate(formData: FormData): Promise<ActionResult> {
  const supabase = await createClient();

  const first_name = (formData.get("first_name") as string)?.trim();
  const last_name = (formData.get("last_name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();

  if (!first_name || !last_name || !email) {
    return { error: "All fields are required." };
  }

  const { error } = await supabase.from("classmates").insert({
    first_name,
    last_name,
    email,
  });

  if (error) {
    if (error.code === "23505") {
      return { error: "This email is already whitelisted." };
    }
    return { error: "Failed to add classmate. Please try again." };
  }

  revalidatePath("/admin/classmates");
  return { success: true };
}

export async function updateClassmate(
  id: string,
  formData: FormData,
): Promise<ActionResult> {
  const supabase = await createClient();

  const first_name = (formData.get("first_name") as string)?.trim();
  const last_name = (formData.get("last_name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();

  if (!first_name || !last_name || !email) {
    return { error: "All fields are required." };
  }

  const { error } = await supabase
    .from("classmates")
    .update({ first_name, last_name, email })
    .eq("id", id);

  if (error) {
    if (error.code === "23505") {
      return { error: "This email is already whitelisted." };
    }
    return { error: "Failed to update classmate. Please try again." };
  }

  revalidatePath("/admin/classmates");
  return { success: true };
}

export async function deleteClassmate(id: string): Promise<ActionResult> {
  const supabase = await createClient();

  const { error } = await supabase.from("classmates").delete().eq("id", id);

  if (error) {
    return { error: "Failed to delete classmate. Please try again." };
  }

  revalidatePath("/admin/classmates");
  return { success: true };
}
