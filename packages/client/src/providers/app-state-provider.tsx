import { useState, type ReactNode } from "react";
import type { ChatMessage, FileData, MetaData, SessionStatus } from "@/types";

import { AppStateContext } from "@/context/app-state-context";

import { getSessionIdFromLS, setSessionIdInLS } from "@/lib/session-id";
import {
  getChatMessagesFromLS,
  removeChatMessagesFromLS,
  setChatMessagesInLS,
} from "@/lib/chat-messages";

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [sessionId, setSessionId] = useState<string | null>(
    getSessionIdFromLS()
  );
  const [status, setStatus] = useState<SessionStatus>("idle");
  const [file, setFile] = useState<FileData | null>(null);
  const [metadata, setMetadata] = useState<MetaData | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(
    getChatMessagesFromLS()
  );
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [error, setError] = useState("");
  const [isDeletingSession, setIsDeletingSession] = useState(false);

  const value = {
    sessionId,
    status,
    file,
    metadata,
    chatMessages,
    isBotTyping,
    error,
    isDeletingSession,
    setSessionId: (id: string | null) => {
      setSessionId(id);
      setSessionIdInLS(id ?? "");
    },
    resetSession: () => {
      const id = crypto.randomUUID();
      setSessionId(id);
      setSessionIdInLS(id);
      setStatus("idle");
      setFile(null);
      setMetadata(null);
      setChatMessages([]);
      setChatMessagesInLS([]);
      setIsBotTyping(false);
      setError("");
      setIsDeletingSession(false);
      removeChatMessagesFromLS();
    },
    setStatus,
    setFile,
    setMetadata,
    setChatMessages: (msgs: ChatMessage[]) => {
      setChatMessages(msgs);
      setChatMessagesInLS(msgs);
    },
    addMessage: (msg: ChatMessage) => {
      setChatMessages((prev) => {
        const messages = [...prev, msg];
        setChatMessagesInLS(messages);
        return messages;
      });
    },
    setIsBotTyping,
    setError,
    setIsDeletingSession,
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}
