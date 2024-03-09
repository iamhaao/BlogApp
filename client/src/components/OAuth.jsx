import React from "react";
import { Button } from "flowbite-react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useMutation } from "react-query";
import { authGoogle } from "../api/auth";
import Toast from "../shared/Toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";

function OAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutate } = useMutation(authGoogle, {
    onSuccess: (data) => {
      Toast({ message: "Welcome to Iamhaao Blog", type: "SUCCESS" });
      dispatch(signInSuccess(data));
      navigate("/");
    },
    onError: (error) => {
      Toast({ message: error.message, type: "ERROR" });
    },
  });
  const handleGoogleClick = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const resultFormGoogle = await signInWithPopup(auth, provider);
      const data = {
        name: resultFormGoogle.user.displayName,
        email: resultFormGoogle.user.email,
        googlePhoto: resultFormGoogle.user.photoURL,
      };
      mutate(data);
    } catch (error) {
      console.error("Google authentication error:", error);
    }
  };

  return (
    <Button
      type="button"
      gradientDuoTone="pinkToOrange"
      outline
      onClick={handleGoogleClick}
    >
      <img
        src="./images/google.png"
        className="w-6 h-6 mr-2"
        alt="google login"
      />{" "}
      Continue with Google
    </Button>
  );
}

export default OAuth;
