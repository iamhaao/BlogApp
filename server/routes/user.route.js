import express from "express";
import {
  deleteUser,
  getUsers,
  signout,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyAdmin, verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, verifyAdmin, deleteUser);
router.post("/signout", verifyToken, signout);
router.get("/getUsers", verifyToken, verifyAdmin, getUsers);

export default router;
