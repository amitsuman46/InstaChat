import React, { useEffect } from "react";
import { HEADER_IMG } from "../constants";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Header = () => {

  const dispatch = useDispatch();
  const  navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/home");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    //unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex w-screen bg-gradient-to-b from-black">
      <div className="p-2 mx-2 w-20 h-20 flex">
        <img src={HEADER_IMG} alt="header-logo" />
        <span className="text-white p-2 m-2 text-3xl">InstaChat</span>
      </div>
      <div className="flex-grow" /> {/* This creates a flexible space to push the user display name to the right */}
      <div className="p-2 mx-2 text-white">
        {user && 
          <div className="p-2 m-2 flex justify-between text-base ">
            <h2 className="text-purple-600 text-xl font-bold">{user?.displayName}</h2>
            <button onClick={handleSignOut} className="font-bold text-red-700 hover:text-white">
            (Sign Out)
          </button>
          </div>
        }
      </div>
    </div>
  );
};

export default Header;
