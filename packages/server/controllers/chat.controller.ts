import type { Request, Response } from "express";
import { chatService } from "../services/chat.service";
import { sessionService } from "../services/session.service";

export const chatController = {
  async sendMessage(req: Request, res: Response) {
    try {
      const sessionId = req.sessionId;

      const status = await sessionService.getSessionStatus(sessionId);
      if (status !== "chatting") {
        await sessionService.updateSession(sessionId, { status: "chatting" });
      }

      const prompt = req.body?.prompt;
      if (!prompt || typeof prompt !== "string") {
        return res.status(400).json({ error: "prompt is required" });
      }

      const response = await chatService.askQuestion(sessionId, prompt);

      return res.json(response);
    } catch (error) {
      console.error("Error in /chat:", error);
      return res.status(500).json({ error: "Failed to process chat request" });
    }
  },
};
