import { Router } from "express";

import { sessionController } from "../controllers/session.controller";
import { uploadController } from "../controllers/upload.controller";
import { uploadService } from "../services/upload.service";
import { chatController } from "../controllers/chat.controller";

const router = Router();

router.post("/session/verify", sessionController.verify);
router.get("/session/status", sessionController.status);
router.delete("/session/delete", sessionController.delete);

router.post("/upload", uploadService.middleware(), uploadController.upload);

router.post("/chat", chatController.sendMessage);

export default router;
