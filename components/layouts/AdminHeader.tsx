import { UserButton } from "@clerk/clerk-react";
import { EdugatorLogo } from "components/navigation/navIcons";
import { useRouter } from "next/router";
import React from "react";
const AdminHeader = () => {
  const router = useRouter();

  return (
    <header
      className={`flex justify-center bg-nav-darkest w-full items-center`}
    >
      <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 grid items-center h-16 grid-cols-6 space-x-3 lg:h-16 lg:justify-center">
        <div className="cursor-pointer flex col-span-3 justify-start items-center space-x-2">
          <div className="w-12 h-12 min-w-[3rem] p-1 flex items-center">
            <EdugatorLogo />
          </div>
          <h1
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0.3) 100%)",
            }}
            className={`text-xl font-semibold transition font-ambit text-slate-50`}
          >
            Edugator
          </h1>
        </div>
        <div className="flex justify-end col-span-3">
          <UserButton/>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
