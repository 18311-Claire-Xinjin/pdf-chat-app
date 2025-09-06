export interface Session {
  sessionId: string;
  file: {
    name: string;
    size: number;
    path: string;
    uploadedAt: string;
    status: "ready" | "processing" | "error";
  };
  metadata?: {
    totalChunks?: number;
    totalPages?: number;
  };
}

const sessions = new Map<string, Session>();

export const sessionService = {
  createSession(session: Session): void {
    sessions.set(session.sessionId, session);
  },

  getSession(sessionId: string): Session | null {
    return sessions.get(sessionId) || null;
  },

  checkSession(sessionId: string): boolean {
    return sessions.has(sessionId);
  },

  updateSession(sessionId: string, updates: Partial<Session>): void {
    const session = sessions.get(sessionId);
    if (session) {
      Object.assign(session, updates);
    }
  },

  deleteSession(sessionId: string) {
    sessions.delete(sessionId);
  },
};
