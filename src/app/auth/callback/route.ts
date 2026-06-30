import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(`${origin}/?error=missing_code`);
  }

  const supabase = await createClient();

  const { data: sessionData, error: exchangeError } =
    await supabase.auth.exchangeCodeForSession(code);

  if (exchangeError || !sessionData.user) {
    return NextResponse.redirect(`${origin}/?error=auth_failed`);
  }

  const user = sessionData.user;
  const email = user.email;

  if (!email) {
    await supabase.auth.signOut();
    return NextResponse.redirect(`${origin}/?error=no_email`);
  }

  // Check if profile already exists
  const { data: existingProfile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (existingProfile) {
    // Returning user — route by role
    const destination =
      existingProfile.role === "admin" ? "/admin" : "/dashboard";
    return NextResponse.redirect(`${origin}${destination}`);
  }

  // First-time login — check whitelist + get classmate_id in one call
  const { data: classmateId, error: rpcError } = await supabase.rpc(
    "get_classmate_id_by_email",
    { check_email: email },
  );

  if (rpcError || !classmateId) {
    await supabase.auth.signOut();
    return NextResponse.redirect(`${origin}/?error=not_whitelisted`);
  }

  const { error: insertError } = await supabase.from("profiles").insert({
    id: user.id,
    classmate_id: classmateId,
    role: "user",
    display_name: user.user_metadata?.full_name ?? null,
    photo_url: user.user_metadata?.avatar_url ?? null,
    profile_completed: false,
  });

  if (insertError) {
    await supabase.auth.signOut();
    return NextResponse.redirect(`${origin}/?error=profile_creation_failed`);
  }

  return NextResponse.redirect(`${origin}/dashboard`);
}
