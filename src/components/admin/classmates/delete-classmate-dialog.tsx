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
import { deleteClassmate } from "@/app/(app)/admin/classmates/actions";
import type { Classmate } from "@/app/(app)/admin/classmates/page";

export function DeleteClassmateDialog({
  classmate,
  open,
  onOpenChange,
}: {
  classmate: Classmate | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!classmate) return;
    setLoading(true);

    const result = await deleteClassmate(classmate.id);

    setLoading(false);

    if (!result.error) {
      onOpenChange(false);
      router.refresh();
    }
  }

  if (!classmate) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Classmate</AlertDialogTitle>
          <AlertDialogDescription>
            {classmate.registered ? (
              <>
                <strong>
                  {classmate.first_name} {classmate.last_name}
                </strong>{" "}
                has already registered. Deleting them from the whitelist will
                also permanently delete their account and profile data. This
                cannot be undone.
              </>
            ) : (
              <>
                This will remove{" "}
                <strong>
                  {classmate.first_name} {classmate.last_name}
                </strong>{" "}
                from the whitelist. They will no longer be able to register.
              </>
            )}
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
