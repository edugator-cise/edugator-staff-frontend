import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRoutes } from "constants/apiRoutes";
import apiClient from "lib/api/apiClient";
import { CourseRole } from "./useGetUserInvitations";
import { EnrollmentStatus } from "hooks/enrollments/useGetUserEnrollments";
import { useAuth } from "@clerk/nextjs";
import { toast } from "react-hot-toast";

// when invitation is accepted, the enrollment object is returned after deletion from invitations table
export interface Enrollment {
  userId: string;
  courseId: string;
  role: CourseRole;
  status: EnrollmentStatus;
  email: string;
}

export const useAcceptInvitation = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  const acceptInvitation = async (invitationId: string) => {
    const { data } = await apiClient.post(
      apiRoutes.v2.student.acceptInvitation(invitationId),
      {},
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      }
    );
    return data;
  };

  return useMutation<Enrollment, Error, string>(acceptInvitation, {
    onSuccess: () => {
      toast.success("Invitation accepted");
      // invalidate userinvitations query
      queryClient.invalidateQueries(["userInvitations"]);
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
};
