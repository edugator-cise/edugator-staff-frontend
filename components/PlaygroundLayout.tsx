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
    <div className="h-screen flex flex-col overflow-hidden bg-stone-100">
      {/* <VerticalNavigation light={true} codingPage={true} /> */}
      <div className="w-full h-16 bg-zinc-800"></div>
      <div className="w-full h-full flex">
        {/* <TopicSidebar isHidden={isHidden} setIsHidden={setIsHidden} /> */}
        <SideNavigation />

        <Sidenav isHidden={isHidden} />
        {children}
      </div>
    </div>
  );
};

export default PlaygroundLayout;
