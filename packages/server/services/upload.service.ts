import path from "node:path";
import fs from "node:fs";
import multer from "multer";
import express, { type Request } from "express";

import { MAX_FILE_SIZE } from "../utils/constant";

const uploadsDir = path.join(process.cwd(), "uploads");

export const uploadService = {
  createUploadDir: () => {
    if (!fs.existsSync(uploadsDir))
      fs.mkdirSync(uploadsDir, { recursive: true });
  },

  deleteFiles: (
    sessionId: string
  ): Promise<{ success: boolean; message: string }> => {
    return new Promise((resolve) => {
      try {
        if (!fs.existsSync(uploadsDir)) {
          return resolve({
            success: true,
            message: "Uploads directory does not exist",
          });
        }

        const files = fs.readdirSync(uploadsDir);
        const sessionFiles = files.filter((file) =>
          file.startsWith(`${sessionId}_`)
        );

        if (sessionFiles.length === 0) {
          return resolve({
            success: true,
            message: "No files found for this session",
          });
        }

        let deletedCount = 0;
        sessionFiles.forEach((file) => {
          try {
            const filePath = path.join(uploadsDir, file);
            fs.unlinkSync(filePath);
            deletedCount++;
          } catch (error) {
            console.error(`Error deleting file ${file}:`, error);
          }
        });

        resolve({
          success: true,
          message: `Successfully deleted ${deletedCount} file(s)`,
        });
      } catch (error) {
        console.error("Error in deleteFilesBySessionId:", error);
        resolve({
          success: false,
          message: "Failed to delete files",
        });
      }
    });
  },

  middleware: (): express.RequestHandler => {
    const upload = multer({
      storage: multer.diskStorage({
        destination: (
          req: Request,
          file: Express.Multer.File,
          cb: (error: Error | null, destination: string) => void
        ): void => {
          uploadService.createUploadDir();
          cb(null, uploadsDir);
        },

        filename: (
          req: Request,
          file: Express.Multer.File,
          cb: (error: Error | null, filename: string) => void
        ): void => {
          const sessionId = req.sessionId;
          const sanitizedName = file.originalname.replace(
            /[^a-zA-Z0-9.-]/g,
            "_"
          );
          const fileName = `${sessionId}_${sanitizedName}`;

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
