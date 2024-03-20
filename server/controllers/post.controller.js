import { errorHandler } from "../utils/error.js";
import Post from "../models/post.model.js";
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
  } catch (error) {}
};
