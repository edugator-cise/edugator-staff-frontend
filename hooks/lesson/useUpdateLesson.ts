import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRoutes } from "constants/apiRoutes";
import { COURSE_STRUCTURE_QUERY_KEY } from "hooks/course/useGetCourseStructure";
import apiClient from "lib/api/apiClient";
import { RootState } from "lib/store/store";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

export interface LessonUpdate {
  title: string;
  content: string;
  hidden: boolean;
}

export const useUpdateLesson = (lessonId: string) => {
  const queryClient = useQueryClient();

  const router = useRouter();
  const { courseId } = router.query;

  if (!courseId) {
    throw new Error("Course id not found");
  }

  const updateLesson = async (lesson: LessonUpdate) => {
    const { data } = await apiClient.put(
      apiRoutes.v2.admin.updateLesson(lessonId),
      lesson
    );
    return data;
  };

  return useMutation<LessonUpdate, Error, LessonUpdate>(updateLesson, {
    onSuccess: () => {
      // invalidate course structure query
      queryClient.invalidateQueries([COURSE_STRUCTURE_QUERY_KEY, courseId]);
      queryClient.invalidateQueries(["lesson", lessonId]);

      // navigate to dashboard page
    },
  });
};
