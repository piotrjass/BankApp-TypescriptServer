import express from "express";
import { sendTransfer } from "../controlers/transferControler";

const router = express.Router();
router.post("/transfer", sendTransfer);

export default router;
