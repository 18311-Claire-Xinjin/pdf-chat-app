import { useAppState } from "@/hooks/use-app-state";
import { useSendMessage } from "@/hooks/use-send-message";
import { cn } from "@/lib/utils";

const suggestedQuestions = [
  "Give me a clear summary of the key points in this PDF.",
  "What are the most important topics discussed in this document?",
  "Highlight some practical examples or use cases from the PDF.",
  "Explain the complex parts of this document in simple terms.",
];

export function Hero() {
  const { status, chatMessages } = useAppState();

  const { sendMessage } = useSendMessage();

  if (chatMessages.length > 0) {
    return null;
  }

  return (
    <div className="flex flex-col pt-10 max-h-[calc(100vh-210px)] sm:max-h-[calc(100vh-218px)] overflow-y-auto scrollbar-hide scroll-smooth">
      <div className="text-center">
        <h1 className="text-balance font-bricolage font-semibold text-3xl md:text-4xl">
          Chat with Your PDF
        </h1>
        <p className="mx-auto mt-3 max-w-xl font-bricolage text-base text-muted-foreground leading-relaxed md:text-lg">
          Upload any PDF and start an intelligent conversation. Ask questions,
          get instant answers, and explore your documents like never before.
        </p>
      </div>

      {status === "chatting" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10 max-w-2xl pb-8 mx-auto">
          {suggestedQuestions.map((question, index) => (
            <button
              key={index}
              className={cn(
                "flex cursor-pointer rounded-md px-4 py-2",
                "text-muted-foreground border border-muted/50 bg-muted/30",
                "transition-colors duration-300 hover:border-muted hover:bg-muted"
              )}
              onClick={() => {
                sendMessage({ prompt: question });
              }}
            >
              <p className="text-left">{question}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
