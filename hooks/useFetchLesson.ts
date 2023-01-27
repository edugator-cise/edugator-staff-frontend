import { useEffect, useState } from "react";
import apiClient from "lib/api/apiClient";
import { useDispatch, useSelector } from "react-redux";
import { setRunCodeError } from "components/CodeEditor/CodeEditorSlice";
import { FetchStatus } from "./types";
import { ILesson } from "src/shared/types";
import { apiRoutes } from "constants/apiRoutes";

export const useFetchLesson = ({ id }: { id: string }) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.loading);
  const [lesson, setLesson] = useState<ILesson | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const { data }: { data: ILesson } = await apiClient.get(
        apiRoutes.student.getLesson(id)
      );
      return data;
    };
    fetchData()
      .then((values) => {
        setLesson(values);
        setStatus(FetchStatus.succeed);
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
  }, [id]);
  return { status, lesson, error };
};
