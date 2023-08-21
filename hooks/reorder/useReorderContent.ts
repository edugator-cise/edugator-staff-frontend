import { useAuth } from "@clerk/nextjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRoutes } from "constants/apiRoutes";
import { COURSE_STRUCTURE_QUERY_KEY } from "hooks/course/useGetCourseStructure";
import apiClient from "lib/api/apiClient";
import { RootState } from "lib/store/store";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

/**
 * {
    "id": "{{sample_problem_id}}",
    "contentType": "problem",
    "newOrderNumber": 2
}
 */

export interface ReorderContent {
  id: string;
  contentType: string;
  newOrderNumber: number;
}

export const useReorderContent = (moduleId: string) => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const { courseId } = useSelector((state: RootState) => state.course);

  const reorderContent = async (reorderContent: ReorderContent) => {
    const { data } = await apiClient.post(
      apiRoutes.v2.admin.reorderContent(moduleId),
      reorderContent,
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      }
    );
    return data;
  };

  return useMutation<ReorderContent, Error, ReorderContent>(reorderContent, {
    onSuccess: () => {
      // invalidate course structure query
      // I think we dont invalidate these, cause visual gets affected on frontend in the same way?
      //queryClient.invalidateQueries([COURSE_STRUCTURE_QUERY_KEY, courseId]);
      //queryClient.invalidateQueries(["lesson", lessonId]);
      toast.success("Content reordered successfully");
      // navigate to dashboard page
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
