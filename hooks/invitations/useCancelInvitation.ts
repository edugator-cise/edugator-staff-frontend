import { useAuth } from "@clerk/nextjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRoutes } from "constants/apiRoutes";
import apiClient from "lib/api/apiClient";
import { RootState } from "lib/store/store";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

// used for instructor to update the role of a user in a course
export const useCancelInvitation = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  const { courseId } = useSelector((state: RootState) => state.course);

  if (!courseId) {
    toast.error("Course id not found");
    throw new Error("Course id not found");
  }

  const updateRole = async (invitationId: string) => {
    const { data } = await apiClient.delete(
      apiRoutes.v2.admin.deleteInvitation(courseId, invitationId),
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      }
    );
    return data;
  };

  return useMutation<any, Error, string>(updateRole, {
    onSuccess: () => {
      // invalidate course structure query
      toast.success("Invite cancelled successfully");
      queryClient.invalidateQueries(["courseInvitations", courseId]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
