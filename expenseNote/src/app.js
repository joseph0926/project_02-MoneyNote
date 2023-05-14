import path, { dirname } from "path";
import { fileURLToPath } from "url";

import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import "express-async-errors";
import helmet from "helmet";
import { rateLimit as rateLimiter } from "express-rate-limit";
import cors from "cors";

import connectDB from "./db/connect.js";
import { router as authRouter } from "./routes/auth.js";
import { router as expenseRouter } from "./routes/expense.js";

import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

const app = express();

// protect middleware
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
app.use(helmet());
app.use(cors());

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./client/dist")));

app.use(express.json());

// router
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/expense", authenticateUser, expenseRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

// error handler
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// start
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    console.log("DB 연결 성공!");
    app.listen(port, () => console.log(`서버가 포트번호 ${port}에서 정상작동중입니다...`));
  } catch (error) {
    console.log(error);
  }
};

start();
