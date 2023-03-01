import React from "react";

const ErrorState = () => {
  return (
    <div className="flex flex-col items-center justify-start h-full p-3 space-y-4">
      <div className="w-full h-12 rounded-md bg-red-500/20 animate-pulse"></div>
      <div className="w-full h-12 rounded-md bg-red-500/20 animate-pulse"></div>
      <div className="w-full h-12 rounded-md bg-red-500/20 animate-pulse"></div>
      <div className="w-full h-12 rounded-md bg-red-500/20 animate-pulse"></div>
    </div>
  );
};

export default ErrorState;
