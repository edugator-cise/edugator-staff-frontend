import React from "react";

const LoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-start h-full p-3 space-y-4">
      <div className="w-full h-12 rounded-md bg-slate-700 animate-pulse"></div>
      <div className="w-full h-12 rounded-md bg-slate-700/80 animate-pulse"></div>
      <div className="w-full h-12 rounded-md bg-slate-700/60 animate-pulse"></div>
      <div className="w-full h-12 rounded-md bg-slate-700/20 animate-pulse"></div>
      <div className="w-full h-12 rounded-md bg-slate-700/10 animate-pulse"></div>
    </div>
  );
};

export default LoadingState;
