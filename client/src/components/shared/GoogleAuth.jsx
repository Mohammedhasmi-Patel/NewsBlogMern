import React from "react";
import { Button } from "../ui/button";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "@/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInSuccess } from "@/redux/user/userSlice";
import axios from "@/utils/axios";

const GoogleAuth = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });

    try {
      const firebaseResponse = await signInWithPopup(auth, provider);

      const res = await axios.post("/auth/google-auth", {
        email: firebaseResponse.user.email,
        name: firebaseResponse.user.displayName,
        profilePhotoUrl: firebaseResponse.user.photoURL,
      });

      const data = await res.data;

      if (data.success == true) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

  return (
    <div>
      <Button
        type="button"
        className="bg-green-500 w-full"
        onClick={handleClick}
      >
        Sign in with Google
      </Button>
    </div>
  );
};

export default GoogleAuth;
