import express from "express";
import { getContacts } from "../controlers/contactsControler";

const router = express.Router();
router.get("/contact/:id", getContacts);

export default router;
