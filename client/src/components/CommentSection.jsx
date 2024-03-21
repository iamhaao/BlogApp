import { Button, Textarea } from "flowbite-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import { createComment } from "../api/comment.api";
import Toast from "../shared/Toast";
function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const { mutate, isLoading } = useMutation(createComment, {
    onSuccess: () => {
      Toast({ message: "Add comment success!", type: "SUCCESS" });
    },
    onError: (error) => {
      Toast({ message: error.message, type: "ERROR" });
    },
  });
  const handleSubmitComment = () => {
    mutate({ content: comment, userId: currentUser._id, postId });
  };
  return (
    <div className="max-w-3xl flex flex-col gap-3 mx-auto w-full p-3">
      {currentUser ? (
        <div className=" flex items-center gap-1 text-gray-500 text-sm">
          <p>Signed in as: </p>
          <img
            className="w-5 h-5 object-cover rounded-full"
            src={currentUser.avatar}
            alt={currentUser.fullName}
          />
          <Link
            className="text-xs text-cyan-600 hover:underline"
            to={"/dashboard?tab=profile"}
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-teal-500 my-5 flex gap-1">
          You must be signed in to comment.
          <Link className="text-blue-500 hover:underline" to={"/sign-in"}>
            Sign In{" "}
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmitComment}
          className="border border-teal-500 rounded-md p-3"
        >
          <Textarea
            placeholder="Add a comment...."
            rows={"3"}
            maxLength="500"
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="flex justify-between items-center mt-5">
            <p className="text-gray-500 text-sm">
              {500 - comment.length} characters remain
            </p>
            <Button
              disabled={isLoading || !comment}
              type="submit"
              outline
              gradientDuoTone={"purpleToBlue"}
            >
              Submit
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

export default CommentSection;
