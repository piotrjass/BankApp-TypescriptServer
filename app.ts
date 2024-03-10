import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
//
import userRouter from "./routes/userRoutes";
import cardsRouter from "./routes/cardsRoutes";
import contactsRouter from "./routes/contactsRoutes";
import transferRouter from "./routes/transferRoutes";
import authRouter from "./routes/authRoutes";
import { serialize } from "cookie";
//
import { checkCookie } from "./controlers/authControler";
//
const app: Express = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:4200",
  })
);

app.use("/api/v1", [
  userRouter,
  cardsRouter,
  contactsRouter,
  transferRouter,
  authRouter,
]);

export default app;
