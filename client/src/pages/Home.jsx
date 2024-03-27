import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import { useMutation } from "react-query";
import { getPosts } from "../api/post.api";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost, getPostSuccess } from "../redux/postSlice/postSlice";
import PostCard from "../components/PostCard";
function Home() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);

  const { mutate, isLoading } = useMutation(getPosts, {
    onSuccess: (data) => {
      dispatch(getAllPost(data));
    },
  });
  useEffect(() => {
    mutate({});
  }, []);
  return (
    <Layout>
      <div>
        <div className="flex flex-col gap-6 lg:p-28 p-3 max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold lg:text-6xl">Welcome to my blog</h1>
          <p className="text-gray-800 text-xs sm:text-sm">
            Here you'll find a variety of artircles and tutorials on topics such
            as web development, software enineering, and programming languages
          </p>
          <Link
            to={"/search"}
            className="text-xs sm:text-sm text-blue-500 hover:underline font-bold"
          >
            View all post
          </Link>
        </div>
        <div className="mx-3 bg-amber-100 dark:bg-slate-700 ">
          <CallToAction />
        </div>
        <div className="p-3 flex flex-col gap-8 py-7">
          {posts && posts.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-center">
                Recent Posts
              </h2>
              <div className="flex gap-4 justify-center flex-wrap">
                {posts.map((post, index) => (
                  <PostCard key={index} post={post} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Home;
