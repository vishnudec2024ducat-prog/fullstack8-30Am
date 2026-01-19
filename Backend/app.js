import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";
import { userAuthRouter, userRouter } from "./Routes/UserRoutes.js";
dotenv.config()
export const app = express()
app.use(
  cors({
    origin: process.env.FORNTEND_URL,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/auth", userAuthRouter);
app.use("/api/v1/user", userRouter);