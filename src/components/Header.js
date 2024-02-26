import React from "react";
import { HEADER_IMG } from "../constants";
const Header = () => {
  return (
    <div  className="w-screen bg-gradient-to-b from-black">
      <div className="p-2 mx-2 w-20 h-20 flex">
        <img src={HEADER_IMG} alt="header-logo" />
        <span className="text-white p-2 m-2 text-3xl">InstaChat</span>
      </div>
      <div>
        
      </div>
    </div>
  );
};

export default Header;
