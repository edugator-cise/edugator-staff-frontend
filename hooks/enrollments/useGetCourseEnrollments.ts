import { apiRoutes } from "constants/apiRoutes";
import apiClient from "lib/api/apiClient";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CourseEnrollment } from "./useGetUserEnrollments";
import { useRouter } from "next/router";
import { useAuth } from "@clerk/nextjs";

// for getting the roster - all course enrollments for a course
export const useGetCourseEnrollments = () => {
  const { getToken } = useAuth();

  const router = useRouter();

  const { courseId } = router.query;

  const fetchAllCourseEnrollments = async () => {
    const { data } = await apiClient.get(
      apiRoutes.v2.admin.getCourseEnrollments(courseId as string),
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      }
    );
    return data;
  };

  return useQuery<CourseEnrollment[], Error>({
    refetchOnWindowFocus: false,
    queryKey: ["courseEnrollments", courseId],
    queryFn: () => fetchAllCourseEnrollments(),
    onError: () => {
      toast.error("Error loading enrollments for course");
    },
  });
};
