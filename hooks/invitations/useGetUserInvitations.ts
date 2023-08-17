import { apiRoutes } from "constants/apiRoutes";
import apiClient from "lib/api/apiClient";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";

export type CourseRole = "teachingAssistant" | "instructor" | "student";

// for gets
export interface CourseInvitation {
  courseId: string;
  id: string;
  email: string;
  role: CourseRole; // should this be enum? depends what we expect passed in by backend
}

export const useGetUserInvitations = () => {
  const { getToken } = useAuth();

  const fetchAllUserInvitations = async () => {
    const { data } = await apiClient.get(apiRoutes.v2.student.getInvitations, {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    });
    return data;
  };

  return useQuery<CourseInvitation[], Error>({
    refetchOnWindowFocus: false, // set this to true?
    queryKey: ["userInvitations"],
    queryFn: () => fetchAllUserInvitations(),
    onError: () => {
      toast.error("Error loading invitations for user");
    },
  });
};
