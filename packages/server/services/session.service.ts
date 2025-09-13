import Redis from "ioredis";

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

const redis = new Redis(process.env.REDIS_URL!);

const createSessionKey = (id: string) => `session:${id}`;

export const sessionService = {
  async createSession(session: Session): Promise<void> {
    await redis.set(
      createSessionKey(session.sessionId),
      JSON.stringify(session)
    );
  },

  async getSession(sessionId: string): Promise<Session | null> {
    const session = await redis.get(createSessionKey(sessionId));
    return session ? (JSON.parse(session) as Session) : null;
  },

  async getSessionStatus(sessionId: string): Promise<SessionStatus | null> {
    const session = await this.getSession(sessionId);
    return session?.status ?? null;
  },

  async checkSession(sessionId: string): Promise<boolean> {
    return (await redis.exists(createSessionKey(sessionId))) === 1;
  },

  async updateSession(
    sessionId: string,
    updates: Partial<Session>
  ): Promise<void> {
    const session = await this.getSession(sessionId);
    if (!session) return;
    const updated = { ...session, ...updates };
    await redis.set(createSessionKey(sessionId), JSON.stringify(updated));
  },

  async deleteSession(sessionId: string): Promise<void> {
    await redis.del(createSessionKey(sessionId));
  },
};
