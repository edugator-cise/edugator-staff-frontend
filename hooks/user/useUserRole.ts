import { useRouter } from "next/router";
import { useGetUserEnrollments } from "hooks/enrollments/useGetUserEnrollments";

export const useUserRole = () => {
  const router = useRouter();
  const { courseId } = router.query;
  const { data: enrollments } = useGetUserEnrollments();

  const role = enrollments?.find(
    (enrollment) => enrollment.courseId === courseId
  )?.role;

  return { role };
};
