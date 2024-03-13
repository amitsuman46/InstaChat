import React from "react";

const Shimmer = () => (
  <div className="flex flex-col items-center w-full p-4 border border-gray-200 rounded-lg animate-pulse">
    <div className="rounded-full bg-gray-300 h-16 w-16 mb-2"></div>
    <div className="bg-gray-300 h-6 w-20 mb-2"></div>
    <div className="bg-gray-300 h-4 w-24"></div>
  </div>
);

export default Shimmer;