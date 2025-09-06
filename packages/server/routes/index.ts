import { Router, type Request, type Response } from "express";

import { sessionController } from "../controllers/session.controller";
import { uploadController } from "../controllers/upload.controller";
import { uploadService } from "../services/upload.service";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World!" });
});

router.post("/session/verify", sessionController.verify);
router.delete("/session/delete", sessionController.delete);

router.post("/upload", uploadService.middleware(), uploadController.upload);

export default router;
