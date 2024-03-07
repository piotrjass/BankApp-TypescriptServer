import express, { Express } from "express";
//
import userRouter from "./routes/userRoutes";
import cardsRouter from "./routes/cardsRoutes";
import contactsRouter from "./routes/contactsRoutes";
import transferRouter from "./routes/transferRoutes";

//
const app: Express = express();
app.use(express.json());

app.use("/api/v1", [userRouter, cardsRouter, contactsRouter, transferRouter]);

export default app;
