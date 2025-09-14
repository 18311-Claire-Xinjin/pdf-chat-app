import { FileText } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import type { ChatMessage } from "@/types";

import { cn } from "@/lib/utils";
import { PdfViewerModal } from "../modals/pdf-viewer";

export function ChatMessageSource({ message }: { message: ChatMessage }) {
  if (message.role === "user") return null;

  return (
    <div className="flex items-center gap-2">
      {message.sources && message.sources?.length > 0 && (
        <Tooltip>
          <TooltipTrigger asChild>
            <PdfViewerModal sources={message.sources}>
              <button
                className={cn(
                  "inline-flex items-center justify-center gap-1 shrink-0 w-fit",
                  "px-2 py-0.5 rounded-md border font-bricolage tracking-wide",
                  "font-medium whitespace-nowrap text-sm text-muted-foreground",
                  "[&>svg]:size-3.5 [&>svg]:pointer-events-none cursor-pointer",
                  "bg-muted dark:bg-muted/30 border-muted dark:border-muted/50"
                )}
              >
                <FileText />
                <span className="mt-0.5">{`${message.sources?.length} sources`}</span>
              </button>
            </PdfViewerModal>
          </TooltipTrigger>
          <TooltipContent>
            <p>Click to view sources</p>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}
