import React, { useState } from "react";
import { Sidenav } from "components/CodeEditor/SideNav";
import VerticalNavigation from "components/shared/VerticalNavigation";
import { Box } from "@mui/material";
import { colors } from "constants/config";
import "allotment/dist/style.css";
import TopicSidebar from "components/shared/TopicSidebar";
import { useRouter } from "next/router";
import SideNavigation from "./SideNav/SideNavigation";
import ContentSidebar from "./ContentSidebar/ContentSidebar";

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
      <div className="w-px h-full bg-slate-700"></div>
      <div className="w-full h-full flex flex-col">
        {/* <TopicSidebar isHidden={isHidden} setIsHidden={setIsHidden} /> */}
        <div className="flex w-full h-full">
          <ContentSidebar />
          <div className="w-px h-full bg-slate-700"></div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default PlaygroundLayout;
