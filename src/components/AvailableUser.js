import React from "react";
import Shimmer from "./Shimmer";

const AvailableUser = ({ userList, onlineUsers, onUserClick }) => {
  return (
    <div className="overflow-hidden h-full"> 
      <div className="overflow-y-auto flex flex-col  h-full">
        <div className="flex-grow w-full ">
          {userList.length > 0 ? (
            userList.map((user) => (
              <div key={user?.uid}>
              <div
                className="flex  w-full p-4 border border-gray-200 rounded-lg  hover:bg-slate-600 cursor-pointer"
                key={user?.uid}
                onClick={() => onUserClick(user)}
              >
                <div>
                <img
                  className="h-16 w-16 object-cover rounded-full" 
                  src={user.photoURL}
                  alt="user-icon"
                />
                </div>
                <div className="ml-10"> 
                <h1 className="text-md font-medium text-white mt-2">{user.displayName}</h1>
                <p className="text-sm text-gray-500">
                  {onlineUsers.has(user.uid) ? (
                    <span className="text-green-500">Online</span>
                  ) : (
                    <span className="text-red-500">Offline</span>
                  )}
                </p>
                </div>
              </div>
              </div>
            ))
          ) : (
            Array.from({ length: 10 }).map((_, index) => <Shimmer key={index} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default AvailableUser;
