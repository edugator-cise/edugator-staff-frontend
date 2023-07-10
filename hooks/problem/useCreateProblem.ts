import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRoutes } from "constants/apiRoutes";
import { COURSE_STRUCTURE_QUERY_KEY } from "hooks/course/useGetCourseStructure";
import apiClient from "lib/api/apiClient";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "lib/store/store";

type TestCaseCreate = {
  testType: string;
  input: string;
  expectedOutput: string;
  hint: string;
  visibility: number;
  feedback: string;
  orderNumber: number;
};

type ProblemCreate = {
  title: string;
  hidden: boolean;
  fileName: string;
  dueDate: string;
  statement: string;
  codeHeader: string;
  codeBody: string;
  codeFooter: string;
  templatePackage: string;
  timeLimit: number;
  memoryLimit: number;
  buildCommand: string;
  languages: string;
  moduleId: string;
  testCases: TestCaseCreate[];
};

const createProblem = async (problem: ProblemCreate) => {
  const { data } = await apiClient.post(
    apiRoutes.v2.admin.createProblem,
    problem
  );
  return data;
};

export const useCreateProblem = () => {
  const queryClient = useQueryClient();
  const { courseId } = useSelector((state: RootState) => state.course);
  return useMutation<ProblemCreate, Error, ProblemCreate>(createProblem, {
    onSuccess: (data) => {
      queryClient.invalidateQueries([COURSE_STRUCTURE_QUERY_KEY, courseId]);
      toast.success("Problem created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
