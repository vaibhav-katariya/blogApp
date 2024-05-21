import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({limit: "50mb"}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// user routers

import userRouter from "./routes/user.routes.js";
import blogRouter from "./routes/blog.routes.js"

app.use("/api/v2/users", userRouter);
app.use("/api/v2/Blog",blogRouter)

export { app };
