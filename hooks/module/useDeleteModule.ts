import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRoutes } from "constants/apiRoutes";
import { COURSE_STRUCTURE_QUERY_KEY } from "hooks/course/useGetCourseStructure";
import apiClient from "lib/api/apiClient";
import { toast } from "react-hot-toast";

const deleteModule = async (moduleId: string) => {
  const { data } = await apiClient.delete(
    apiRoutes.v2.admin.deleteModule(moduleId)
  );
  return data;
};

export const useDeleteModule = () => {
  const queryClient = useQueryClient();

  return useMutation<string, Error, string>(deleteModule, {
    onSuccess: () => {
      // invalidate course structure query
      toast.success("Module deleted successfully");
      queryClient.invalidateQueries([COURSE_STRUCTURE_QUERY_KEY]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
