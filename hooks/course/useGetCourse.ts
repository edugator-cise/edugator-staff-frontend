import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { apiRoutes } from "constants/apiRoutes";
import { InstructorData } from "hooks/enrollments/useGetUserEnrollments";
import apiClient from "lib/api/apiClient";
import { RootState } from "lib/store/store";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

export interface Course {
  id: string;
  courseName: string;
  language: string | null;
  startDate: string;
  endDate: string;
  logo: string;
  createdAt: string;
  updatedAt: string;
  organizationId: string;
  instructors: InstructorData[];
  description: string;
}

type GetCourseParams = {
  courseId: string;
};

export const COURSE_QUERY_KEY = "courseData";

export const useGetCourse = ({
  admin,
  courseId,
}: {
  admin?: boolean;
  courseId: string;
}) => {
  const { getToken } = useAuth();

  const fetchCourse = async ({
    courseId,
  }: GetCourseParams): Promise<Course> => {
    const { data } = await apiClient.get(
      apiRoutes.v2.admin.getCourseById(courseId),
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      }
    );
    return data;
  };

  return useQuery<Course, Error>({
    queryKey: [COURSE_QUERY_KEY, courseId],
    queryFn: () => fetchCourse({ courseId }),
    refetchOnWindowFocus: false,
    onError: () => {
      toast.error("Error loading course structure");
    },
  });
};
