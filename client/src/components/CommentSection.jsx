import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Spinner,
  Textarea,
} from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import {
  createComment,
  deleteComment,
  editComment,
  getComments,
  likeComment,
} from "../api/comment.api";
import Toast from "../shared/Toast";
import Comment from "./Comment";
import { HiOutlineExclamationCircle } from "react-icons/hi";
function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteCommentId, setDeleteCommentId] = useState("");
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation(createComment, {
    onSuccess: () => {
      Toast({ message: "Add comment success!", type: "SUCCESS" });
    },
    onError: (error) => {
      Toast({ message: error.message, type: "ERROR" });
    },
  });
  const { mutate: getCommentMutate, isLoading: getLoading } = useMutation(
    getComments,
    {
      onSuccess: (data) => {
        setComments(data);
      },
      onError: (error) => {
        Toast({ message: error.message, type: "ERROR" });
      },
    }
  );
  const { mutate: likeMutate, isLoading: likeLoading } = useMutation(
    likeComment,
    {
      onError: (error) => {
        Toast({ message: error.message, type: "ERROR" });
      },
    }
  );
  const { mutate: mutateEdit, isLoading: editLoading } = useMutation(
    editComment,
    {
      onSuccess: () => {
        Toast({ message: "Edited Success", type: "SUCCESS" });
      },
      onError: (error) => {
        Toast({ message: error.message, type: "ERROR" });
      },
    }
  );
  const { mutate: mutateDelete, isLoading: deleteLoading } = useMutation(
    deleteComment,
    {
      onSuccess: () => {
        Toast({ message: "Delete Success", type: "SUCCESS" });
      },
      onError: (error) => {
        Toast({ message: error.message, type: "ERROR" });
      },
    }
  );
  useEffect(() => {
    getCommentMutate(postId);
  }, [
    postId,
    likeLoading,
    isLoading,
    getCommentMutate,
    editLoading,
    deleteLoading,
  ]);
  const handleSubmitComment = () => {
    mutate({ content: comment, userId: currentUser._id, postId });
  };

  const handleLike = (commetId) => {
    if (!currentUser) {
      navigate("/sign-in");
      return;
    } else {
      likeMutate(commetId);
    }
  };

  const handleEdit = (commentId, content) => {
    mutateEdit({ content, commentId });
  };
  const handleDelete = (commentId) => {
    if (!currentUser) {
      navigate("/sign-in");
      return;
    } else {
      setShowModal(true);
      setDeleteCommentId(commentId);
    }
  };
  const onDeleteModal = () => {
    setShowModal(false);
    mutateDelete(deleteCommentId);
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
            <Button type="submit" outline gradientDuoTone={"purpleToBlue"}>
              Submit
            </Button>
          </div>
        </form>
      )}
      {comments.length === 0 ? (
        <p className="text-sm my-5">No comments yet!</p>
      ) : (
        <>
          <>
            <div className="text-sm my-5 flex items-center gap-1">
              <p>Comments</p>
              <div className="border border-gray-400 py-1 px-2 rounded-sm">
                <p>{comments.length}</p>
              </div>
            </div>
            {comments.map((comment) => (
              <Comment
                key={comment._id}
                comment={comment}
                onLike={handleLike}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </>
        </>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        size={"sm"}
        popup
      >
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="w-14 h-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className=" mb-5 text-lg text-gray-500 dark:text-gray-200">
              Are you sure you want to delete this comment ?
            </h3>
            <div className="flex justify-between">
              <Button color="failure" onClick={onDeleteModal}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default CommentSection;
