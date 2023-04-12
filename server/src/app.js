import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import "express-async-errors";
import helmet from "helmet";
import { rateLimit as rateLimiter } from "express-rate-limit";

import connectDB from "./db/connect.js";
import { router as authRouter } from "./routes/auth.js";

import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

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

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

// router
app.use("/api/v1/auth", authRouter);

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
