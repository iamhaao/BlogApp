import React from "react";
import Layout from "../Layout/Layout";
import CallToAction from "../components/CallToAction";
function Project() {
  return (
    <Layout>
      <div className="max-w-2xl min-h-screen mx-auto flex flex-col gap-6 justify-center items-center">
        <h1 className="text-3xl font-semibold">Projects</h1>
        <p className="text-md text-gray-500">
          BlogApp is a comprehensive web application designed to empower users
          to create, share, and explore a wide array of blog posts. With a
          user-friendly interface and robust features, BlogApp facilitates
          seamless interaction and collaboration within its blogging community.
          Users can register accounts, create personalized profiles, and publish
          their own blog posts on topics ranging from technology and lifestyle
          to travel and entertainment
        </p>
        <CallToAction />
      </div>
    </Layout>
  );
}

export default Project;
