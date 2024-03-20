import express from "express";
import { verifyAdmin, verifyToken } from "../utils/verifyUser.js";
import {
  create,
  deletePost,
  getPosts,
  updatePost,
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
router.put("/updatePost/:postId/:userId", verifyToken, verifyAdmin, updatePost);

export default router;
