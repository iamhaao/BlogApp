import { errorHandler } from "../utils/error.js";
import Post from "../models/post.model.js";
import { now } from "mongoose";
export const create = async (req, res, next) => {
  try {
    const { title, content, image, category } = req.body;
    if (!title || !content) {
      return next(errorHandler(400, "Please provide all requred fields"));
    }
    const slug = title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "-");

    const newPost = new Post({
      title,
      content,
      slug,
      category,
      image,
      userId: req.user._id,
    });

    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    next(error);
  }
};
export const getPosts = async (req, res, next) => {
  try {
    console.log(req.query);
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const query = {};

    if (req.query.userId) query.userId = req.query.userId;
    if (req.query.category) query.category = req.query.category;
    if (req.query.slug) query.slug = req.query.slug;
    if (req.query.postId) query._id = req.query.postId;
    if (req.query.searchTerm) {
      query.$or = [
        { title: { $regex: req.query.searchTerm, $options: "i" } },
        { content: { $regex: req.query.searchTerm, $options: "i" } },
      ];
    }

    const posts = await Post.find(query)
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPost = await Post.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    res.status(200).json({ posts, totalPost, lastMonthPosts });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const deletePost = async (req, res, next) => {
  try {
    if (!req.user.isAdmin || req.user._id.toString() !== req.params.userId) {
      return next(errorHandler(401, "You are not allow to delete this Post!"));
    }
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json({ message: "Delete success" });
  } catch (error) {
    next(error);
  }
};
export const updatePost = async (req, res, next) => {
  try {
    if (!req.user.isAdmin || req.user._id.toString() !== req.params.userId) {
      return next(errorHandler(401, "You are not allow to delete this Post!"));
    }
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          image: req.body.image,
          category: req.body.category,
          content: req.body.content,
        },
      },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};
