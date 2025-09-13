"use client";

import * as React from "react";

import { Logo } from "../layout/logo";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

import { useAppState } from "@/hooks/use-app-state";
import { useMediaQuery } from "@/hooks/use-media-query";

import { formatFileSize } from "@/lib/format-file-size";
import { DeleteSessionConfirmation } from "./delete-session-confirmation";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

function PdfDetails() {
  const { file, metadata } = useAppState();

  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4 w-full">
        <div className="shrink-0">
          <Logo />
        </div>
        <div className="flex flex-col gap-0.5 w-0 flex-1 min-w-0">
          <p className="truncate overflow-ellipsis text-base">
            {file?.name ?? "No Name"}
          </p>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap my-4">
        <Badge variant="purple" className="flex-1 justify-start">
          File Size: {formatFileSize(file?.size ?? 0)}
        </Badge>
        <Badge variant="teal" className="flex-1 justify-start">
          Uploaded At:{" "}
          {new Date(file?.uploadedAt ?? "").toLocaleString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </Badge>
        <Badge variant="amber" className="flex-1 justify-start">
          Number of Pages: {metadata?.totalPages ?? 0}
        </Badge>
        <Badge variant="blue" className="flex-1 justify-start">
          Number of Chunks: {metadata?.totalChunks ?? 0}
        </Badge>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" className="flex-1 cursor-pointer" asChild>
          <a
            href={`${import.meta.env.VITE_API_URL}${file?.path}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View PDF
          </a>
        </Button>

        <DeleteSessionConfirmation open={open} onOpenChange={setOpen}>
          <Button className="flex-1 cursor-pointer">Delete Session</Button>
        </DeleteSessionConfirmation>
      </div>
    </div>
  );
}

export function PdfDetailsModal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <PdfDetails />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <div className="p-6">
          <PdfDetails />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
