import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRoutes } from "constants/apiRoutes";
import { COURSE_STRUCTURE_QUERY_KEY } from "hooks/course/useGetCourseStructure";
import apiClient from "lib/api/apiClient";
import { RootState } from "lib/store/store";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const deleteProblem = async (problemId: string) => {
  const { data } = await apiClient.delete(
    apiRoutes.v2.admin.deleteProblem(problemId)
  );
  return data;
};

export const useDeleteProblem = () => {
  const queryClient = useQueryClient();

  const { courseId } = useSelector((state: RootState) => state.course);

  if (!courseId) {
    toast.error("Course id not found");
    throw new Error("Course id not found");
  }

  return useMutation<string, Error, string>(deleteProblem, {
    onSuccess: () => {
      // invalidate course structure query
      toast.success("Problem deleted successfully");
      queryClient.invalidateQueries([COURSE_STRUCTURE_QUERY_KEY, courseId]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
