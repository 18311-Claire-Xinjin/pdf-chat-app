import { useMemo } from "react";
import { ArrowLeft, ArrowRight, Clock, Sigma } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import type { ChatMessage } from "@/types";

import { formatCount } from "@/lib/format-count";
import { cn } from "@/lib/utils";

export function ChatMessageStat({ message }: { message: ChatMessage }) {
  const stat = useMemo(() => {
    const stats = [];

    if (message?.generationTime) {
      stats.push({
        icon: Clock,
        count: message.generationTime,
        tooltip: "Response generation time",
      });
    }

    if (message?.usage_metadata?.input_tokens) {
      stats.push({
        icon: ArrowLeft,
        count: formatCount(message.usage_metadata.input_tokens),
        tooltip: "Input tokens consumed",
      });
    }

    if (message?.usage_metadata?.output_tokens) {
      stats.push({
        icon: ArrowRight,
        count: formatCount(message.usage_metadata.output_tokens),
        tooltip: "Output tokens generated",
      });
    }

    if (message?.usage_metadata?.total_tokens) {
      stats.push({
        icon: Sigma,
        count: formatCount(message.usage_metadata.total_tokens),
        tooltip: "Total tokens used",
      });
    }

    return stats;
  }, [message]);

  if (message.role === "user") return null;

  return (
    <>
      {stat.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <div
                className={cn(
                  "inline-flex items-center justify-center gap-1 shrink-0 w-fit",
                  "px-2 py-0.5 rounded-md border font-bricolage tracking-wide",
                  "font-medium whitespace-nowrap text-sm text-muted-foreground",
                  "[&>svg]:size-3.5 [&>svg]:pointer-events-none cursor-default",
                  "bg-muted dark:bg-muted/30 border-muted dark:border-muted/50"
                )}
              >
                <Icon />
                <span>{stat.count}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{stat.tooltip}</p>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </>
  );
}
