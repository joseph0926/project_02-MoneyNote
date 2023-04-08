import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import helmet from "helmet";
import xss from "xss";
import { rateLimit as rateLimiter } from "express-rate-limit";

import connectDB from "./db/connect.js";

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
app.use(xss);

app.use(express.json());

// router

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
