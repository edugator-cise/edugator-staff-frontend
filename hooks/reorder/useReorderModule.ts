import { useAuth } from "@clerk/nextjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRoutes } from "constants/apiRoutes";
import { COURSE_STRUCTURE_QUERY_KEY } from "hooks/course/useGetCourseStructure";
import apiClient from "lib/api/apiClient";
import { RootState } from "lib/store/store";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

export interface ReorderModule {
  id: string;
  newOrderNumber: number;
}

export const useReorderModule = () => {
  const { getToken } = useAuth();
  const { courseId } = useSelector((state: RootState) => state.course);

  const reorderModule = async (reorderModule: ReorderModule) => {
    const { data } = await apiClient.post(
      apiRoutes.v2.admin.reorderModule(courseId as string),
      reorderModule,
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      }
    );
    return data;
  };

  return useMutation<ReorderModule, Error, ReorderModule>(reorderModule, {
    onSuccess: () => {
      // invalidate course structure query
      // I think we dont invalidate these, cause visual gets affected on frontend in the same way?
      //queryClient.invalidateQueries([COURSE_STRUCTURE_QUERY_KEY, courseId]);
      //queryClient.invalidateQueries(["lesson", lessonId]);
      toast.success("Module reordered successfully");
      // navigate to dashboard page
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
