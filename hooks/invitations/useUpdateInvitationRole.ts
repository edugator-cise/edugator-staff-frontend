import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRoutes } from "constants/apiRoutes";
import apiClient from "lib/api/apiClient";
import { RootState } from "lib/store/store";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { CourseRole } from "./useGetUserInvitations";
import { useAuth } from "@clerk/nextjs";

interface InvitationRoleUpdate {
  invitationId: string;
  role: CourseRole;
}

// used for instructor to update the role of a user in a course
export const useUpdateInvitationRole = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  const { courseId } = useSelector((state: RootState) => state.course);

  if (!courseId) {
    toast.error("Course id not found");
    throw new Error("Course id not found");
  }

  const updateRole = async ({ invitationId, role }: InvitationRoleUpdate) => {
    const { data } = await apiClient.put(
      apiRoutes.v2.admin.updateInvitation(courseId, invitationId),
      {
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

  return useMutation<InvitationRoleUpdate, Error, InvitationRoleUpdate>(
    updateRole,
    {
      onSuccess: () => {
        // invalidate course structure query
        toast.success("Member role updated successfully");
        queryClient.invalidateQueries(["courseInvitations", courseId]);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );
};
