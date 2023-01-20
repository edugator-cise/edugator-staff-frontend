import PlaygroundLayout from "components/PlaygroundLayout";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container, Typography, Grow } from "@mui/material";
import Lottie from "lottie-react";
import CrocodileOnAScooter from "src/assets/crocodileonascooter.json";

import {
  requestLesson,
  requestProblem,
} from "components/CodeEditor/CodeEditorSlice";
import { adminPathRegex } from "src/shared/constants";

export default function CodePage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = router.query;
  const locationState = router.asPath;

  useEffect(() => {
    if (params && params.problemId) {
      // setContentType("problem");
      dispatch(
        requestProblem({
          problemId: params.problemId as string,
          isAdmin: adminPathRegex.test(locationState),
        })
      );
    }
    //disable exhaustive dependencies
    //eslint-disable-next-line
  }, [params]);

  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grow in appear timeout={500}>
        <div
          style={{
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div style={{ width: 450, marginTop: -250 }}>
            <Lottie animationData={CrocodileOnAScooter} />
          </div>
          <div>
            <Typography variant="h4">Get Started</Typography>
          </div>
          <Typography variant="body1">
            Choose a problem on the navigation bar to start!
          </Typography>
        </div>
      </Grow>
    </Container>
  );
}

CodePage.getLayout = function getLayout(page: ReactNode) {
  return <PlaygroundLayout>{page}</PlaygroundLayout>;
};
