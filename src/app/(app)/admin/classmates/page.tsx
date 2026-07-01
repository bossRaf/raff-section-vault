import { createClient } from "@/lib/supabase/server";
import { ClassmatesTable } from "@/components/admin/classmates/classmates-table";

export type Classmate = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  registered: boolean;
};

export default async function ClassmatesPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("classmates")
    .select(
      `
      id,
      first_name,
      last_name,
      email,
      created_at,
      profiles ( id )
    `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="p-6">
        <p className="text-destructive">Failed to load classmates.</p>
      </div>
    );
  }

  const classmates: Classmate[] = (data ?? []).map((row) => ({
    id: row.id,
    first_name: row.first_name,
    last_name: row.last_name,
    email: row.email,
    created_at: row.created_at,
    registered: Array.isArray(row.profiles)
      ? row.profiles.length > 0
      : !!row.profiles,
  }));

  return (
    <div className="p-6 space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Classmates</h1>
        <p className="text-muted-foreground">
          Manage the whitelist of classmates allowed to register.
        </p>
      </div>
      <ClassmatesTable classmates={classmates} />
    </div>
  );
}
