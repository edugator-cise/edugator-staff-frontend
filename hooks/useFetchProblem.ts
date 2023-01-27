import { useEffect, useState } from "react";
import apiClient from "lib/api/apiClient";
import { useDispatch, useSelector } from "react-redux";
import { setRunCodeError } from "components/CodeEditor/CodeEditorSlice";
import { FetchStatus } from "./types";
import { IProblem } from "src/shared/types";
import { apiRoutes } from "constants/apiRoutes";

export const useFetchProblem = ({
  id,
  isAdmin,
}: {
  id: string;
  isAdmin: boolean;
}) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.loading);
  const [problem, setProblem] = useState<IProblem | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [stdin, setStdin] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const { data }: { data: IProblem } = await apiClient.get(
        isAdmin
          ? apiRoutes.admin.getProblem(id)
          : apiRoutes.student.getProblem(id)
      );
      return data;
    };
    fetchData()
      .then((values) => {
        setProblem(values);
        setStatus(FetchStatus.succeed);
        if (values.testCases.length > 0) {
          setStdin(values.testCases[0].input);
        }
      })
      .catch((e) => {
        dispatch(setRunCodeError({ hasError: true, errorMessage: e.message }));
        // dispatch(setRunningSubmission(false)); TODO: handle this, should we move this to global state?
        setStatus(FetchStatus.failed);
        setError(e);
      });
    return () => {
      setStatus(FetchStatus.loading);
    };
  }, [id, isAdmin]);
  return { status, problem, stdin, error };
};
