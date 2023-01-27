import { useEffect, useState } from "react";
import apiClient from "src/app/common/apiClient";
import { useDispatch, useSelector } from "react-redux";
import {
  setRunCodeError,
  setRunningSubmission,
} from "components/CodeEditor/CodeEditorSlice";
import { FetchStatus } from "./types";
import { ILesson } from "src/shared/types";

export const useFetchLesson = ({ id }: { id: string }) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.loading);
  const [lesson, setLesson] = useState<ILesson | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const { data }: { data: ILesson } = await apiClient.get(
        `v1/student/lesson/${id}`
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
        dispatch(setRunningSubmission(false));
        setStatus(FetchStatus.failed);
        setError(e);
      });
    return () => {
      setStatus(FetchStatus.loading);
    };
  }, [id]);
  return { status, lesson, error };
};
