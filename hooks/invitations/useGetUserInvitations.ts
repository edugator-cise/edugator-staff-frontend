import { apiRoutes } from "constants/apiRoutes";
import apiClient from "lib/api/apiClient";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";
import { InstructorData } from "hooks/enrollments/useGetUserEnrollments";

export type CourseRole = "teachingAssistant" | "instructor" | "student";

export const COURSE_ROLES: { [key in CourseRole]: true } = {
  teachingAssistant: true,
  instructor: true,
  student: true,
};

// for gets
export interface CourseInvitation {
  courseId: string;
  id: string;
  email: string;
  role: CourseRole;
  courseDescription: string;
  courseName: string;
  courseLogo: string;
  instructors: InstructorData[];
  createdAt: string;
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
