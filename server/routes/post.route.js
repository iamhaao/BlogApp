import express from "express";
import { verifyAdmin, verifyToken } from "../utils/verifyUser.js";
import { create, getPosts } from "../controllers/post.controller.js";

const router = express.Router();
router.post("/", verifyToken, verifyAdmin, create);
router.get("/getPosts", getPosts);

export default router;
