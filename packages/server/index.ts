import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "node:path";

import router from "./routes";

import { sessionController } from "./controllers/session.controller";

dotenv.config();

const app = express();

const corsOptions = {
  origin:
    process.env.NODE_ENV === "production" && process.env.CORS_ORIGIN
      ? process.env.CORS_ORIGIN
      : "*",
};
app.use(cors(corsOptions));
app.use(express.json());

// Public routes (no session required)
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World!" });
});

// Serve static files from uploads directory (no session required)
const uploadsDir = path.join(process.cwd(), "uploads");
app.use("/view", express.static(uploadsDir));

// Apply session middleware only to API routes
app.use((req: Request, res: Response, next: NextFunction) => {
  // Skip session check for non-API routes
  if (!req.path.startsWith("/api/")) {
    return next();
  }
  sessionController.middleware(req, res, next);
});

// API routes (protected by session middleware)
app.use("/api", router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
