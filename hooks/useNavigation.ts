import {
  IModuleWithProblemsAndLessons,
  INavigationItem,
} from "components/CodeEditor/types";
import { useEffect, useState } from "react";
import apiClient from "src/app/common/apiClient";
import { createNavStructure } from "utils/CodeEditorUtils";
import { FetchStatus } from "./types";
import { useDispatch } from "react-redux";
import {
  setRunCodeError,
  setRunningSubmission,
} from "components/CodeEditor/CodeEditorSlice";

const useNavigation = (isAdmin: boolean) => {
  const dispatch = useDispatch();

  const [status, setStatus] = useState<FetchStatus>(FetchStatus.loading);
  const [navigation, setNavigation] = useState<IModuleWithProblemsAndLessons[]>(
    []
  );
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const { data }: { data: IModuleWithProblemsAndLessons[] } =
        await apiClient.get(
          isAdmin ? "v1/module/WithProblems" : "v1/module/WithNonHiddenProblems"
        );
      return data;
    };
    fetchData()
      .then((values) => {
        setNavigation(values);
        setStatus(FetchStatus.succeed);
      })
      .catch((e) => {
        dispatch(setRunCodeError({ hasError: true, errorMessage: e.message }));
        dispatch(setRunningSubmission(false));
        setStatus(FetchStatus.failed);
        setError(e);
      });
  }, []);

  return { status, navigation: createNavStructure(navigation), error };
};

export default useNavigation;
