import { createClient } from "@/lib/supabase/server";
import { ProfilesTable } from "@/components/admin/profiles/profiles-table";

export type Profile = {
  id: string;
  display_name: string | null;
  nickname: string | null;
  bio: string | null;
  photo_url: string | null;
  occupation: string | null;
  company: string | null;
  employment_status: string | null;
  college: string | null;
  course: string | null;
  location: string | null;
  role: "user" | "admin";
  profile_completed: boolean;
  created_at: string;
  email: string;
  first_name: string;
  last_name: string;
};

export default async function ProfilesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("profiles")
    .select(
      `
      id,
      display_name,
      nickname,
      bio,
      photo_url,
      occupation,
      company,
      employment_status,
      college,
      course,
      location,
      role,
      profile_completed,
      created_at,
      classmates ( email, first_name, last_name )
    `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="p-6">
        <p className="text-destructive">Failed to load profiles.</p>
      </div>
    );
  }

  const profiles: Profile[] = (data ?? []).map((row) => {
    const classmate = Array.isArray(row.classmates)
      ? row.classmates[0]
      : row.classmates;

    return {
      id: row.id,
      display_name: row.display_name,
      nickname: row.nickname,
      bio: row.bio,
      photo_url: row.photo_url,
      occupation: row.occupation,
      company: row.company,
      employment_status: row.employment_status,
      college: row.college,
      course: row.course,
      location: row.location,
      role: row.role,
      profile_completed: row.profile_completed,
      created_at: row.created_at,
      email: classmate?.email ?? "",
      first_name: classmate?.first_name ?? "",
      last_name: classmate?.last_name ?? "",
    };
  });

  return (
    <div className="p-6 space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Profiles</h1>
        <p className="text-muted-foreground">
          View and manage registered classmate profiles.
        </p>
      </div>
      <ProfilesTable profiles={profiles} currentUserId={user?.id ?? ""} />
    </div>
  );
}
