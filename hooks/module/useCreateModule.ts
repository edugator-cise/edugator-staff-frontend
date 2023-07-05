import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRoutes } from "constants/apiRoutes";
import { COURSE_STRUCTURE_QUERY_KEY } from "hooks/course/useGetCourseStructure";
import apiClient from "lib/api/apiClient";
import { RootState } from "lib/store/store";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

// body
export interface Module {
  moduleName: string;
  // courseId: string; // this gets passed into the fetch call, but is grabbed from global state
  orderNumber: number;
}

const createModule = async (module: Module) => {
  const { data } = await apiClient.post(
    apiRoutes.v2.admin.createModule,
    module
  );
  return data;
};

export const useCreateModule = () => {
  const queryClient = useQueryClient();

  const { courseId } = useSelector((state: RootState) => state.course);

  if (!courseId) {
    toast.error("Course id not found");
    throw new Error("Course id not found");
  }

  const createModuleWithCourseId = async (module: Module) => {
    const moduleWithCourseId = { ...module, courseId };
    return createModule(moduleWithCourseId);
  };

  return useMutation<Module, Error, Module>(createModuleWithCourseId, {
    onSuccess: () => {
      // invalidate course structure query
      toast.success("Module created successfully");
      queryClient.invalidateQueries([COURSE_STRUCTURE_QUERY_KEY, courseId]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
