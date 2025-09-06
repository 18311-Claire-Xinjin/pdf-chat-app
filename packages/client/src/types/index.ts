export type Theme = "dark" | "light" | "system";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export interface FileData {
  name: string;
  size: number;
  path: string;
  uploadedAt: string;
  status: "ready" | "processing" | "error";
}

export interface MetaData {
  totalChunks: number;
  totalPages: number;
}

export type PdfStatus = "idle" | "uploading" | "processing" | "ready" | "error";
