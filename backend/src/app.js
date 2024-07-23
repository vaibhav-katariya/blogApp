import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: ['https://blog-app-omega-jet.vercel.app' , '*'],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// user routers

import userRouter from "./routes/user.routes.js";
import blogRouter from "./routes/blog.routes.js"
import commenrRouter from './routes/comment.routes.js'

app.use("/api/v2/users", userRouter);
app.use("/api/v2/Blog",blogRouter)
app.use("/api/v2/comment",commenrRouter)

export { app };
