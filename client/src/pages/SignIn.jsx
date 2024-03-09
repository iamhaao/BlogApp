import React from "react";
import Layout from "../Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { Button, Label, Spinner, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { signin } from "../api/auth";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import Toast from "../shared/Toast";
import { signInSuccess } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, mutate } = useMutation(signin, {
    onSuccess: (data) => {
      dispatch(signInSuccess(data));
      Toast({ message: "Welcome to Iamhaao Blog", type: "SUCCESS" });
      navigate("/");
    },
    onError: (error) => {
      Toast({ message: error.message, type: "ERROR" });
    },
  });
  const handSubmit = (data) => {
    mutate(data);
  };

  return (
    <Layout>
      <div className=" mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 py-5 px-20 justify-center gap-5  md:items-center">
          {/*left */}
          <div>
            <Link to="/" className="text-4xl font-bold dark:text-white">
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Iamhaao
              </span>
              Blog
            </Link>
            <p className="text-sm mt-5">
              This is demo project. You can signup with email and pasword or
              with Google
            </p>
          </div>
          {/*Righ */}
          <div className="px-20">
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(handSubmit)}
            >
              <div>
                <Label value="Your Email" />
                <TextInput
                  type="text"
                  placeholder="name@email.com"
                  id="email"
                  {...register("email", {
                    required: "Firstname is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <span className="text-red-500 font-normal mx-1">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div>
                <Label value="Your Password" />
                <TextInput
                  type="password"
                  placeholder="********"
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be more than 6 characters",
                    },
                  })}
                />
                {errors.password && (
                  <span className="text-red-500 font-normal mx-1">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <Button
                gradientDuoTone="purpleToPink"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
              <OAuth />
            </form>
            <div className="flex gap-1 text-sm mt-5">
              <span>Don't have an account?</span>
              <Link to="/sign-up" className="text-blue-500">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SignIn;
