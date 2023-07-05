import { useQuery } from "@tanstack/react-query";
import { Content } from "@tiptap/react";
import { apiRoutes } from "constants/apiRoutes";
import apiClient from "lib/api/apiClient";
import { toast } from "react-hot-toast";

type GetLessonParams = {
  lessonId: string;
};

export interface Lesson {
  id: string;
  title: string;
  orderNumber: number;
  content: Content | undefined;
  moduleId: string;
  hidden: boolean;
  createdAt: string;
  updatedAt: string;
}

const fetchLesson = async ({ lessonId }: GetLessonParams) => {
  const { data } = await apiClient.get(apiRoutes.v2.admin.getLesson(lessonId));
  return data;
};

export const useGetLesson = ({ lessonId }: GetLessonParams) => {
  return useQuery<Lesson, Error>({
    queryKey: ["lesson", lessonId],
    queryFn: () => fetchLesson({ lessonId }),
    onError: () => {
      toast.error("Error loading lesson");
    },
  });
};
