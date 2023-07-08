import AdminLayout from "components/AdminLayout/AdminLayout";
import { useRouter } from "next/router";
import AdminProblemEditor from "components/ProblemEditor/NewEditor/ProblemEditor";
import { useGetProblem } from "hooks/problem/useGetProblem";
import { useEffect } from "react";

const ProblemEditPage = () => {
  const router = useRouter();
  const { problemId } = router.query;

  const {
    data: problemData,
    isLoading: problemLoading, //only for initial load
    isFetching: problemFetching,
    isError: problemError, // TODO add error handling and visual state
  } = useGetProblem({
    problemId: problemId as string,
  });

  useEffect(() => {
    if (problemData) {
      console.log(problemData);
    }
  }, [problemData]);

  return problemFetching ? (
    <LoadingState />
  ) : (
    <AdminProblemEditor problem={problemData} />
  );
};

ProblemEditPage.getLayout = (page: React.ReactNode) => (
  <AdminLayout pageTitle="Problem Editor">{page}</AdminLayout>
);

const LoadingState = () => (
  <div className="w-full h-full flex flex-col">
    <div className="h-14 py-3 bg-nav-darkest w-full flex justify-between px-4 items-center">
      <div className="h-full w-48 rounded-md animate-pulse bg-nav-inactive-dark/50"></div>
      <div className="flex space-x-2 items-center h-full">
        <div className="w-8 h-8 rounded-md bg-nav-inactive-dark/50 animate-pulse"></div>
        <div className="w-8 h-8 rounded-md bg-nav-inactive-dark/50 animate-pulse"></div>
        <div className="w-24 h-8 rounded-md bg-nav-inactive-dark/50 animate-pulse"></div>
      </div>
    </div>
    <div className="w-full h-full flex">
      {/* Metadata */}
      <div className="h-full w-full bg-slate-100 border-r border-slate-300 p-4 flex flex-col items-start space-y-4">
        <div className="rounded-md h-12 w-80 bg-slate-300 animate-pulse"></div>
        <div className="flex items-center justify-center space-x-4">
          <div className="rounded-full h-6 w-24 bg-slate-300 animate-pulse"></div>
          <div className="rounded-full h-6 w-16 bg-slate-300 animate-pulse"></div>
          <div className="rounded-full h-6 w-20 bg-slate-300 animate-pulse"></div>
        </div>
        <div className="rounded-md w-56 h-4 bg-slate-300 animate-pulse !mt-12"></div>
        <div className="rounded-md w-80 h-4 bg-slate-300 animate-pulse"></div>
        <div className="rounded-md w-96 h-4 bg-slate-300 animate-pulse"></div>
        <div className="rounded-md w-48 h-4 bg-slate-300 animate-pulse"></div>
        <div className="rounded-md w-24 h-4 animate-pulse"></div>
        <div className="rounded-md w-52 h-4 bg-slate-300 animate-pulse"></div>
        <div className="rounded-md w-28 h-4 bg-slate-300 animate-pulse"></div>
        <div className="rounded-md w-36 h-4 bg-slate-300 animate-pulse"></div>
      </div>
      <div className="h-full w-full flex flex-col">
        {/* Code Editor */}
        <div className="h-full w-full border-b border-slate-300 space-y-4 bg-slate-100 p-4 flex flex-col">
          <div className="w-full h-full rounded-md bg-gradient-to-b from-slate-300 to-slate-200 animate-pulse"></div>
          <div className="w-full flex justify-end items-center space-x-4">
            <div className="w-24 h-8 rounded-md bg-slate-300 animate-pulse"></div>
            <div className="w-24 h-8 rounded-md bg-slate-300 animate-pulse"></div>
          </div>
        </div>
        <div className="h-full w-full space-y-4 bg-slate-100 p-4 flex flex-col">
          <div className="w-full flex justify-start items-center space-x-4">
            <div className="w-24 h-10 rounded-md bg-slate-300 animate-pulse"></div>
            <div className="w-24 h-10 rounded-md bg-slate-300 animate-pulse"></div>
            <div className="w-24 h-10 rounded-md bg-slate-300 animate-pulse"></div>
          </div>
          <div className="w-full h-full rounded-md bg-gradient-to-b to-slate-300 from-slate-200 animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
);

export default ProblemEditPage;
