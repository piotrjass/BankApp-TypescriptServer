import express, { Express } from "express";
import cors from "cors";
//
import userRouter from "./routes/userRoutes";
import cardsRouter from "./routes/cardsRoutes";
import contactsRouter from "./routes/contactsRoutes";
import transferRouter from "./routes/transferRoutes";
import authRouter from "./routes/authRoutes";
//
const app: Express = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
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
