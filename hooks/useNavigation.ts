import { IModuleWithProblemsAndLessons } from "components/CodeEditor/types";
import { useEffect, useState } from "react";
import apiClient from "lib/api/apiClient";
import { FetchStatus } from "./types";
import { apiRoutes } from "constants/apiRoutes";
import toast from "react-hot-toast";

const useNavigation = (isAdmin: boolean) => {
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.loading);
  const [problemAndLessonSet, setProblemAndLessonSet] = useState<IModuleWithProblemsAndLessons[]>(
    []
  );
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const { data }: { data: IModuleWithProblemsAndLessons[] } =
        await apiClient.get(
          isAdmin
            ? apiRoutes.admin.getNavigation
            : apiRoutes.student.getNavigation
        );
      return data;
    };
    fetchData()
      .then((values) => {
        setProblemAndLessonSet(values);
        setStatus(FetchStatus.succeed);
      })
      .catch((e) => {
        toast.error(e.message);
        //dispatch(setRunningSubmission(false));
        setStatus(FetchStatus.failed);
        setError(e);
      });
  }, []);

  return { status, problemAndLessonSet, error };
};

export default useNavigation;
