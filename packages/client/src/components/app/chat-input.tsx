import type { KeyboardEvent } from "react";
import { useForm } from "react-hook-form";
import { ArrowUp } from "lucide-react";

import type { ChatInputData } from "@/types";

import { Button } from "../ui/button";
import { ViewPdfButton } from "./view-pdf-button";

type IProps = {
  onSubmit: (data: ChatInputData) => void;
};

export function ChatInput({ onSubmit }: IProps) {
  const { register, handleSubmit, reset, formState } = useForm<ChatInputData>();

  const handleFromSubmit = handleSubmit((data) => {
    reset({ prompt: "" });
    onSubmit(data);
  });

  const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleFromSubmit();
    }
  };

  return (
    <form
      onSubmit={handleFromSubmit}
      onKeyDown={handleKeyDown}
      className="max-w-2xl w-full mx-auto rounded-2xl p-2 min-h-[80px] flex flex-col justify-between border border-muted-foreground/25 bg-muted/50 transition-colors"
    >
      <textarea
        {...register("prompt", {
          required: true,
          validate: (data) => data.trim().length > 0,
        })}
        autoFocus
        placeholder="Type your message here..."
        className="bg-transparent px-3 py-2 text-foreground resize-none border-none outline-none w-full flex-1 text-base leading-relaxed"
        rows={2}
        maxLength={1000}
      />

      <div className="flex justify-between items-center gap-2 mt-1">
        <ViewPdfButton />
        <Button
          size="icon"
          className="h-8 w-8 rounded-full"
          disabled={!formState.isValid}
        >
          <ArrowUp className="size-[18px]" />
        </Button>
      </div>
    </form>
  );
}
