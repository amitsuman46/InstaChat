import React, { useState } from "react";
import Header from "./Header";
import { BACKGROUND_IMG } from "../constants";
import useValidateForm from "../hooks/useValidateForm";
import { auth, database } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { ref, set } from "firebase/database";

const Login = () => {
  const [signIn, setSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const {
    name,
    email,
    password,
    nameError,
    emailError,
    passwordError,
    validateForm,
    clearErrors,
  } = useValidateForm(signIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        if (signIn) {
          await signInWithEmailAndPassword(
            auth,
            email.current.value,
            password.current.value
          );
          console.log("User signed in successfully");
          navigate("/home");
        } else {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email.current.value,
            password.current.value
          );
          const user = await userCredential.user;
          await updateProfile(user, { displayName: name.current.value });
          const { uid, email: userEmail, displayName } = auth.currentUser;
          console.log(displayName);
          dispatch(
            addUser({
              uid: uid,
              email: userEmail,
              displayName: displayName,
            })
          );
          // Push UUID to Firebase Realtime Database

          const userRef = await ref(database, "users/" + uid); // Replace with your identifier
          await set(userRef, {
            displayName: displayName,
            email: userEmail,
          })
            .then(() => {
              console.log("User data sent successfully!");
            })
            .catch((error) => {
              console.error("Error writing data:", error);
            });

          console.log("User signed up successfully");
          navigate("/home");
        }
        
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "-" + errorMessage);
        console.error("Authentication failed:", error.message);
      }
    } else {
      console.log("Form validation failed");
    }
  };

  const handleSignUp = () => {
    setSignIn(!signIn);
    setErrorMessage("");
    clearErrors();
  };

  return (
    <div className="absolute inset-0">
      <div className="w-full h-full">
        <img
          src={BACKGROUND_IMG}
          alt="background-img"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col items-center  absolute top-0 left-0 w-full">
        <Header />
        <div>
          <div className="bg-black w-[400px] h-[490px] my-11 bg-opacity-80  rounded-lg">
            <h1 className="text-2xl text-white p-5 m-5">
              {signIn ? "Log In" : "Sign Up"}
            </h1>
            <form className="flex flex-col" onSubmit={handleSubmit}>
              {!signIn && (
                <input
                  className="bg-slate-500 p-3 ml-12 mr-12 mb-6 rounded-lg text-white"
                  ref={name}
                  type="text"
                  placeholder="Name"
                />
              )}
              {nameError && (
                <p className="text-red-500 ml-12 -mt-6 mb-2">{nameError}</p>
              )}

              <input
                className="bg-slate-500 p-3 ml-12 mr-12 mb-6 rounded-lg text-white"
                ref={email}
                type="email"
                placeholder="Email Address"
              />
              {emailError && (
                <p className="text-red-500 ml-12 -mt-6 mb-2">{emailError}</p>
              )}

              <input
                className="bg-slate-500 p-3 ml-12 mr-12 mb-6  rounded-lg text-white"
                ref={password}
                type="password"
                placeholder="Password"
              />
              {passwordError && (
                <p className="text-red-500 ml-12 -mt-6 mb-2">{passwordError}</p>
              )}

              <button className="bg-purple-500 p-3 ml-12 mr-12 mb-6  rounded-lg text-white hover:bg-purple-300 hover:text-black">
                {signIn ? "Log In" : "Sign Up"}
              </button>
            </form>
            <p className="text-red-500 font-bold text-[14px] m-2 ">
              {errorMessage}
            </p>
            <span
              className="m-9 text-white hover:text-red-700 cursor-pointer"
              onClick={handleSignUp}
            >
              {signIn
                ? " New to InstaChat? Click here to Sign-up"
                : "Already Registered? Login"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
