"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import type { Profile } from "@/app/(app)/admin/profiles/page";
import { updateProfileRole } from "@/app/(app)/admin/profiles/actions";
import { ProfileDetailSheet } from "./profile-detail-sheet";
import { DeleteProfileDialog } from "./delete-profile-dialog";

const PAGE_SIZE = 10;

export function ProfilesTable({
  profiles,
  currentUserId,
}: {
  profiles: Profile[];
  currentUserId: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [viewTarget, setViewTarget] = useState<Profile | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Profile | null>(null);
  const [roleUpdating, setRoleUpdating] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return profiles;

    return profiles.filter((p) => {
      const name = (
        p.display_name || `${p.first_name} ${p.last_name}`
      ).toLowerCase();
      return name.includes(q) || p.email.toLowerCase().includes(q);
    });
  }, [profiles, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  function handleSearchChange(value: string) {
    setQuery(value);
    setPage(1);
  }

  async function handleRoleChange(profile: Profile, newRole: "user" | "admin") {
    setRoleUpdating(profile.id);
    const result = await updateProfileRole(profile.id, newRole);
    setRoleUpdating(null);

    if (!result.error) {
      router.refresh();
    }
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search by name or email..."
        value={query}
        onChange={(e) => handleSearchChange(e.target.value)}
        className="max-w-sm"
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>College / Course</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-muted-foreground"
                >
                  No profiles found.
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((p) => {
                const isSelf = p.id === currentUserId;
                const displayName =
                  p.display_name || `${p.first_name} ${p.last_name}`;

                return (
                  <TableRow key={p.id}>
                    <TableCell>{displayName}</TableCell>
                    <TableCell>{p.email}</TableCell>
                    <TableCell>
                      {p.college || p.course
                        ? `${p.college ?? "—"} / ${p.course ?? "—"}`
                        : "—"}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={p.role}
                        disabled={isSelf || roleUpdating === p.id}
                        onValueChange={(value) =>
                          handleRoleChange(p, value as "user" | "admin")
                        }
                      >
                        <SelectTrigger className="w-28">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={p.profile_completed ? "default" : "secondary"}
                      >
                        {p.profile_completed ? "Complete" : "Incomplete"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setViewTarget(p)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        disabled={isSelf}
                        onClick={() => setDeleteTarget(p)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filtered.length} profile{filtered.length !== 1 ? "s" : ""}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            disabled={currentPage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            disabled={currentPage >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ProfileDetailSheet
        profile={viewTarget}
        open={!!viewTarget}
        onOpenChange={(open) => !open && setViewTarget(null)}
      />
      <DeleteProfileDialog
        profile={deleteTarget}
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      />
    </div>
  );
}
