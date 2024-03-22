import { errorHandler } from "../utils/error.js";
import Comment from "../models/comment.model.js";
export const createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;
    console.log(req.body);
    if (userId !== req.user._id.toString()) {
      return next(
        errorHandler(400, "You are not allowed to create this comment")
      );
    }
    const newComment = new Comment({
      content,
      postId,
      userId,
    });
    await newComment.save();
    res.status(200).json(newComment);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const getPostComments = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ postId })
      .sort({ createdAt: -1 })
      .populate("userId");
    res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const editComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return next(errorHandler(400, "Comment not found"));
    }
    if (comment.userId.toString() !== req.user._id.toString()) {
      return next(errorHandler(403, "You are not Allowed edit this comment"));
    }
    console.log(req.body);
    const editedComment = await Comment.findByIdAndUpdate(
      commentId,
      {
        content: req.body.content,
      },
      {
        new: true,
      }
    );
    await editedComment.save();
    res.status(200).json(editedComment);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const likeComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return next(errorHandler(400, "Comment not found"));
    }
    const userIndex = comment.likes.indexOf(req.user._id);
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.user._id);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const deleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return next(errorHandler(400, "Comment not found"));
    }
    if (
      comment.userId.toString() !== req.user._id.toString() &&
      !req.user.isAdmin
    ) {
      return next(errorHandler(403, "You are not allowed delete this comment"));
    }

    await Comment.findByIdAndDelete(commentId);
    res.status(200).json("Comment has been deleted");
  } catch (error) {
    console.log(error);
    next(error);
  }
};
