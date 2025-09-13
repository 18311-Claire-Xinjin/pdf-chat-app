import type { SessionStatus } from "@/types";

const statusMessages: Record<SessionStatus, string> = {
  idle: "",
  uploading: "📤 Uploading your PDF.",
  uploaded: "⚙️ Preparing to process the PDF.",
  extracting: "📖 Extracting text from the PDF.",
  chunking: "✂️ Splitting content into smaller chunks.",
  embedding: "🧠 Generating embeddings for semantic search.",
  storing: "📦 Storing data into the vector database.",
  complete: "🎉 Processing complete! You can now start chatting with your PDF.",
  chatting: "",
  error: "😓 Something went wrong during processing, please try again.",
};

export function getStatusMessage(status: SessionStatus) {
  return statusMessages[status];
}
