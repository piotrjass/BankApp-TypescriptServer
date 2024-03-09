import express from "express";
import { login, checkCookie } from "../controlers/authControler";

const router = express.Router();
router.post("/login", login);
router.get("/login", checkCookie);

export default router;
