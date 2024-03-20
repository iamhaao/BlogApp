import React from "react";
import Layout from "../Layout/Layout";
import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
function CreatePost() {
  return (
    <Layout>
      <div className="p-3 max-w-3xl mx-auto min-h-[85vh]">
        <h1 className="text-center text-3xl my-7 font-semibold">
          Create a post
        </h1>
        <form className="flex flex-col gap-3">
          <div className="flex flex-col gap-4 ">
            <TextInput type="text" placeholder="Title" required />
            <Select>
              <option value="">Select Category</option>
              <option value="javascrip">Javascrip</option>
              <option value="reactjs">React.js</option>
              <option value="nodejs">Node.js</option>
            </Select>
          </div>
          <div className="flex gap-4 items-center justify-center border-4 border-teal-500 border-dotted p-3">
            <FileInput type="file" accept="image/*" />
            <Button
              type="button"
              gradientDuoTone={"purpleToBlue"}
              size={"sm"}
              outline
            >
              Upload image
            </Button>
          </div>
          <ReactQuill
            placeholder="write something"
            theme="snow"
            className="h-72 mb-12"
            required
          />
          <Button type="submit" gradientDuoTone={"purpleToPink"}>
            {" "}
            Publish
          </Button>
        </form>
      </div>
    </Layout>
  );
}

export default CreatePost;
