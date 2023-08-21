import { apiRoutes } from "constants/apiRoutes";
import apiClient from "lib/api/apiClient";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CourseRole } from "hooks/invitations/useGetUserInvitations";
import { useAuth } from "@clerk/nextjs";

export type EnrollmentStatus = "pending" | "active" | "removed";

// for gets
export interface CourseEnrollment {
  avatar: string;
  courseId: string;
  userId: string;
  email: string;
  name: string;
  role: CourseRole; // should this be enum? depends what we expect passed in by backend
  courseName: string;
  instructors: InstructorData[];
  status: EnrollmentStatus;
  createdAt: string;
  updatedAt: string;
  courseDescription: string;
  courseLogo: string;
}

export interface InstructorData {
  name: string;
  image: string;
}

export const useGetUserEnrollments = () => {
  const { getToken } = useAuth();
  const fetchAllUserEnrollments = async () => {
    const { data } = await apiClient.get(apiRoutes.v2.student.getEnrollments, {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    });
    return data;
  };

  return useQuery<CourseEnrollment[], Error>({
    refetchOnWindowFocus: false, // set this to true?
    refetchOnMount: false,
    queryKey: ["userEnrollments"],
    queryFn: () => fetchAllUserEnrollments(),
    onError: () => {
      toast.error("Error loading enrollments for user");
    },
  });
};
