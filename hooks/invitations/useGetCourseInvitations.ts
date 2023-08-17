import { apiRoutes } from "constants/apiRoutes";
import apiClient from "lib/api/apiClient";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CourseInvitation } from "./useGetUserInvitations";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";

export const useGetCourseInvitations = () => {
  const { getToken } = useAuth();

  const router = useRouter();

  const { courseId } = router.query;
  const fetchAllCourseInvitations = async () => {
    const { data } = await apiClient.get(
      apiRoutes.v2.admin.getCourseInvitations(courseId as string),
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      }
    );
    return data;
  };

  return useQuery<CourseInvitation[], Error>({
    refetchOnWindowFocus: false,
    queryKey: ["courseInvitations", courseId],
    queryFn: () => fetchAllCourseInvitations(),
    onError: () => {
      toast.error("Error loading invitations for course");
    },
  });
};
