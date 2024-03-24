import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../shared/Toast";
import { Button, Modal, ModalBody, ModalHeader, Table } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useMutation } from "react-query";
import Pagination from "./Pagination";
import { getCommentSuccess } from "../redux/commentSlice/commentSlice";
import { deleteComment, getAllComment } from "../api/comment.api";

function DashComments() {
  const { comments, totalComments, page, pages } = useSelector(
    (state) => state.comment
  );
  console.log(comments);
  const { currentUser } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [userIdDelete, setUserIdDelete] = useState();
  const dispatch = useDispatch();

  const { mutate: getComment } = useMutation(getAllComment, {
    onSuccess: (data) => {
      dispatch(getCommentSuccess(data));
    },
  });
  const handleOnchagePage = (data) => {
    getAllComment({ page: data });
  };
  const { mutate, isSuccess } = useMutation(deleteComment, {
    onSuccess: () => {
      Toast({ message: "Delete Comment Success!", type: "SUCCESS" });
    },
    onError: (error) => {
      Toast({ message: error.message, type: "ERROR" });
    },
  });

  useEffect(() => {
    if (currentUser.isAdmin) {
      getComment({ page });
    }
  }, [currentUser._id, isSuccess]);

  const handleDeleteComment = async () => {
    mutate(userIdDelete);
    setShowModal(false);
  };
  return (
    <div className="table-auto overflow-x-auto md:w-full p-3 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 scrollbar scrollbar-thumb-slate-300 scrollbar-track-slate-100">
      {comments && comments.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Created At</Table.HeadCell>
              <Table.HeadCell>Comment content</Table.HeadCell>
              <Table.HeadCell>Number of Likes</Table.HeadCell>
              <Table.HeadCell>PostId</Table.HeadCell>
              <Table.HeadCell>UserId</Table.HeadCell>
              <Table.HeadCell>
                <span className="hidden md:block">Delete</span>
              </Table.HeadCell>
            </Table.Head>
            {comments &&
              comments.map((comment) => (
                <Table.Body className="divide-y" key={comment._id}>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      {new Date(comment.updatedAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>{comment.content}</Table.Cell>
                    <Table.Cell>
                      <p className="font-medium">{comment.numberOfLikes}</p>
                    </Table.Cell>
                    <Table.Cell>{comment.postId}</Table.Cell>
                    <Table.Cell>{comment.userId}</Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => {
                          setShowModal(true);
                          setUserIdDelete(comment._id);
                        }}
                        className="font-medium hover:underline cursor-pointer text-red-500"
                      >
                        Delete
                      </span>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
          <Pagination
            page={page}
            pages={pages}
            onPageChange={handleOnchagePage}
          />
        </>
      ) : (
        <p>Not Comment Yet</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        size={"md"}
        popup
      >
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="w-14 h-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className=" mb-5 text-lg text-gray-500 dark:text-gray-200">
              Are you sure you want to delete this Comment ?
            </h3>
            <div className="flex justify-between">
              <Button onClick={handleDeleteComment} color="failure">
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

export default DashComments;
