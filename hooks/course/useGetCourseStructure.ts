import { useQuery } from "@tanstack/react-query";
import { apiRoutes } from "constants/apiRoutes";
import apiClient from "lib/api/apiClient";
import { RootState } from "lib/store/store";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

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

type GetCourseStructureParams = {
  courseId: string;
};

export const COURSE_STRUCTURE_QUERY_KEY = "courseStructure";

export const useGetCourseStructure = ({ admin }: { admin?: boolean }) => {
  const { courseId } = useSelector((state: RootState) => state.course);

  if (!courseId) {
    toast.error("Course id not found");
    throw new Error("Course id not found");
  }

  const fetchCourseStructure = async ({
    courseId,
  }: GetCourseStructureParams): Promise<CourseStructure> => {
    const { data } = await apiClient.get(
      admin
        ? apiRoutes.v2.admin.getStructure(courseId)
        : apiRoutes.v2.student.getStructure(courseId)
    );
    return data;
  };

  return useQuery<CourseStructure, Error>({
    queryKey: [COURSE_STRUCTURE_QUERY_KEY, courseId],
    queryFn: () => fetchCourseStructure({ courseId }),
    refetchOnWindowFocus: false,
  });
};
