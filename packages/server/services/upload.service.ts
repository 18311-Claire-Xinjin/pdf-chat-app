import path from "node:path";
import multer from "multer";
import express, { type Request } from "express";

import { MAX_FILE_SIZE } from "../utils/constant";

const uploadsDir = path.join(process.cwd(), "uploads");

export const uploadService = {
  middleware: (): express.RequestHandler => {
    const upload = multer({
      storage: multer.diskStorage({
        destination: (
          req: Request,
          file: Express.Multer.File,
          cb: (error: Error | null, destination: string) => void
        ): void => {
          cb(null, uploadsDir);
        },

        filename: (
          req: Request,
          file: Express.Multer.File,
          cb: (error: Error | null, filename: string) => void
        ): void => {
          const sessionId = req.headers["x-session-id"];
          const timestamp = Date.now();
          const sanitizedName = file.originalname.replace(
            /[^a-zA-Z0-9.-]/g,
            "_"
          );
          const fileName = `${sessionId}_${timestamp}_${sanitizedName}`;

          cb(null, fileName);
        },
      }),
      limits: {
        fileSize: MAX_FILE_SIZE,
      },
      fileFilter: (req, file, cb) => {
        if (file.mimetype === "application/pdf") {
          cb(null, true);
        } else {
          cb(new Error("Only PDF files are allowed"));
        }
      },
    });

    return upload.single("pdf");
  },
};
