"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { updateClassmate } from "@/app/(app)/admin/classmates/actions";
import type { Classmate } from "@/app/(app)/admin/classmates/page";

export function EditClassmateDialog({
  classmate,
  open,
  onOpenChange,
}: {
  classmate: Classmate | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    if (!classmate) return;

    setError(null);
    setLoading(true);

    const result = await updateClassmate(classmate.id, formData);

    setLoading(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    onOpenChange(false);
    router.refresh();
  }

  if (!classmate) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Classmate</DialogTitle>
        </DialogHeader>

        <form action={handleSubmit} className="space-y-4" key={classmate.id}>
          <div className="space-y-2">
            <Label htmlFor="edit_first_name">First Name</Label>
            <Input
              id="edit_first_name"
              name="first_name"
              defaultValue={classmate.first_name}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit_last_name">Last Name</Label>
            <Input
              id="edit_last_name"
              name="last_name"
              defaultValue={classmate.last_name}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit_email">Email</Label>
            <Input
              id="edit_email"
              name="email"
              type="email"
              defaultValue={classmate.email}
              required
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
