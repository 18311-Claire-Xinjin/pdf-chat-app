"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  X,
} from "lucide-react";

import { Button } from "../ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

import { useAppState } from "@/hooks/use-app-state";
import type { ChatMessage } from "@/types";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

function PdfViewer({
  sources,
  setOpen,
}: {
  sources: ChatMessage["sources"];
  setOpen: (open: boolean) => void;
}) {
  const { file } = useAppState();

  const [totalPages, setTotalPages] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(
    sources?.[0]?.pageNumber ?? 1
  );

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setTotalPages(numPages);
  }

  function goToFirstPage() {
    setPageNumber(1);
  }

  function goToLastPage() {
    setPageNumber(totalPages);
  }

  function goToPrevPage() {
    setPageNumber((prev) => (prev > 1 ? prev - 1 : prev));
  }

  function goToNextPage() {
    setPageNumber((prev) => (prev < totalPages ? prev + 1 : prev));
  }

  return (
    <>
      <div className="flex items-start justify-between top-0 pb-4 h-32px bg-background z-50">
        <div className="flex items-center gap-2 flex-wrap">
          <h2 className="text-lg font-semibold text-foreground font-bricolage truncate">
            {file?.name}
          </h2>
          <Select
            value={pageNumber.toString()}
            onValueChange={(value) => setPageNumber(Number(value))}
          >
            <SelectTrigger>Select Source</SelectTrigger>
            <SelectContent className="max-h-52">
              {sources?.map((source) => (
                <SelectItem
                  key={source.id}
                  value={source.pageNumber.toString()}
                >
                  Page {source.pageNumber}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button
            size="icon"
            variant="ghost"
            className="cursor-pointer [&_svg]:!size-5"
            onClick={() => setOpen(false)}
          >
            <X />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex flex-1 w-[calc(100%)] h-[calc(100vh-100px)] overflow-x-hidden overflow-y-auto">
        <div className="flex justify-center">
          <Document
            file={`${import.meta.env.VITE_API_URL}${file?.path}`}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<p>Loading PDF…</p>}
            noData={<p>No PDF data</p>}
            error={<p>Failed to load PDF</p>}
          >
            <Page
              pageNumber={pageNumber}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              width={Math.min(window.innerWidth * 0.74, 616)}
            />
          </Document>
        </div>
      </ScrollArea>

      <div className="flex items-center justify-center gap-2 fixed left-[50%] translate-x-[-50%] bottom-8 px-2 w-fit h-12 shadow-lg rounded-lg bg-background z-50 mx-auto">
        <Button
          size="icon"
          variant="outline"
          className="cursor-pointer [&_svg]:!size-5"
          onClick={goToFirstPage}
          disabled={pageNumber === 1}
        >
          <ChevronsLeft />
        </Button>

        <Button
          size="icon"
          variant="outline"
          className="cursor-pointer [&_svg]:!size-5"
          onClick={goToPrevPage}
          disabled={pageNumber === 1}
        >
          <ChevronLeft />
        </Button>

        <p className="text-base text-foreground font-bricolage mx-1 hidden sm:block">
          Page {pageNumber} of {totalPages}
        </p>

        <Button
          size="icon"
          variant="outline"
          className="cursor-pointer [&_svg]:!size-5"
          onClick={goToNextPage}
          disabled={pageNumber === totalPages}
        >
          <ChevronRight />
        </Button>

        <Button
          size="icon"
          variant="outline"
          className="cursor-pointer [&_svg]:!size-5"
          onClick={goToLastPage}
          disabled={pageNumber === totalPages}
        >
          <ChevronsRight />
        </Button>
      </div>
    </>
  );
}

export function PdfViewerModal({
  children,
  sources,
}: {
  children: React.ReactNode;
  sources: ChatMessage["sources"];
}) {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="!w-[90%] !max-w-[664px]">
        <div className="p-6 relative">
          <PdfViewer sources={sources} setOpen={setOpen} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
