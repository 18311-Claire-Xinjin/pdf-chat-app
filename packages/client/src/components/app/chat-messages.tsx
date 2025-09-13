import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

import { useAppState } from "@/hooks/use-app-state";
import { cn } from "@/lib/utils";
import { UserIcon } from "@/svgs";

export function ChatMessages() {
  const { chatMessages } = useAppState();

  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [chatMessages]);

  const onCopyMessage = (e: React.ClipboardEvent) => {
    const selection = window.getSelection()?.toString().trim();
    if (selection) {
      e.preventDefault();
      e.clipboardData.setData("text/plain", selection);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {chatMessages.map((message, index) => (
        <div
          key={index}
          onCopy={onCopyMessage}
          ref={index === chatMessages.length - 1 ? lastMessageRef : null}
          className={cn("flex gap-1", {
            "self-end flex-row-reverse mt-8": message.role === "user",
            "mb-8": index === chatMessages.length - 1,
          })}
        >
          {message.role === "user" && (
            <div
              className={cn(
                "flex items-center justify-center shrink-0 size-10 rounded-lg",
                "bg-muted/30 border border-muted/50 text-muted-foreground"
              )}
            >
              <UserIcon />
            </div>
          )}
          <div
            className={cn("max-w-2xl prose", {
              "rounded-lg bg-muted/30 border border-muted/50 px-3 py-2":
                message.role === "user",
              "leading-7": message.role === "assistant",
            })}
          >
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        </div>
      ))}
    </div>
  );
}
