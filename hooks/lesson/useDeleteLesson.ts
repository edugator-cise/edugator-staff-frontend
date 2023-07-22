import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRoutes } from "constants/apiRoutes";
import { COURSE_STRUCTURE_QUERY_KEY } from "hooks/course/useGetCourseStructure";
import apiClient from "lib/api/apiClient";
import { RootState } from "lib/store/store";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const deleteLesson = async (lessonId: string) => {
  const { data } = await apiClient.delete(
    apiRoutes.v2.admin.deleteLesson(lessonId)
  );
  return data;
};

export const useDeleteLesson = () => {
  const queryClient = useQueryClient();

  const { courseId } = useSelector((state: RootState) => state.course);

  if (!courseId) {
    toast.error("Course id not found");
    throw new Error("Course id not found");
  }

  return useMutation<string, Error, string>(deleteLesson, {
    onSuccess: () => {
      // invalidate course structure query
      toast.success("Lesson deleted successfully");
      queryClient.invalidateQueries([COURSE_STRUCTURE_QUERY_KEY, courseId]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
