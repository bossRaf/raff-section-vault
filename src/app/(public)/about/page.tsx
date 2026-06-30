import { Users, TrendingUp, Camera, Megaphone } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Alumni directory",
    description:
      "Browse classmates, filter by location, occupation, or college, and see where everyone ended up.",
  },
  {
    icon: TrendingUp,
    title: "Career tracking",
    description:
      "Keep your occupation, employer, and employment status up to date so others can celebrate your wins.",
  },
  {
    icon: Camera,
    title: "Class memories",
    description:
      "Post stories, upload photos, and react to memories from our years together. A timeline that grows over time.",
  },
  {
    icon: Megaphone,
    title: "Announcements",
    description:
      "Admins publish reunion dates, milestones, and updates. Never miss something important again.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-background">
      <section className="mx-auto max-w-4xl px-6 py-24">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Built for our class
            <br /> <span className="text-primary">No one else</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Section Vault is a private alumni platform created exclusively for
            our class. A protected space to stay connected, track careers, and
            preserve memories that matter.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-lg border bg-muted p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent text-accent-foreground">
                <feature.icon className="h-5 w-5" />
              </div>

              <h3 className="mt-4 font-semibold text-card-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
