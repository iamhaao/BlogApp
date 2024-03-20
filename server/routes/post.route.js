import express from "express";
import { verifyAdmin, verifyToken } from "../utils/verifyUser.js";
import {
  create,
  deletePost,
  getPosts,
} from "../controllers/post.controller.js";

const router = express.Router();
router.post("/", verifyToken, verifyAdmin, create);
router.get("/getPosts", getPosts);
router.delete(
  "/deletePost/:postId/:userId",
  verifyToken,
  verifyAdmin,
  deletePost
);

export default router;
