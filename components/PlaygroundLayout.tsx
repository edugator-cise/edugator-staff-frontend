import React, { useState } from "react";
import { Sidenav } from "components/CodeEditor/SideNav";
import VerticalNavigation from "components/shared/VerticalNavigation";
import { Box } from "@mui/material";
import { colors } from "constants/config";
import "allotment/dist/style.css";
import TopicSidebar from "components/shared/TopicSidebar";
import { useRouter } from "next/router";
import SideNavigation from "./SideNav/SideNavigation";

interface ProblemEditorURL {
  problemId?: string;
  lessonId?: string;
}

interface ProblemLocationState {
  moduleName?: string;
}

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
      <div className="w-px h-full bg-slate-800"></div>
      <div className="w-full h-full flex flex-col">
        {/* <TopicSidebar isHidden={isHidden} setIsHidden={setIsHidden} /> */}
        <div className="flex w-full h-full">
          <div className="w-64 min-w-[16rem] h-full bg-[#192231] flex flex-col">
            {/* Header */}
            <div className="w-full h-20 flex items-center px-6">
              <h1 className="text-white font-dm font-medium text-lg">
                Exercises
              </h1>
            </div>
          </div>
          <Sidenav isHidden={isHidden} />
          {children}
        </div>
      </div>
    </div>
  );
};

export default PlaygroundLayout;
