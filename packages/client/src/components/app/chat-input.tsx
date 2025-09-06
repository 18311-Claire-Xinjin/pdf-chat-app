import { useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "../ui/button";

export function ChatInput() {
  const [message, setMessage] = useState("");

  return (
    <div className="max-w-xl w-full mx-auto rounded-2xl p-2 min-h-[80px] flex flex-col justify-between items-end border border-muted-foreground/25 bg-muted/50 transition-colors">
      <textarea
        name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here..."
        className="bg-transparent px-3 py-2 text-foreground resize-none border-none outline-none w-full flex-1 text-base leading-relaxed"
        rows={2}
      />

      <Button size="sm" className="h-8 w-8 p-0 rounded-full">
        <ArrowUp className="h-5 w-5" />
      </Button>
    </div>
  );
}
