import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRoutes } from "constants/apiRoutes";
import { COURSE_STRUCTURE_QUERY_KEY } from "hooks/course/useGetCourseStructure";
import apiClient from "lib/api/apiClient";
import { RootState } from "lib/store/store";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Lesson } from "./useGetLesson";

// body

export interface LessonCreate {
  title: string;
  content: string;
  hidden: boolean;
  moduleId: string;
}

const createLesson = async (lesson: LessonCreate): Promise<Lesson> => {
  const { data } = await apiClient.post(
    apiRoutes.v2.admin.createLesson,
    lesson
  );
  return data;
};

export const useCreateLesson = (moduleId: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { courseId } = useSelector((state: RootState) => state.course);

  if (!courseId) {
    throw new Error("Course id not found");
  }

  return useMutation<Lesson, Error, LessonCreate>(createLesson, {
    onSuccess: (data) => {
      // invalidate course structure query
      queryClient.invalidateQueries([COURSE_STRUCTURE_QUERY_KEY, courseId]);
      toast.success("Lesson created successfully");

      const id = data.id;
      const moduleId = data.moduleId;
      const moduleName = data.moduleName || "Module Name";

      console.log(data);

      router.push({
        pathname: `/admin/lesson/edit/${id}`,
        query: {
          moduleName: moduleName,
          moduleId: moduleId,
        },
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
