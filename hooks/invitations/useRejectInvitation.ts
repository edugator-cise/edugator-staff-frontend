import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRoutes } from "constants/apiRoutes";
import apiClient from "lib/api/apiClient";

// when invitation is rejected, a simple boolean is returned (true if successful, false if not)

export const useRejectInvitation = () => {
  const queryClient = useQueryClient();

  const rejectInvitation = async (invitationId: string) => {
    const { data } = await apiClient.post(
      apiRoutes.v2.student.rejectInvitation(invitationId)
    );
    return data;
  };

  return useMutation<boolean, Error, string>(rejectInvitation, {
    onSuccess: () => {
      // invalidate userinvitations query
      queryClient.invalidateQueries(["userInvitations"]);
    },
  });
};
