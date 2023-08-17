import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CourseInvitation, CourseRole } from "./useGetUserInvitations";
import { apiRoutes } from "constants/apiRoutes";
import apiClient from "lib/api/apiClient";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useAuth } from "@clerk/nextjs";

interface CourseInvitationCreate {
  email: string;
  role: CourseRole;
}

// need another hook to pass this in via csv
export const useInviteCourseMember = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  const router = useRouter();
  const { courseId } = router.query;

  if (!courseId) {
    throw new Error("Course id not found");
  }

  const inviteCourseMember = async ({
    email,
    role,
  }: CourseInvitationCreate) => {
    const { data } = await apiClient.post(
      apiRoutes.v2.admin.createInvitation(courseId as string),
      {
        email,
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

  return useMutation<CourseInvitation, Error, CourseInvitationCreate>(
    inviteCourseMember,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["courseInvitations", courseId]);
        toast.success("Member invited successfully");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );
};
