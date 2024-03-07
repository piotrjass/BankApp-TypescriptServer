import express from "express";
import { login } from "../controlers/authControler";

const router = express.Router();
router.get("/login", login);

export default router;
