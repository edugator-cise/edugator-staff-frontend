import { useAuth } from "@clerk/nextjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRoutes } from "constants/apiRoutes";
import apiClient from "lib/api/apiClient";
import { RootState } from "lib/store/store";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

// used for instructor to update the role of a user in a course
export const useDeleteEnrollment = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  const { courseId } = useSelector((state: RootState) => state.course);

  if (!courseId) {
    toast.error("Course id not found");
    throw new Error("Course id not found");
  }

  const deleteEnrollment = async (userId: string) => {
    const { data } = await apiClient.delete(
      apiRoutes.v2.admin.deleteEnrollment(courseId),
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
        data: {
          userId,
        },
      }
    );
    return data;
  };

  return useMutation<any, Error, string>(deleteEnrollment, {
    onSuccess: () => {
      // invalidate course structure query
      toast.success("Member deleted successfully");
      queryClient.invalidateQueries(["courseEnrollments", courseId]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
