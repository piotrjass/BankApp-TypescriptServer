import express from "express";
import { getCards } from "../controlers/cardsControler";

const router = express.Router();
router.get("/card/:id", getCards);

export default router;
