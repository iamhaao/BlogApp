import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Toast from "../shared/Toast";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { createPost, getPosts, updatePost } from "../api/post.api";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function UpdatePost() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [file, setFile] = useState(null);
  const [imageUploadProcess, setImageUploadProcess] = useState(null);
  const [imageUploaderError, setImageUploaderError] = useState(null);
  const [image, setImage] = useState(null);
  const [content, setContent] = useState(null);
  const { postId } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const navigte = useNavigate();
  const { mutate, isLoading } = useMutation(updatePost, {
    onSuccess: () => {
      Toast({ message: "Updated success!!", type: "SUCCESS" });
    },
    onError: (error) => {
      Toast({ message: error.message, type: "ERROR" });
    },
  });
  useEffect(() => {
    const fetchPostId = async () => {
      try {
        const data = await getPosts("", "", postId);
        setValue("title", data.posts[0].title);
        setValue("category", data.posts[0].category);
        setImage(data.posts[0].image);
        setContent(data.posts[0].content);
      } catch (error) {
        Toast({ message: error.message, type: "ERROR" });
      }
    };
    fetchPostId();
  }, [postId, isLoading]);

  const handleUploadImage = async () => {
    try {
      if (!file) {
        return;
      }
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progess =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProcess(progess.toFixed(0));
        },
        (error) => {
          setImageUploaderError("Upload failed");
          setImageUploadProcess(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setImageUploadProcess(null);
            setImageUploaderError(null);
            setImage(downloadUrl);
          });
        }
      );
    } catch (error) {
      setImageUploaderError("Upload image Failed");
      setImageUploadProcess(null);
    }
  };

  const handleupdatePost = (data) => {
    mutate({
      ...data,
      image,
      content,
      userId: currentUser._id,
      postId: postId,
    });
  };
  useEffect(() => {
    if (imageUploaderError) {
      Toast({ message: imageUploaderError, type: "ERROR" });
    }
  }, [imageUploaderError]);
  return (
    <Layout>
      <div className="p-3 max-w-3xl mx-auto min-h-[85vh]">
        <h1 className="text-center text-3xl my-7 font-semibold">Update post</h1>
        <form
          className="flex flex-col gap-3"
          onSubmit={handleSubmit(handleupdatePost)}
        >
          <div className="flex flex-col sm:flex-row justify-between gap-4 ">
            <div className="flex-1">
              <TextInput
                type="text"
                placeholder="Title"
                {...register("title", {
                  required: "Title is required",
                })}
              />
              {errors.title && (
                <span className="text-red-500 font-normal mx-1">
                  {errors.title.message}
                </span>
              )}
            </div>
            <div>
              <Select {...register("category")}>
                <option value="">Select Category</option>
                <option value="javascrip">Javascrip</option>
                <option value="reactjs">React.js</option>
                <option value="nodejs">Node.js</option>
              </Select>
            </div>
          </div>
          <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
            <FileInput
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <Button
              type="button"
              gradientDuoTone={"purpleToBlue"}
              size={"sm"}
              outline
              onClick={handleUploadImage}
              disabled={imageUploadProcess}
            >
              {imageUploadProcess ? (
                <div className="w-16 h-16">
                  <CircularProgressbar
                    value={imageUploadProcess}
                    text={`${imageUploadProcess || 0} %`}
                  />
                </div>
              ) : (
                "Upload Image"
              )}
            </Button>
          </div>
          {image && (
            <img
              src={image}
              alt="upload"
              className="w-full h-72 object-contain object-center"
            />
          )}
          <div>
            <ReactQuill
              placeholder="write something"
              theme="snow"
              className="h-72 mb-12"
              required
              onChange={(value) => setContent(value)}
              value={content}
            />
          </div>

          <Button
            type="submit"
            gradientDuoTone={"purpleToPink"}
            disabled={isLoading}
          >
            {isLoading ? "Loading " : "Update Post"}
          </Button>
        </form>
      </div>
    </Layout>
  );
}

export default UpdatePost;
