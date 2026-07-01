"use client";

import { useMemo, useState } from "react";
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
  Pencil,
  Trash2,
  UserPlus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { Classmate } from "@/app/(app)/admin/classmates/page";
import { AddClassmateDialog } from "./add-classmate-dialog";
import { EditClassmateDialog } from "./edit-classmate-dialog";
import { DeleteClassmateDialog } from "./delete-classmate-dialog";

const PAGE_SIZE = 10;

export function ClassmatesTable({ classmates }: { classmates: Classmate[] }) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [addOpen, setAddOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Classmate | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Classmate | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return classmates;

    return classmates.filter((c) => {
      const fullName = `${c.first_name} ${c.last_name}`.toLowerCase();
      return fullName.includes(q) || c.email.toLowerCase().includes(q);
    });
  }, [classmates, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  // Clamp page if filtering shrinks results below current page
  const currentPage = Math.min(page, totalPages);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  function handleSearchChange(value: string) {
    setQuery(value);
    setPage(1); // reset to page 1 on every new search
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <Input
          placeholder="Search by name or email..."
          value={query}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={() => setAddOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Classmate
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Added</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-muted-foreground"
                >
                  No classmates found.
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>
                    {c.first_name} {c.last_name}
                  </TableCell>
                  <TableCell>{c.email}</TableCell>
                  <TableCell>
                    <Badge variant={c.registered ? "default" : "secondary"}>
                      {c.registered ? "Registered" : "Pending"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(c.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditTarget(c)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteTarget(c)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filtered.length} classmate{filtered.length !== 1 ? "s" : ""}
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

      <AddClassmateDialog open={addOpen} onOpenChange={setAddOpen} />
      <EditClassmateDialog
        classmate={editTarget}
        open={!!editTarget}
        onOpenChange={(open) => !open && setEditTarget(null)}
      />
      <DeleteClassmateDialog
        classmate={deleteTarget}
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      />
    </div>
  );
}
