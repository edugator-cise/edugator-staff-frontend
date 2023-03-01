import React, { useState } from "react";
import "allotment/dist/style.css";
import { useRouter } from "next/router";
import SideNavigation from "./SideNav/SideNavigation";
import ContentSidebar from "./ContentSidebar/ContentSidebar";
import { ArrowRightIcon } from "@radix-ui/react-icons";

const PlaygroundLayout = ({ children }: { children: React.ReactNode }) => {
  const [isHidden, setIsHidden] = useState(false);
  const [contentType, setContentType] = useState<"problem" | "lesson" | "">(
    "problem"
  );

  const router = useRouter();
  const locationState = router.asPath;

  return (
    <div className="h-screen flex overflow-hidden bg-stone-100">
      {/* <VerticalNavigation light={true} codingPage={true} /> */}
      <SideNavigation />
      <div className="w-px h-full bg-slate-700"></div>
      <div className="w-full h-full flex flex-col">
        {/* <TopicSidebar isHidden={isHidden} setIsHidden={setIsHidden} /> */}
        <div className="flex w-full h-full">
          <ContentSidebar />
          <div className="w-px h-full bg-slate-700"></div>
          <div className="relative w-full h-full">
            {children}
            <NextOverlay />
          </div>
        </div>
      </div>
    </div>
  );
};

const NextOverlay = () => {
  return (
    <div className="font-dm space-x-4 cursor-pointer max-w-[30rem] absolute flex items-center justify-between rounded-md opacity-50 transition hover:opacity-100 bg-white shadow-lg shadow-black/5 border bottom-4 right-4 z-50 px-4 whitespace-nowrap">
      <div className="flex flex-col py-3 text-slate-900">
        <h1 className="font-bold">Up Next:</h1>
        <p className="text-sm">Introduction to C++</p>
      </div>
      <div className=" flex items-end h-10">
        <ArrowRightIcon className="h-4 w-4 stroke-blue-500 text-blue-500 stroke-[0.5px]" />
      </div>
    </div>
  );
};

export default PlaygroundLayout;
