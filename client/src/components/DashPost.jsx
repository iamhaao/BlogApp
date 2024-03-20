import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getByUserPosts } from "../api/post.api";
import Toast from "../shared/Toast";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
function DashPost() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getByUserPosts(currentUser._id);
        setUserPosts(data.posts);
      } catch (error) {
        console.log(error);
        Toast({ message: error.message, type: "ERROR" });
      }
    };
    if (currentUser.isAdmin) {
      fetchData();
    }
  }, [currentUser._id]);
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
                    <span className="font-medium hover:underline cursor-pointer text-red-500">
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/update-post/${post.slug}`}>
                      <span className="font-medium hover:underline cursor-pointer text-blue-500">
                        Edit
                      </span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </>
      ) : (
        <p>Not Post Yet</p>
      )}
    </div>
  );
}

export default DashPost;
