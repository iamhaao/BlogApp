import express from "express";
import { verifyAdmin, verifyToken } from "../utils/verifyUser.js";
import { create } from "../controllers/post.controller.js";

const router = express.Router();
router.post("/", verifyToken, verifyAdmin, create);

export default router;
