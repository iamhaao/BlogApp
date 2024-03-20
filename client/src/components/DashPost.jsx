import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { deletePost, getPosts } from "../api/post.api";
import Toast from "../shared/Toast";
import { Button, Modal, ModalBody, ModalHeader, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useMutation } from "react-query";
function DashPost() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdDelete, setPostIdDelete] = useState();
  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const data = await getPosts(currentUser._id, startIndex, "");
      setUserPosts((prev) => [...prev, ...data.posts]);
      if (data.posts.length < 9) {
        setShowMore(false);
      }
    } catch (error) {
      Toast({ message: error.message, type: "ERROR" });
    }
  };
  const { mutate, isLoading } = useMutation(deletePost, {
    onSuccess: () => {
      Toast({ message: "Delete Post Success!", type: "SUCCESS" });
    },
    onError: (error) => {
      Toast({ message: error.message, type: "ERROR" });
    },
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPosts(currentUser._id, "", "");
        setUserPosts(data.posts);
        console.log(data.posts.length);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      } catch (error) {
        console.log(error);
        Toast({ message: error.message, type: "ERROR" });
      }
    };
    if (currentUser.isAdmin) {
      fetchData();
    }
  }, [currentUser._id, isLoading]);
  const handleDeletePost = async () => {
    mutate({ postId: postIdDelete, userId: currentUser._id });
    setShowModal(false);
  };
  return (
    <div className=" table-auto overflow-x-auto md:w-full p-3 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 scrollbar scrollbar-thumb-slate-300 scrollbar-track-slate-100">
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date</Table.HeadCell>
              <Table.HeadCell>Post Image</Table.HeadCell>
              <Table.HeadCell>Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span className="hidden md:block">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {userPosts.map((post) => (
              <Table.Body className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(post.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-20 h-10 object-cover object-center"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <p className="font-medium">{post.title}</p>
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setPostIdDelete(post._id);
                      }}
                      className="font-medium hover:underline cursor-pointer text-red-500"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/update-post/${post._id}`}>
                      <span className="font-medium hover:underline cursor-pointer text-blue-500">
                        Edit
                      </span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>Not Post Yet</p>
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
              Are you sure you want to delete this post ?
            </h3>
            <div className="flex justify-between">
              <Button color="failure" onClick={handleDeletePost}>
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

export default DashPost;
