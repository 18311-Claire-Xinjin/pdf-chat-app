import type { Request, Response } from "express";

import { sessionService, type Session } from "../services/session.service";
import { pdfProcessorService } from "../services/pdf-processor.service";

export const uploadController = {
  upload(req: Request, res: Response) {
    try {
      const sessionId = req.sessionId;

      if (!req.file) {
        res.status(400).json({ error: "No PDF file uploaded" });
        return;
      }

      const session: Session = {
        sessionId,
        status: "uploaded",
        file: {
          name: req.file.originalname,
          size: req.file.size,
          path: req.file.path,
          uploadedAt: new Date().toISOString(),
        },
      };

      sessionService.createSession(session);

      res.json({
        success: true,
        message: "PDF uploaded, processing started",
        session,
      });

      // Start PDF processing asynchronously
      pdfProcessorService.processDocument(sessionId, req.file.path);
    } catch (error) {
      console.error("Error uploading PDF:", error);
      return res.status(500).json({ error: "Upload failed" });
    }
  },
};
