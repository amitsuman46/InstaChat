import React, { useState } from "react";
import Header from "./Header";
import { BACKGROUND_IMG } from "../constants";
import useValidateForm from "../hooks/useValidateForm";

const Login = () => {
  const [signIn, setSignIn] = useState(true);
  const { name, email, password, nameError, emailError, passwordError, validateForm, clearErrors } = useValidateForm(signIn);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully");
    } else {
      console.log("Form validation failed");
    }
  };

  const handleSignUp = () => {
    setSignIn(!signIn);
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
            <h1 className="text-2xl text-white p-5 m-5">{signIn ? "Log In" : "Sign Up"}</h1>
            <form className="flex flex-col" onSubmit={handleSubmit}>
              {!signIn && <input className="bg-slate-500 p-3 ml-12 mr-12 mb-6 rounded-lg text-white" ref={name} type="text" placeholder="Name" />}
              {nameError && <p className="text-red-500 ml-12 -mt-6 mb-2">{nameError}</p>}

              <input className="bg-slate-500 p-3 ml-12 mr-12 mb-6 rounded-lg text-white" ref={email} type="email" placeholder="Email Address" />
              {emailError && <p className="text-red-500 ml-12 -mt-6 mb-2">{emailError}</p>}

              <input className="bg-slate-500 p-3 ml-12 mr-12 mb-6  rounded-lg text-white" ref={password} type="password" placeholder="Password" />
              {passwordError && <p className="text-red-500 ml-12 -mt-6 mb-2">{passwordError}</p>}

              <button className="bg-purple-500 p-3 ml-12 mr-12 mb-6  rounded-lg text-white">Login</button>
            </form>
            <span className="m-9 text-white hover:text-red-700 cursor-pointer" onClick={handleSignUp}>
              {signIn ? " New to InstaChat? Click here to Sign-up" : "Already Registered? Login"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
