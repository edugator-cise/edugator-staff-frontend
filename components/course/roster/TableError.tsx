import React from "react";

const TableError = () => {
  return (
    <div className="w-full h-24 rounded-md bg-red-100/50 border border-red-200 flex items-center justify-center">
      <div className="text-red-800 font-dm text-sm">
        An error occurred while loading the table.
      </div>
    </div>
  );
};

export default TableError;
