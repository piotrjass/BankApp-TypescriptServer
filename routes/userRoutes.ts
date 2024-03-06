import express from "express";
import { createUser } from "../controlers/userControler";

const router = express.Router();
router.post("/user", createUser);

export default router;
