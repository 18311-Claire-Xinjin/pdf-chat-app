import { ChatInput } from "./chat-input";
import { ChatMessages } from "./chat-messages";
import { TypingIndicator } from "./typing-indicator";

import { useAppState } from "@/hooks/use-app-state";
import { useSendMessage } from "@/hooks/use-send-message";

export function ChatSection() {
  const { isBotTyping, error } = useAppState();
  const { sendMessage } = useSendMessage();

  return (
    <>
      <div className="flex flex-col flex-1 gap-3 max-h-[calc(100vh-210px)] sm:max-h-[calc(100vh-218px)] overflow-y-auto scrollbar-hide scroll-smooth">
        <div className="max-w-2xl w-full mx-auto flex-1 flex flex-col gap-3">
          <ChatMessages />
          {isBotTyping && <TypingIndicator />}
          {error && (
            <p className="px-3 py-2 rounded-lg bg-destructive/5 border border-destructive/20 text-destructive mb-10">
              {error}
            </p>
          )}
        </div>
      </div>

      <ChatInput onSubmit={sendMessage} />
    </>
  );
}
