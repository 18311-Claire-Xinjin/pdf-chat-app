import type { NextFunction, Request, Response } from "express";

import { sessionService } from "../services/session.service";
import { uploadService } from "../services/upload.service";
import { getPineconeIndex } from "../utils/pinecone";

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

  async verify(req: Request, res: Response) {
    try {
      const sessionId = req.sessionId;

      const isSessionExists = await sessionService.checkSession(sessionId);

      if (!isSessionExists) {
        await uploadService.deleteFiles(sessionId);

        return res.status(404).json({ error: "Session not found" });
      }

      const session = await sessionService.getSession(sessionId);

      return res.json({ session });
    } catch (error) {
      console.error("Error verifying session:", error);
      return res.status(500).json({ error: "Failed to verify session" });
    }
  },

  async status(req: Request, res: Response) {
    try {
      const sessionId = req.sessionId;

      const isSessionExists = await sessionService.checkSession(sessionId);

      if (!isSessionExists) {
        return res.status(404).json({ error: "Session not found" });
      }

      const session = await sessionService.getSession(sessionId);

      return res.json({ session });
    } catch (error) {
      console.error("Error verifying session:", error);
      return res.status(500).json({ error: "Failed to verify session" });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const sessionId = req.sessionId;

      const isSessionExists = await sessionService.checkSession(sessionId);

      if (!isSessionExists) {
        return res.status(404).json({ error: "Session not found" });
      }

      await uploadService.deleteFiles(sessionId);

      const pineconeIndex = await getPineconeIndex();
      await pineconeIndex.deleteNamespace(sessionId);

      await sessionService.deleteSession(sessionId);

      return res.json({ message: "Session deleted successfully" });
    } catch (error) {
      console.error("Error deleting session:", error);
      return res.status(500).json({ error: "Failed to delete session" });
    }
  },
};
