import React, { useState } from "react";
import { Sidenav } from "components/CodeEditor/SideNav";
import VerticalNavigation from "components/shared/VerticalNavigation";
import { Box } from "@mui/material";
import { colors } from "constants/config";
import "allotment/dist/style.css";
import TopicSidebar from "src/shared/TopicSidebar";
import { useRouter } from "next/router";

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
    <Box
      height="100vh"
      display="flex"
      flexDirection="row"
      sx={{ bgcolor: colors.lightGray, overflow: "hidden" }}
    >
      <TopicSidebar isHidden={isHidden} setIsHidden={setIsHidden} />

      <Box sx={{ height: "100%", width: "100%" }}>
        <VerticalNavigation light={true} codingPage={true} />
        <Box
          sx={{
            height: "100%",
            width: "100%",
            m: 0,
            display: "flex",
          }}
        >
          <Sidenav isHidden={isHidden} />
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default PlaygroundLayout;
