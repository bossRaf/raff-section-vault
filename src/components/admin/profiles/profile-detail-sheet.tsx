"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  GraduationCap,
  MapPin,
  Calendar,
  FileText,
} from "lucide-react";
import type { Profile } from "@/app/(app)/admin/profiles/page";

function Field({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string | null | undefined;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium truncate">{value || "Not set"}</p>
      </div>
    </div>
  );
}

export function ProfileDetailSheet({
  profile,
  open,
  onOpenChange,
}: {
  profile: Profile | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!profile) return null;

  const displayName =
    profile.display_name || `${profile.first_name} ${profile.last_name}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden gap-0">
        {/* Header banner */}
        <div className="bg-linear-to-br from-primary/10 via-primary/5 to-transparent px-6 pt-6 pb-5">
          <DialogHeader className="sr-only">
            <DialogTitle>{displayName}</DialogTitle>
          </DialogHeader>

          <div className="flex items-center gap-4">
            {profile.photo_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.photo_url}
                alt={displayName}
                className="h-16 w-16 rounded-full object-cover ring-2 ring-background shadow-sm"
              />
            ) : (
              <div className="h-16 w-16 rounded-full bg-primary/15 flex items-center justify-center text-lg font-semibold text-primary ring-2 ring-background shadow-sm">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="min-w-0">
              <h2 className="text-base font-semibold truncate">
                {displayName}
              </h2>
              <p className="text-sm text-muted-foreground truncate">
                {profile.email}
              </p>
              <div className="flex gap-1.5 mt-2">
                <Badge
                  variant={profile.role === "admin" ? "default" : "secondary"}
                  className="text-xs"
                >
                  {profile.role === "admin" ? "Admin" : "User"}
                </Badge>
                <Badge
                  variant={profile.profile_completed ? "outline" : "secondary"}
                  className="text-xs"
                >
                  {profile.profile_completed ? "Complete" : "Incomplete"}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5 max-h-[60vh] overflow-y-auto">
          {profile.bio && (
            <div className="flex items-start gap-3">
              <FileText className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Bio</p>
                <p className="text-sm leading-relaxed">{profile.bio}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Field
              icon={Briefcase}
              label="Occupation"
              value={profile.occupation}
            />
            <Field icon={Briefcase} label="Company" value={profile.company} />
            <Field
              icon={Briefcase}
              label="Employment Status"
              value={profile.employment_status}
            />
            <Field icon={MapPin} label="Location" value={profile.location} />
            <Field
              icon={GraduationCap}
              label="College"
              value={profile.college}
            />
            <Field icon={GraduationCap} label="Course" value={profile.course} />
          </div>

          <div className="pt-3 border-t flex items-center gap-3">
            <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Joined</p>
              <p className="text-sm font-medium">
                {new Date(profile.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// "use client";

// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetDescription,
// } from "@/components/ui/sheet";
// import { Badge } from "@/components/ui/badge";
// import type { Profile } from "@/app/(app)/admin/profiles/page";

// function DetailRow({
//   label,
//   value,
// }: {
//   label: string;
//   value: string | null | undefined;
// }) {
//   return (
//     <div className="grid grid-cols-3 gap-4 py-2 border-b">
//       <span className="text-sm text-muted-foreground">{label}</span>
//       <span className="col-span-2 text-sm">{value || "—"}</span>
//     </div>
//   );
// }

// export function ProfileDetailSheet({
//   profile,
//   open,
//   onOpenChange,
// }: {
//   profile: Profile | null;
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// }) {
//   if (!profile) return null;

//   const displayName =
//     profile.display_name || `${profile.first_name} ${profile.last_name}`;

//   return (
//     <Sheet open={open} onOpenChange={onOpenChange}>
//       <SheetContent className="overflow-y-auto sm:max-w-lg">
//         <SheetHeader>
//           <div className="flex items-center gap-4">
//             {profile.photo_url ? (
//               // eslint-disable-next-line @next/next/no-img-element
//               <img
//                 src={profile.photo_url}
//                 alt={displayName}
//                 className="h-16 w-16 rounded-full object-cover"
//               />
//             ) : (
//               <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center text-lg font-semibold">
//                 {displayName.charAt(0).toUpperCase()}
//               </div>
//             )}
//             <div>
//               <SheetTitle>{displayName}</SheetTitle>
//               <SheetDescription>{profile.email}</SheetDescription>
//             </div>
//           </div>
//         </SheetHeader>

//         <div className="mt-6 space-y-1">
//           <div className="flex gap-2 mb-4">
//             <Badge variant={profile.role === "admin" ? "default" : "secondary"}>
//               {profile.role === "admin" ? "Admin" : "User"}
//             </Badge>
//             <Badge
//               variant={profile.profile_completed ? "default" : "secondary"}
//             >
//               {profile.profile_completed ? "Complete" : "Incomplete"}
//             </Badge>
//           </div>

//           <DetailRow label="Nickname" value={profile.nickname} />
//           <DetailRow label="Bio" value={profile.bio} />
//           <DetailRow label="Occupation" value={profile.occupation} />
//           <DetailRow label="Company" value={profile.company} />
//           <DetailRow
//             label="Employment Status"
//             value={profile.employment_status}
//           />
//           <DetailRow label="College" value={profile.college} />
//           <DetailRow label="Course" value={profile.course} />
//           <DetailRow label="Location" value={profile.location} />
//           <DetailRow
//             label="Joined"
//             value={new Date(profile.created_at).toLocaleDateString()}
//           />
//         </div>
//       </SheetContent>
//     </Sheet>
//   );
// }
