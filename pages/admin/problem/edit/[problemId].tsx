import AdminLayout from "components/layouts/AdminLayout";
import { useRouter } from "next/router";
import AdminProblemEditor from "components/problem/admin/ProblemEditor";
import { useGetProblem } from "hooks/problem/useGetProblem";
import { useEffect } from "react";
import { StudentLoadingState } from "pages/code/[problemId]";

const ProblemEditPage = () => {
  const router = useRouter();
  const { problemId } = router.query;

  const {
    data: problemData,
    isLoading: problemLoading, //only for initial load
    isFetching: problemFetching,
    isError: problemError, // TODO add error handling and visual state
  } = useGetProblem({
    admin: true,
    problemId: problemId as string,
  });

  return problemFetching ? (
    <div className="flex flex-col w-full h-full">
      <div className="h-14 py-3 bg-nav-darkest w-full flex justify-between px-4 items-center">
        <div className="h-full w-48 rounded-md animate-pulse bg-nav-inactive-dark/50"></div>
        <div className="flex space-x-2 items-center h-full">
          <div className="w-8 h-8 rounded-md bg-nav-inactive-dark/50 animate-pulse"></div>
          <div className="w-8 h-8 rounded-md bg-nav-inactive-dark/50 animate-pulse"></div>
          <div className="w-24 h-8 rounded-md bg-nav-inactive-dark/50 animate-pulse"></div>
        </div>
      </div>
      <StudentLoadingState />
    </div>
  ) : (
    <AdminProblemEditor problem={problemData} />
  );
};

ProblemEditPage.getLayout = (page: React.ReactNode) => (
  <AdminLayout pageTitle="Problem Editor">{page}</AdminLayout>
);

export default ProblemEditPage;
