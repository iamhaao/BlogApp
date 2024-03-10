import { Button, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
function DashProfile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageProcess, setImageProcess] = useState(null);
  const [imageError, setImageError] = useState(null);
  const filePickerRef = useRef();

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(e.target.files[0]);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  const uploadImage = async () => {
    setImageError(null);
    const storage = getStorage(app);
    const filename = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageProcess(progress.toFixed(0));
      },
      (error) => {
        setImageProcess(null);
        setImageError("Cloud not upload image (File must be less than 25mb)");
        setImageFileUrl(null);
        setImageFile(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImageFileUrl(downloadUrl);
          setImageProcess(null);
        });
      }
    );
  };
  return (
    <div className="mx-auto max-w-lg p-3 w-full">
      <h1 className="my-7 text-center font-semibold">Profile</h1>
      <form className="flex w-full justify-center flex-col gap-4">
        <input
          ref={filePickerRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          hidden
        />
        <div className="relative cursor-pointer mx-auto">
          {imageProcess && (
            <CircularProgressbar
              value={imageProcess || 0}
              text={`${imageProcess}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rbg(62,152,199,${imageProcess / 100})`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.avatar}
            alt={currentUser.username}
            className=" rounded-full w-32 h-32 border-4 border-[lightgray] object-center object-cover "
            onClick={() => filePickerRef.current.click()}
          />
          {imageError && (
            <span className="text-red-500 font-normal mx-1">{imageError}</span>
          )}
        </div>
        <div>
          <TextInput
            type="text"
            placeholder="name@email.com"
            id="username"
            {...register("username", {
              required: "username is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            })}
            defaultValue={currentUser.username}
          />
          {errors.username && (
            <span className="text-red-500 font-normal mx-1">
              {errors.username.message}
            </span>
          )}
        </div>
        <div>
          <TextInput
            type="text"
            id="email"
            {...register("email", {
              required: "Firstname is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            })}
            defaultValue={currentUser.email}
          />
          {errors.email && (
            <span className="text-red-500 font-normal mx-1">
              {errors.email.message}
            </span>
          )}
        </div>
        <div>
          <TextInput type="text" placeholder="***********" id="password" />
          {errors.password && (
            <span className="text-red-500 font-normal mx-1">
              {errors.password.message}
            </span>
          )}
        </div>
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between my-5">
        <span>Delete Account</span>
        <span>Sign Out</span>
      </div>
    </div>
  );
}

export default DashProfile;
