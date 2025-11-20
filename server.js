import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import userRouter from "./routes/api/userRouter.js";
import authRouter from "./routes/api/authRouter.js";
import jobRouter from "./routes/api/jobRouter.js";
import { authenticateUser } from "./middlewares/authenticateUser.js";

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Static files middleware
const clientPath = path.resolve(__dirname, "./client/dist");
app.use(express.static(clientPath));

app.use(cookieParser());
app.use(express.json());

app.use(helmet());
app.use(mongoSanitize());

app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobRouter);

// Configure Express to trust the proxy
app.set("trust proxy", true);

// Serve the index.html for any other routes
app.get(/.*/, (req, res) => {
  // res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
  res.sendFile(path.join(clientPath, "index.html"));
});

// Handle 404 - Not Found
app.use((req, res) => {
  res.status(404).json({ msg: "Resources not found" });
});

// Error handler middleware
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

try {
  await mongoose.connect(process.env.MONGO_URL);

  console.log("mongodb is connected");
  app.listen(port, () => {
    console.log(`listening on port ${port}...`);
  });
} catch (error) {
  console.log("MongoDB connection error:", error);
  process.exit(1);
}
