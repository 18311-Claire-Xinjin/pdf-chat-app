import { useMemo, useRef, useState } from "react";
import { Trash2 } from "lucide-react";

import api from "@/api";

import { Button } from "../ui/button";
import { Logo } from "../layout/logo";
import { PdfDropzone } from "./pdf-dropzone";
import { StatusProgress } from "./status-progress";
import { DeleteSessionConfirmation } from "../modals/delete-session-confirmation";

import { cn } from "@/lib/utils";
import { formatFileSize } from "@/lib/format-file-size";

import { useAppState } from "@/hooks/use-app-state";
import { EXAMPLE_SESSIONS } from "@/lib/example-sessions";
import { PdfIcon } from "@/svgs";

export function UploadSection() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pollingRef = useRef<NodeJS.Timeout>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isStatusRequestInProgress, setIsStatusRequestInProgress] =
    useState(false);

  const [openDeleteSessionConfirmation, setOpenDeleteSessionConfirmation] =
    useState(false);

  const {
    status,
    setStatus,
    file,
    setFile,
    metadata,
    setMetadata,
    setSessionId,
  } = useAppState();

  const handleStatusUpdate = () => {
    if (isStatusRequestInProgress) {
      return;
    }

    setIsStatusRequestInProgress(true);

    api
      .get("/api/session/status")
      .then((res) => {
        setStatus(res.data.session.status);
        if (!metadata && res.data.session.metadata) {
          setMetadata(res.data.session.metadata);
        }
        if (res.data.session.status === "complete" && pollingRef.current) {
          clearInterval(pollingRef.current);
        }
      })
      .catch((err) => {
        console.error("Error updating status:", err);
      })
      .finally(() => {
        setIsStatusRequestInProgress(false);
      });
  };

  const handleUploadPdf = (fileObj: File) => {
    setStatus("uploading");

    const formData = new FormData();
    formData.append("pdf", fileObj);

    api
      .post("/api/upload", formData)
      .then((res) => {
        setStatus(res.data.session.status);
        setFile(res.data.session.file);
        pollingRef.current = setInterval(handleStatusUpdate, 3000);
      })
      .catch((err) => {
        console.error("Error uploading pdf:", err);
        setStatus("error");
      });
  };

  const handleFileSelect = (fileObj: File | null) => {
    // Add Validations Here
    setSelectedFile(fileObj);

    if (fileObj) {
      handleUploadPdf(fileObj);
    }
  };

  const fileData = useMemo(() => selectedFile || file, [selectedFile, file]);

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-start justify-center gap-6 mt-8">
      {fileData ? (
        <div
          className={cn(
            "rounded-2xl w-full border px-4 py-3 flex flex-col gap-6",
            {
              "border border-destructive/20 bg-destructive/5":
                status === "error",
            }
          )}
        >
          <div className="flex items-start gap-2">
            <div className="flex items-center gap-4 w-full">
              <div className="shrink-0">
                <Logo />
              </div>
              <div className="flex flex-col gap-0.5 w-0 flex-1 min-w-0">
                <p className="truncate overflow-ellipsis text-base">
                  {fileData?.name ?? "No Name"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {formatFileSize(fileData?.size ?? 0)}
                </p>
              </div>
              {status === "complete" && (
                <DeleteSessionConfirmation
                  open={openDeleteSessionConfirmation}
                  onOpenChange={setOpenDeleteSessionConfirmation}
                >
                  <Button
                    size="icon"
                    variant="outline"
                    className="cursor-pointer"
                  >
                    <Trash2 />
                  </Button>
                </DeleteSessionConfirmation>
              )}
            </div>
          </div>

          <StatusProgress
            currentStatus={status}
            onStartChat={() => {
              setStatus("chatting");
            }}
          />
        </div>
      ) : (
        <>
          <PdfDropzone setFile={handleFileSelect} fileInputRef={fileInputRef} />
          <div className="flex items-center justify-center w-full flex-col gap-6">
            <p className="italic text-sm text-muted-foreground">
              or, give it a try with a sample pdf
            </p>
            <div className="flex items-center flex-col gap-2">
              {EXAMPLE_SESSIONS.map((session) => (
                <Button
                  key={session.sessionId}
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => {
                    setSessionId(session.sessionId);
                    setStatus(session.status);
                    setFile(session.file);
                    setMetadata(session.metadata);
                  }}
                >
                  <PdfIcon className="shrink-0 size-5" />
                  <span>{session.file.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
