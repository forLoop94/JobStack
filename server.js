//import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

import morgan from "morgan";
import mongoose from "mongoose";
import userRouter from "./routes/api/userRouter.js";
import authRouter from "./routes/authRouter.js";

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/v1/auth", authRouter);

const port = process.env.PORT || 3000;

try {
  // old
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // await mongoose.connect(process.env.MONGO_URL);

  console.log("mongodb is connected");
  app.listen(port, () => {
    console.log(`listening on port ${port}...`);
  });
} catch (error) {
  console.log("MongoDB connection error:", error);
  // console.error('MongoDB connection error:', error);
  process.exit(1);
}
