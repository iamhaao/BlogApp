import { Button, TextInput } from "flowbite-react";
import React from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
function DashProfile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  return (
    <div className="mx-auto max-w-lg p-3 w-full">
      <h1 className="my-7 text-center font-semibold">Profile</h1>
      <form className="flex w-full justify-center flex-col gap-4">
        <div className=" cursor-pointer mx-auto">
          <img
            src={"/images/userDefault.png"}
            alt={currentUser.username}
            className="rounded-full w-32 h-32  border-4 border-[lightgray] object-contain object-center "
          />
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
      <div className="text-red-500 flex justify-between mt-5">
        <span>Delete Account</span>
        <span>Sign Out</span>
      </div>
    </div>
  );
}

export default DashProfile;
