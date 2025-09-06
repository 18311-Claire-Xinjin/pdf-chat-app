"use client";

import { FilePlus } from "lucide-react";
import { useState, type RefObject } from "react";

import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";

type IProps = {
  setFile: (file: File | null) => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
};

export function PdfDropzone({ setFile, fileInputRef }: IProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileObject = event.target.files?.[0];
    if (fileObject) {
      setFile(fileObject);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const fileObject = e.dataTransfer.files?.[0];
    if (
      fileObject?.type.startsWith("application/pdf") &&
      !fileObject.name.toLowerCase().endsWith(".pdf")
    ) {
      const fakeEvent = {
        target: {
          files: [fileObject],
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      handleFileChange(fakeEvent);
    } else {
      // show error message
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto flex items-start justify-center">
      <Input
        accept="application/pdf"
        className="hidden"
        onChange={handleFileChange}
        ref={fileInputRef}
        type="file"
      />

      <button
        className={cn(
          "flex h-64 w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-2 border-muted-foreground/25 border-dashed bg-muted/50 transition-colors hover:bg-muted",
          isDragging && "border-primary/50 bg-primary/5"
        )}
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onKeyDown={handleKeyDown}
        type="button"
      >
        <div className="rounded-full bg-background p-3 shadow-sm">
          <FilePlus className="h-6 w-6 text-muted-foreground" />
        </div>
        <div className="text-center">
          <p className="font-medium text-sm">Click to select</p>
          <p className="text-muted-foreground text-xs">
            or drag and drop file here
          </p>
        </div>
      </button>
    </div>
  );
}
