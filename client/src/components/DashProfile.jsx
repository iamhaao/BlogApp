import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
} from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useMutation } from "react-query";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { deleteUser, updateUser } from "../api/user.api";
import Toast from "../shared/Toast";
import {
  deleteUserSuccess,
  signOutSuccess,
  updateUserSuccess,
} from "../redux/user/userSlice";
import { signOut } from "../api/auth";
function DashProfile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageProcess, setImageProcess] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const filePickerRef = useRef();
  const { mutate, isLoading } = useMutation(updateUser, {
    onSuccess: (data) => {
      dispatch(updateUserSuccess(data));
      Toast({ message: "Updated Success!!!", type: "SUCCESS" });
    },
    onError: (error) => {
      Toast({ message: error.message, type: "ERROR" });
    },
  });
  const { mutate: muateDeleteUser, isLoading: deleteLoading } = useMutation(
    deleteUser,
    {
      onSuccess: () => {
        dispatch(deleteUserSuccess());
        setShowModal(false);
        Toast({ message: "Delete User Success", type: "SUCCESS" });
      },
      onError: (error) => {
        Toast({ message: error.message, type: "ERROR" });
      },
    }
  );
  const { mutate: mutateSignout, isLoading: signoutLoading } = useMutation(
    signOut,
    {
      onSuccess: () => {
        dispatch(signOutSuccess());
        Toast({ message: "Signed out!!!", type: "SUCCESS" });
      },
      onError: (error) => {
        Toast({ message: error.message, type: "ERROR" });
      },
    }
  );
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

  const handleUpdate = (data) => {
    mutate({ ...data, avatar: imageFileUrl, userId: currentUser._id });
  };
  const hanldeDelete = () => {
    muateDeleteUser(currentUser._id);
  };
  const hanldeSignout = () => {
    mutateSignout(currentUser._id);
  };
  return (
    <div className="mx-auto max-w-lg p-3 w-full">
      <h1 className="my-7 text-center font-semibold">Profile</h1>
      <form
        className="flex w-full justify-center flex-col gap-4"
        onSubmit={handleSubmit(handleUpdate)}
      >
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
            id="email"
            {...register("email", {
              required: "Firstname is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            })}
            defaultValue={currentUser.email}
            readOnly={true}
          />
          {errors.email && (
            <span className="text-red-500 font-normal mx-1">
              {errors.email.message}
            </span>
          )}
        </div>
        <div>
          <TextInput
            type="text"
            placeholder="name@email.com"
            id="username"
            {...register("username", {
              required: "username is required",
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
          <TextInput type="text" placeholder="***********" id="password" />
          {errors.password && (
            <span className="text-red-500 font-normal mx-1">
              {errors.password.message}
            </span>
          )}
        </div>
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          {isLoading ? "Loading..." : "Update"}
        </Button>
        {currentUser.isAdmin && (
          <Link to={"/create-post"}>
            <Button
              className="w-full"
              type="button"
              gradientDuoTone="purpleToPink"
            >
              Create A post
            </Button>
          </Link>
        )}
      </form>
      <div className="text-red-500 flex justify-between my-5">
        <span
          className="hover:cursor-pointer hover:bg-red-500 p-2 rounded-lg hover:text-white font-medium"
          onClick={() => setShowModal(true)}
        >
          Delete Account
        </span>
        <span
          className="hover:cursor-pointer hover:bg-red-500 p-2 rounded-lg hover:text-white font-medium"
          onClick={hanldeSignout}
        >
          Sign Out
        </span>
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        size={"sm"}
        popup
      >
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="w-14 h-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className=" mb-5 text-lg text-gray-500 dark:text-gray-200">
              Are you sure you want to delete your account ?
            </h3>
            <div className="flex justify-between">
              <Button color="failure" onClick={hanldeDelete}>
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

export default DashProfile;
