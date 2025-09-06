import type { NextFunction, Request, Response } from "express";

import { sessionService } from "../services/session.service";

export const sessionController = {
  middleware(req: Request, res: Response, next: NextFunction) {
    const sessionId = req.headers["x-session-id"];

    if (
      !sessionId ||
      typeof sessionId !== "string" ||
      sessionId.trim().length === 0
    ) {
      return res.status(400).json({ error: "x-session-id header is required" });
    }

    req.sessionId = sessionId;

    next();
  },

  verify(req: Request, res: Response) {
    try {
      const sessionId = req.sessionId;

      if (sessionService.checkSession(sessionId) === false) {
        return res.status(404).json({ error: "Session not found" });
      }

      const session = sessionService.getSession(sessionId);

      return res.json({ session });
    } catch (error) {
      console.error("Error verifying session:", error);
      return res.status(500).json({ error: "Failed to verify session" });
    }
  },

  delete(req: Request, res: Response) {
    try {
      const sessionId = req.sessionId;

      if (sessionService.checkSession(sessionId) === false) {
        return res.status(404).json({ error: "Session not found" });
      }

      // Todo: Delete uploaded files
      // Todo: Delete vector embeddings from Pinecone

      sessionService.deleteSession(sessionId);

      return res.json({ message: "Session deleted successfully" });
    } catch (error) {
      console.error("Error deleting session:", error);
      return res.status(500).json({ error: "Failed to delete session" });
    }
  },
};
