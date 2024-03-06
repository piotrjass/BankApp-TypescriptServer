import express from "express";
import {
  createUser,
  getUsers,
  deleteUser,
  updateUser,
} from "../controlers/userControler";

const router = express.Router();
router.get("/user", getUsers);
router.post("/user", createUser);
router.delete("/user/:id", deleteUser);
router.patch("/user/:id", updateUser);

export default router;
