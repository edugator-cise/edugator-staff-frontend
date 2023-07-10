import { IModuleWithProblemsAndLessons } from "components/problem/student/types";
import { useEffect, useState } from "react";
import apiClient from "lib/api/apiClient";
import { FetchStatus } from "./types";
import { apiRoutes } from "constants/apiRoutes";
import toast from "react-hot-toast";

// v1 api
const useNavigation = (isAdmin: boolean) => {
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.loading);
  const [problemAndLessonSet, setProblemAndLessonSet] = useState<
    IModuleWithProblemsAndLessons[]
  >([]);
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

// v2 api

export interface CourseStructure {
  id: string;
  courseName: string;
  modules: CourseModule[];
}

export interface CourseModule {
  id: string;
  moduleName: string;
  content: ModuleContent[];
}

export interface ModuleContent {
  contentType: "lesson" | "problem";
  id: string;
  title: string;
  orderNumber: number;
}

export const useCourseStructure = (courseId: string) => {
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.loading);
  const [courseStructure, setCourseStructure] = useState<CourseStructure>();
  const [error, setError] = useState<Error | undefined>(undefined);
  const [shouldRefetch, refetch] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await apiClient.get(
        apiRoutes.v2.student.getStructure(courseId)
      );
      return data;
    };
    fetchData()
      .then((values) => {
        console.log(values);
        setCourseStructure(values);
        setStatus(FetchStatus.succeed);
      })
      .catch((e) => {
        toast.error(e.message);
        setStatus(FetchStatus.failed);
        setError(e);
      });
  }, [shouldRefetch]);

  return { status, courseStructure, error, refetch: () => refetch({}) };
};

export default useNavigation;
