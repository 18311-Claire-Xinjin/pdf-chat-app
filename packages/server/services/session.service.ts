type SessionStatus =
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

export interface Session {
  sessionId: string;
  status: SessionStatus;
  file: {
    name: string;
    size: number;
    path: string;
    uploadedAt: string;
  };
  metadata?: {
    totalChunks?: number;
    totalPages?: number;
  };
}

// In-memory session storage
const sessionStore = new Map<string, string>();

const createSessionKey = (id: string) => `session:${id}`;

export const sessionService = {
  createSession(session: Session): void {
    sessionStore.set(
      createSessionKey(session.sessionId),
      JSON.stringify(session)
    );
  },

  getSession(sessionId: string): Session | null {
    const session = sessionStore.get(createSessionKey(sessionId));
    return session ? (JSON.parse(session) as Session) : null;
  },

  getSessionStatus(sessionId: string): SessionStatus | null {
    const session = this.getSession(sessionId);
    return session?.status ?? null;
  },

  checkSession(sessionId: string): boolean {
    return sessionStore.has(createSessionKey(sessionId));
  },

  updateSession(sessionId: string, updates: Partial<Session>): void {
    const session = this.getSession(sessionId);
    if (!session) return;
    const updated = { ...session, ...updates };
    sessionStore.set(createSessionKey(sessionId), JSON.stringify(updated));
  },

  deleteSession(sessionId: string): void {
    sessionStore.delete(createSessionKey(sessionId));
  },
};
