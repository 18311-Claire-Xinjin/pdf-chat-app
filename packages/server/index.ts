import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import router from "./routes";

import { sessionController } from "./controllers/session.controller";

dotenv.config();

const app = express();

app.use(cors());

app.use(sessionController.middleware);

app.use("/api", router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
