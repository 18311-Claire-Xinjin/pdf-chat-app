import { useRef, useState } from "react";
import { X } from "lucide-react";

import type { PdfStatus } from "@/types";

import { Logo } from "../layout/logo";
import { PdfDropzone } from "./pdf-dropzone";
import { formatFileSize } from "@/lib/format-file-size";
import api from "@/api";

export function UploadSection() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [pdfStatus, setPdfStatus] = useState<PdfStatus>("idle");

  const handleUploadPdf = (fileObj: File) => {
    setPdfStatus("uploading");

    const formData = new FormData();
    formData.append("pdf", fileObj);

    api
      .post("/api/upload", formData)
      .then((res) => {
        console.log(res);
        setPdfStatus("processing");
      })
      .catch((err) => {
        console.error("Error uploading pdf:", err);
        setPdfStatus("error");
      });
  };

  const handleFileSelect = (fileObj: File | null) => {
    // Add Validations Here

    setFile(fileObj);

    if (fileObj) {
      handleUploadPdf(fileObj);
    }
  };

  const handleFileRemove = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-start justify-center gap-6">
      {file ? (
        <div className="rounded-2xl w-full border px-4 py-3">
          <div className="flex items-start gap-2">
            <div className="flex items-center gap-4">
              <div>
                <Logo />
              </div>
              <div className="flex flex-col gap-0.5 w-full">
                <p className="truncate overflow-ellipsis text-base">
                  {file.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {formatFileSize(file.size)}
                </p>
              </div>
            </div>

            <button
              className="ml-auto cursor-pointer rounded-full p-1 hover:bg-muted"
              onClick={handleFileRemove}
              type="button"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <PdfDropzone setFile={handleFileSelect} fileInputRef={fileInputRef} />
      )}

      {pdfStatus !== "idle" && (
        <div className="flex items-center gap-3">
          <div
            className="animate-spin shrink-0 inline-block size-5 border-3 border-current border-t-transparent text-muted-foreground rounded-full"
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </div>
          <h1 className="text-sm font-medium text-muted-foreground">
            {pdfStatus === "uploading"
              ? "Uploading your pdf, please wait..."
              : pdfStatus === "processing"
                ? "Extracting chunks, generating embedding, creating vectors..."
                : pdfStatus === "error"
                  ? "Failed to upload pdf, please try again."
                  : "Ready to chat"}
          </h1>
        </div>
      )}
    </div>
  );
}
