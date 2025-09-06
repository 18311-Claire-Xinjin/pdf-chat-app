import { createContext } from "react";
import type { ChatMessage, FileData, MetaData } from "@/types";

type AppState = {
  sessionId: string | null;
  file: FileData | null;
  metadata: MetaData | null;
  chatMessages: ChatMessage[];

  setSessionId: (id: string | null) => void;
  setFile: (file: FileData | null) => void;
  setMetadata: (metadata: MetaData | null) => void;
  setChatMessages: (messages: ChatMessage[]) => void;
  addMessage: (msg: ChatMessage) => void;
};

const initialState: AppState = {
  sessionId: null,
  file: null,
  metadata: null,
  chatMessages: [],
  setSessionId: () => null,
  setFile: () => null,
  setMetadata: () => null,
  setChatMessages: () => null,
  addMessage: () => null,
};

export const AppStateContext = createContext<AppState | undefined>(
  initialState
);
