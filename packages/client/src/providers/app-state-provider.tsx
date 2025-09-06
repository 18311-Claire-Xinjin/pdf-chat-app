import { useState, type ReactNode } from "react";
import type { ChatMessage, FileData, MetaData } from "@/types";

import { AppStateContext } from "@/context/app-state-context";

import { getSessionIdFromLS, setSessionIdInLS } from "@/lib/session-id";

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [sessionId, setSessionId] = useState<string | null>(
    getSessionIdFromLS()
  );
  const [file, setFile] = useState<FileData | null>(null);
  const [metadata, setMetadata] = useState<MetaData | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const value = {
    sessionId,
    file,
    metadata,
    chatMessages,
    setSessionId: (id: string | null) => {
      setSessionId(id);
      setSessionIdInLS(id ?? "");
    },
    setFile,
    setMetadata,
    setChatMessages,
    addMessage: (msg: ChatMessage) => {
      setChatMessages((prev) => [...prev, msg]);
    },
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}
