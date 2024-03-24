import React, { useEffect } from "react";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { getAllComment } from "../api/comment.api";
import { getCommentSuccess } from "../redux/commentSlice/commentSlice";
import { getUsers } from "../api/user.api";
import { getUsersSuccess } from "../redux/user/userSlice";
import { getPosts } from "../api/post.api";
import { getAllPost, getPostSuccess } from "../redux/postSlice/postSlice";
import {
  HiOutlineAnnotation,
  HiOutlineDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";
function DashBoardContro() {
  const dispatch = useDispatch();
  const { totalUsers, users, currentUser } = useSelector((state) => state.user);
  const { totalComments, comments } = useSelector((state) => state.comment);
  const { totalPost, posts } = useSelector((state) => state.post);

  const { mutate: mutateComment } = useMutation(getAllComment, {
    onSuccess: (data) => {
      dispatch(getCommentSuccess(data));
    },
  });
  const { mutate: mutateUser } = useMutation(getUsers, {
    onSuccess: (data) => {
      dispatch(getUsersSuccess(data));
    },
  });
  const { mutate: mutatePost } = useMutation(getPosts, {
    onSuccess: (data) => {
      dispatch(getAllPost(data));
    },
  });
  console.log(currentUser);
  useEffect(() => {
    if (currentUser.isAdmin) {
      mutateComment({});
      mutateUser({});
      mutatePost({});
    }
  }, [currentUser]);
  return (
    <div className="w-full">
      <div className="flex flex-wrap p-3 justify-center w-full  gap-4">
        <div className="flex h-fit flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="flex gap-2 text-sm">
              <h3 className="text-gray-500 text-md font-semibold uppercase">
                Total Users
              </h3>
              <p className="font-bold">{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className="bg-teal-500 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
        </div>
        <div className="flex h-fit flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="flex gap-2 text-sm">
              <h3 className="text-gray-500 text-md font-semibold uppercase">
                Total Comments
              </h3>
              <p className="font-bold">{totalComments}</p>
            </div>
            <HiOutlineAnnotation className="bg-blue-500 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
        </div>
        <div className="flex h-fit flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="flex gap-2 text-sm">
              <h3 className="text-gray-500 text-md font-semibold uppercase">
                Total Post
              </h3>
              <p className="font-bold">{totalPost}</p>
            </div>
            <HiOutlineDocumentText className="bg-red-500 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center">
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Users</h1>
            <Button outline gradientDuoTone={"purpleToPink"}>
              <Link to={"/dashboard?tab=users"}>See All</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>User image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
            </Table.Head>
            {users &&
              users.map((user) => (
                <Table.Body key={user._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      <img
                        src={user.avatar}
                        alt={user.username}
                        className="w-10 h-10 rounded-full"
                      />
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Posts</h1>
            <Button outline gradientDuoTone={"purpleToPink"}>
              <Link to={"/dashboard?tab=posts"}>See All</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Image</Table.HeadCell>
              <Table.HeadCell>Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
            </Table.Head>
            {posts &&
              posts.map((post) => (
                <Table.Body key={post._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-10 h-10 rounded-full"
                      />
                    </Table.Cell>
                    <Table.Cell className="w-40 line-clamp-2">
                      {post.title}
                    </Table.Cell>
                    <Table.Cell>{post.category}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
        <div className="flex flex-col md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Comments</h1>
            <Button outline gradientDuoTone={"purpleToPink"}>
              <Link to={"/dashboard?tab=comments"}>See All</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Content</Table.HeadCell>
              <Table.HeadCell>Number of likes</Table.HeadCell>
            </Table.Head>
            {comments &&
              comments.map((comment) => (
                <Table.Body key={comment._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="line-clamp-2">
                      {comment.content}
                    </Table.Cell>
                    <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
      </div>
    </div>
  );
}

export default DashBoardContro;
