import React from "react";

const Shimmer = () => (
  <div className="animate-pulse flex flex-col items-center p-4 m-4 w-[250px] h-60 border border-lime-500 rounded-lg">
    <div className="rounded-full bg-gray-300 h-16 w-16 mb-2"></div>
    <div className="bg-gray-300 h-8 w-20 mb-2"></div>
    <div className="bg-gray-300 h-4 w-24"></div>
  </div>
);

const AvailableUser = ({ userList }) => {
  return (
    <div className="overflow-x-auto flex  gap-4">
      <div className="flex w-full">
        {userList.length > 0
          ? userList.map((user) => (
              <div
                className="flex flex-col items-center p-4 m-4 w-[250px] h-60 border text-center border-lime-500 text-cyan-100 rounded-lg"
                key={user.uid}
              >
                <img
                  className="h-[82%] w-[80%] object-cover rounded-full"
                  src={user.photoURL}
                  alt="user-icon"
                />
                <h1 className="text-xl text-orange-500">{user.displayName}</h1>
                <p className="text-sm text-sm overflow-hidden whitespace-nowrap w-full">{user.email}</p>
              </div>
            ))
          : Array.from({ length: 8 }).map((_, index) => (
              <Shimmer key={index} />
            ))}
      </div>
    </div>
  );
};

export default AvailableUser;
