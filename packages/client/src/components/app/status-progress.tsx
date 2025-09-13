import { cn } from "@/lib/utils";
import { getStatusMessage } from "@/lib/get-status-message";

import type { SessionStatus } from "@/types";

const statusOrder: SessionStatus[] = [
  "uploading",
  "uploaded",
  "extracting",
  "chunking",
  "embedding",
  "storing",
  "complete",
  "chatting",
];

interface StatusProgressProps {
  currentStatus: SessionStatus;
  onStartChat?: () => void;
}

export function StatusProgress({
  currentStatus,
  onStartChat,
}: StatusProgressProps) {
  const currentIndex = statusOrder.indexOf(currentStatus);

  // Don't show anything for idle state
  if (currentStatus === "idle") {
    return null;
  }

  // Show error state
  if (currentStatus === "error") {
    return (
      <div className="text-destructive font-medium">
        {getStatusMessage("error")}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm font-medium text-muted-foreground mb-3">
        Processing Status:
      </p>

      <div className="space-y-3">
        {statusOrder.map((status, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isUpcoming = index > currentIndex;

          if (status === "complete" || status === "chatting") {
            return null;
          }

          return (
            <div
              key={status}
              className={cn(
                "flex items-center gap-3 text-sm transition-all duration-200",
                {
                  "text-muted-foreground": isCompleted,
                  "text-foreground font-medium": isCurrent,
                  "text-muted-foreground/60": isUpcoming,
                }
              )}
            >
              <div
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-200 shrink-0",
                  {
                    "bg-green-500": isCompleted,
                    "bg-blue-500 animate-pulse": isCurrent,
                    "bg-muted-foreground/30": isUpcoming,
                  }
                )}
              />

              <span
                className={cn("transition-all duration-200", {
                  "line-through decoration-muted-foreground/80": isCompleted,
                  "animate-pulse": isCurrent,
                })}
              >
                {`${isCurrent ? `${getStatusMessage(status)}..` : getStatusMessage(status)}`}
              </span>
            </div>
          );
        })}
      </div>

      {currentStatus === "complete" && (
        <div className="mt-4 space-y-4">
          <p className="text-sm font-medium mb-3">
            {getStatusMessage(currentStatus)}
          </p>

          <button
            onClick={onStartChat}
            className="w-full font-bricolage bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg cursor-pointer transition-all duration-200 transform active:scale-[0.98] shadow-lg hover:shadow-xl"
          >
            🚀 Start Chatting with Your PDF!
          </button>
        </div>
      )}
    </div>
  );
}
