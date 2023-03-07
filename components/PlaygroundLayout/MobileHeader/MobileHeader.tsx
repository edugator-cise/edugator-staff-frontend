import { EdugatorLogo } from "components/SideNav/navIcons";
import React from "react";

const MobileHeader = () => {
  return (
    <div className="flex flex-col items-center justify-between w-full h-24 min-h-[6rem]">
      <div className="w-full h-12 min-h-[3rem] flex items-center bg-nav-darker px-4">
        <div className="w-12 h-12 min-w-[3rem] p-1 flex items-center mr-2">
          <EdugatorLogo />
        </div>
        {/* 
                <h1
                  className={`text-white font-ambit mt-1 overflow-hidden text-ellipsis transition-opacity`}
                >
                  Edugator
                </h1> */}
      </div>
      <div className="w-full h-12 min-h-[3rem] flex items-center bg-nav-dark"></div>
    </div>
  );
};

export default MobileHeader;
