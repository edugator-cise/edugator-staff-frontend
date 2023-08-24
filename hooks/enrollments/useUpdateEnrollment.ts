import { useAuth } from "@clerk/nextjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRoutes } from "constants/apiRoutes";
import apiClient from "lib/api/apiClient";
import { RootState } from "lib/store/store";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

interface EnrollmentUpdate {
  userId: string;
  role: string;
}

// used for instructor to update the role of a user in a course
export const useUpdateEnrollment = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  const { courseId } = useSelector((state: RootState) => state.course);

  if (!courseId) {
    toast.error("Course id not found");
    throw new Error("Course id not found");
  }

  const updateRole = async ({ userId, role }: EnrollmentUpdate) => {
    const { data } = await apiClient.put(
      apiRoutes.v2.admin.updateEnrollment(courseId),
      {
        userId,
        role,
      },
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      }
    );
    return data;
  };

  return useMutation<EnrollmentUpdate, Error, EnrollmentUpdate>(updateRole, {
    onSuccess: () => {
      // invalidate course structure query
      toast.success("Member role updated successfully");
      queryClient.invalidateQueries(["courseEnrollments", courseId]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};