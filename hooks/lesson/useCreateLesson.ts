import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRoutes } from "constants/apiRoutes";
import { COURSE_STRUCTURE_QUERY_KEY } from "hooks/course/useGetCourseStructure";
import apiClient from "lib/api/apiClient";
import { RootState } from "lib/store/store";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

// body

export interface LessonCreate {
  title: string;
  content: string;
  hidden: boolean;
  moduleId: string;
}

const createLesson = async (lesson: LessonCreate) => {
  const { data } = await apiClient.post(
    apiRoutes.v2.admin.createLesson,
    lesson
  );
  return data;
};

export const useCreateLesson = (moduleId: string) => {
  const queryClient = useQueryClient();
  const { courseId } = useSelector((state: RootState) => state.course);

  if (!courseId) {
    throw new Error("Course id not found");
  }

  return useMutation<LessonCreate, Error, LessonCreate>(createLesson, {
    onSuccess: () => {
      // invalidate course structure query
      queryClient.invalidateQueries([COURSE_STRUCTURE_QUERY_KEY, courseId]);
      toast.success("Lesson created successfully");
      // navigate to dashboard page
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
