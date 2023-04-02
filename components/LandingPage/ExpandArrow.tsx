import { ChevronRight } from "@mui/icons-material";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import React from "react";

const ExpandArrow = () => {
  return (
    <div className="relative w-5 h-5 flex items-center justify-center">
      <div className="h-[2px] w-3 bg-nav-darkest transition ease-in-out scale-x-0 group-hover:scale-x-100 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"></div>
      <ChevronRight className="w-5 h-5  text-nav-darkest transition group-hover:translate-x-[3px] " />
    </div>
  );
};

export default ExpandArrow;
