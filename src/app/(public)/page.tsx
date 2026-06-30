import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { HeroActions } from "@/components/home/hero-actions";

// ...inside the JSX, where AuthModals was:
<HeroActions />;

export default async function HomePage() {
  const supabase = await createClient();

  const [
    { count: classmateCount },
    { count: memoryCount },
    { count: announcementCount },
    { data: latestAnnouncements },
  ] = await Promise.all([
    supabase.from("classmates").select("*", { count: "exact", head: true }),
    supabase.from("memories").select("*", { count: "exact", head: true }),
    supabase
      .from("announcements")
      .select("*", { count: "exact", head: true })
      .eq("is_published", true),
    supabase
      .from("announcements")
      .select("id, title, content, created_at")
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .limit(3),
  ]);

  const stats = [
    { label: "Classmates", value: classmateCount ?? 0 },
    { label: "Memories shared", value: memoryCount ?? 0 },
    { label: "Announcements", value: announcementCount ?? 0 },
  ];

  return (
    <div className="bg-background">
      <section className="mx-auto flex max-w-4xl flex-col items-center px-6 py-24 text-center">
        <div className="mb-8 flex items-center gap-2 rounded-full border border-accent bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
          <Sparkle className="h-3.5 w-3.5" />
          Role-Based Alumni Platform
        </div>

        <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl">
          Reconnect, remember, <span className="text-primary">stay close.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Section Vault is a private space for our class. Track careers, share
          memories, and never lose touch with the people who shaped your story.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <HeroActions />
        </div>

        <div className="mt-20 grid w-full grid-cols-3 gap-8 border-t pt-10">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t bg-muted/30">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <p className="mb-8 text-sm font-semibold tracking-wide text-muted-foreground">
            LATEST ANNOUNCEMENTS
          </p>

          {latestAnnouncements && latestAnnouncements.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-3">
              {latestAnnouncements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="rounded-lg border bg-card p-5"
                >
                  <p className="text-xs text-muted-foreground">
                    {new Date(announcement.created_at).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                  </p>

                  <h3 className="mt-2 font-semibold text-card-foreground">
                    {announcement.title}
                  </h3>

                  <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                    {announcement.content}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed bg-muted p-10 text-center">
              <h3 className="text-lg font-semibold text-card-foreground">
                No announcements yet
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                The admin hasn't published any announcements yet. Check back
                later for updates.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
