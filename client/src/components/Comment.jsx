import React, { useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button, Textarea } from "flowbite-react";
import { useMutation } from "react-query";
import { editComment } from "../api/comment.api";
import Toast from "../shared/Toast";
function Comment({ comment, onLike, onEdit, onDelete }) {
  const { currentUser } = useSelector((state) => state.user);
  const [editContent, setEditContent] = useState(comment.content);
  const [isEditing, setIsEditting] = useState(false);
  const handleEdit = () => {
    setIsEditting(true);
    setEditContent(comment.content);
  };
  const hanldeSave = () => {
    onEdit(comment._id, editContent);
    setIsEditting(false);
  };
  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          className="w-10 h-10 rounded-full bg-gray-200"
          src={comment.userId.avatar}
          alt={comment.userId.username}
        />
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate">
            {comment.userId ? `@${comment.userId.username}` : "anomymous user"}
          </span>
          <span className="text-gray-500 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        {isEditing ? (
          <>
            <Textarea
              className="mb-2"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
            <div className="flex justify-end gap-4 text-xs">
              <Button
                type="button"
                size={"sm"}
                gradientDuoTone={"purpleToBlue"}
                onClick={hanldeSave}
              >
                Save
              </Button>
              <Button
                type="button"
                size={"sm"}
                gradientDuoTone={"purpleToBlue"}
                className=""
                outline
                onClick={() => setIsEditting(false)}
              >
                Cancle
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-500 pb-2">{comment.content}</p>
            <div className="flex items-center pt-2 text-xs gap-2">
              <button
                type="button"
                onClick={() => onLike(comment._id)}
                className={`text-gray-400 hover:text-blue-500 ${
                  currentUser &&
                  comment.likes && // Check if comment.likes exists
                  comment.likes.includes(currentUser._id) &&
                  "!text-blue-500"
                } `}
              >
                <FaThumbsUp className="text-xs" />
              </button>
              <p className="text-gray-400 text-xs">
                {comment.numberOfLikes > 0 &&
                  comment.numberOfLikes +
                    " " +
                    (comment.numberOfLikes === 1 ? "like" : "likes")}
              </p>
              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <>
                    <button
                      type="button"
                      onClick={handleEdit}
                      className="hover:text-blue-500 text-gray-400"
                    >
                      edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(comment._id)}
                      className="text-red-500 hover:text-gray-400"
                    >
                      delete
                    </button>
                  </>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Comment;
