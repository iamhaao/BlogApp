import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { getPosts } from "../api/post.api";
import { useDispatch, useSelector } from "react-redux";
import {
  getPostSuccess,
  getRecentsPostSuccess,
} from "../redux/postSlice/postSlice";
import { Button, Spinner } from "flowbite-react";
import Layout from "../Layout/Layout";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";

function PostPage() {
  const { postSlug } = useParams();
  const dispatch = useDispatch();
  const { post, recentPosts } = useSelector((state) => state.post);
  const { mutate, isLoading } = useMutation(getPosts, {
    onSuccess: (data) => {
      dispatch(getPostSuccess(data.posts[0]));
    },
  });
  const { mutate: mutateRecentPost } = useMutation(getPosts, {
    onSuccess: (data) => {
      dispatch(getRecentsPostSuccess(data.posts));
    },
  });
  useEffect(() => {
    mutate({ postSlug });
    mutateRecentPost({ limit: 3 });
  }, [postSlug, mutate]);
  return (
    post && (
      <Layout>
        <div>
          {isLoading ? (
            <div className="flex justify-center items-center min-h-screen">
              <Spinner size={"xl"} />
            </div>
          ) : (
            <div className="p-3 flex flex-col max-w-3xl mx-auto">
              <h1 className="text-3xl mt-10 p-3 text-center font-medium font-serif mx-auto lg:text-4xl">
                {post.title}
              </h1>
              <Link
                className="self-center"
                to={`/search?category=${post.category}`}
              >
                <Button className="gray" pill size={"xs"}>
                  {post.category}
                </Button>
              </Link>
              <img
                className="mt-10 p-3 max-h-[600px] w-full object-cover"
                src={post.image}
                alt={post.title}
              />
              <div className=" flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                <span className="italic">
                  {(post.content.length / 1000).toFixed(0)} mins read
                </span>
              </div>
              <div
                className="p-3 max-w-2xl mx-auto w-full post-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              ></div>
              <div className="max-w-4xl mx-auto w-full">
                <CallToAction />
              </div>
              <CommentSection postId={post._id} />
              <div className="flex flex-col justify-center items-center mb-5">
                <h1 className="text-xl mt-5">Recent articles</h1>
                <div className="flex gap-2">
                  {recentPosts &&
                    recentPosts.map((post) => (
                      <PostCard key={post._id} post={post} />
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </Layout>
    )
  );
}

export default PostPage;
