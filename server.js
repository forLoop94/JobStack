import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import userRouter from "./routes/api/userRouter.js";
import authRouter from "./routes/api/authRouter.js";
import jobRouter from "./routes/api/jobRouter.js";

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cookieParser());
app.use(express.json());

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.use("/api/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobRouter);

const port = process.env.PORT || 3000;

try {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("mongodb is connected");
  app.listen(port, () => {
    console.log(`listening on port ${port}...`);
  });
} catch (error) {
  console.log("MongoDB connection error:", error);
  process.exit(1);
}
