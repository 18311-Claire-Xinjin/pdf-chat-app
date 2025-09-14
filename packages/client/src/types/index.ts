export type Theme = "dark" | "light" | "system";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: {
    id: number;
    pageNumber: number;
  }[];
  usage_metadata?: {
    input_tokens: number;
    output_tokens: number;
    total_tokens: number;
  };
  generationTime?: string;
}

export interface FileData {
  name: string;
  size: number;
  path: string;
  uploadedAt: string;
}

export interface MetaData {
  totalChunks: number;
  totalPages: number;
}

export type SessionStatus =
  | "idle"
  | "uploading"
  | "uploaded"
  | "extracting"
  | "chunking"
  | "embedding"
  | "storing"
  | "complete"
  | "chatting"
  | "error";

export type ChatInputData = {
  prompt: string;
};
