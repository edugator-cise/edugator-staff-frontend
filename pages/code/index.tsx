import PlaygroundLayout from "components/PlaygroundLayout";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";

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

  return <div>Hello Code!</div>;
}

CodePage.getLayout = function getLayout(page: ReactNode) {
  return <PlaygroundLayout>{page}</PlaygroundLayout>;
};
