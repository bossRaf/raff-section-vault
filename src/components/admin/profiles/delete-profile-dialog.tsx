"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { deleteProfile } from "@/app/(app)/admin/profiles/actions";
import type { Profile } from "@/app/(app)/admin/profiles/page";

export function DeleteProfileDialog({
  profile,
  open,
  onOpenChange,
}: {
  profile: Profile | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!profile) return;
    setLoading(true);

    const result = await deleteProfile(profile.id);

    setLoading(false);

    if (!result.error) {
      onOpenChange(false);
      router.refresh();
    }
  }

  if (!profile) return null;

  const displayName =
    profile.display_name || `${profile.first_name} ${profile.last_name}`;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Profile</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete <strong>{displayName}</strong>&apos;s
            account and profile data. They will remain on the classmate
            whitelist and can register again if needed. This cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {loading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
