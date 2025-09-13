import { createContext } from "react";
import type { ChatMessage, FileData, MetaData, SessionStatus } from "@/types";

type AppState = {
  sessionId: string | null;
  status: SessionStatus;
  file: FileData | null;
  metadata: MetaData | null;
  chatMessages: ChatMessage[];
  isBotTyping: boolean;
  error: string;
  isDeletingSession: boolean;

  setSessionId: (id: string | null) => void;
  resetSession: () => void;
  setStatus: (status: SessionStatus) => void;
  setFile: (file: FileData | null) => void;
  setMetadata: (metadata: MetaData | null) => void;
  setChatMessages: (messages: ChatMessage[]) => void;
  addMessage: (msg: ChatMessage) => void;
  setIsBotTyping: (isTyping: boolean) => void;
  setError: (err: string) => void;
  setIsDeletingSession: (isDeleting: boolean) => void;
};

const initialState: AppState = {
  sessionId: null,
  status: "idle",
  file: null,
  metadata: null,
  chatMessages: [],
  isBotTyping: false,
  error: "",
  isDeletingSession: false,
  setSessionId: () => null,
  resetSession: () => null,
  setStatus: () => null,
  setFile: () => null,
  setMetadata: () => null,
  setChatMessages: () => null,
  addMessage: () => null,
  setIsBotTyping: () => null,
  setError: () => null,
  setIsDeletingSession: () => null,
};

export const AppStateContext = createContext<AppState | undefined>(
  initialState
);
