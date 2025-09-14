import express from "express";
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

// Serve static files from uploads directory
const uploadsDir = path.join(process.cwd(), "uploads");
app.use("/view", express.static(uploadsDir));

app.use(sessionController.middleware);

app.use("/api", router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
