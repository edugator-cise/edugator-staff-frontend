import React from "react";

const ErrorState = () => {
  return (
    <div className="flex flex-col items-center justify-start h-full p-3 space-y-4">
      <div className="w-full rounded-md bg-red-500/20 flex items-center p-4 justify-center">
        <p className="text-red-100 font-dm text-sm text-center">
          There was an error loading course content. Please try again later.
        </p>
      </div>
    </div>
  );
};

export default ErrorState;
