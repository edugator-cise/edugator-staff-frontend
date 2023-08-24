import AdminLayout from "components/layouts/AdminLayout";
import ProblemView from "components/problem/student/ProblemView";
import { useGetProblem } from "hooks/problem/useGetProblem";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

const StudentProblemView = () => {
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

  if (problemFetching) {
    return <StudentProblemLoadingState />;
  }

  if (problemData === undefined) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 dark:bg-nav-darkest">
        <h1 className="text-base font-dm text-slate-900 dark:text-white">
          Problem not found
        </h1>
      </div>
    );
  }

  return <ProblemView problem={problemData} />;
};

StudentProblemView.getLayout = (page: NextPage) => (
  <AdminLayout pageTitle="Student Problem View">{page}</AdminLayout>
);

export const StudentProblemLoadingState = () => (
  <div className="w-full h-full flex flex-col">
    <div className="w-full h-full flex">
      {/* Metadata */}
      <div className="pr-[6px] p-3 flex w-full h-full items-center justify-center">
        <div className="h-full w-full bg-slate-100 dark:bg-nav-darkest border rounded-md border-slate-300 dark:border-slate-800 p-4 flex flex-col items-start space-y-4">
          <div className="rounded-md h-12 w-80 bg-slate-300 dark:bg-slate-700 animate-pulse"></div>
          <div className="flex items-center justify-center space-x-4">
            <div className="rounded-full h-6 w-24 bg-slate-300 dark:bg-slate-700 animate-pulse"></div>
            <div className="rounded-full h-6 w-16 bg-slate-300 dark:bg-slate-700 animate-pulse"></div>
            <div className="rounded-full h-6 w-20 bg-slate-300 dark:bg-slate-700 animate-pulse"></div>
          </div>
          <div className="rounded-md w-56 h-4 bg-slate-300 dark:bg-slate-700 animate-pulse !mt-12"></div>
          <div className="rounded-md w-80 h-4 bg-slate-300 dark:bg-slate-700 animate-pulse"></div>
          <div className="rounded-md w-96 h-4 bg-slate-300 dark:bg-slate-700 animate-pulse"></div>
          <div className="rounded-md w-48 h-4 bg-slate-300 dark:bg-slate-700 animate-pulse"></div>
          <div className="rounded-md w-24 h-4 animate-pulse"></div>
          <div className="rounded-md w-52 h-4 bg-slate-300 dark:bg-slate-700 animate-pulse"></div>
          <div className="rounded-md w-28 h-4 bg-slate-300 dark:bg-slate-700 animate-pulse"></div>
          <div className="rounded-md w-36 h-4 bg-slate-300 dark:bg-slate-700 animate-pulse"></div>
        </div>
      </div>
      <div className="h-full w-full flex flex-col">
        {/* Code Editor */}
        <div className="pl-[6px] pb-[6px] p-3 flex w-full h-full items-center justify-center">
          <div className="h-full w-full border rounded-md border-slate-300 dark:border-slate-800 space-y-4 bg-slate-100 dark:bg-nav-darkest p-4 flex flex-col">
            <div className="w-full h-full rounded-md bg-gradient-to-b from-slate-300 dark:from-slate-800 to-slate-200 dark:to-slate-700 animate-pulse"></div>
            <div className="w-full flex justify-end items-center space-x-4">
              <div className="w-24 h-8 rounded-md bg-slate-300 dark:bg-slate-700 animate-pulse"></div>
              <div className="w-24 h-8 rounded-md bg-slate-300 dark:bg-slate-700 animate-pulse"></div>
            </div>
          </div>
        </div>
        <div className="pl-[6px] pt-[6px] p-3 flex w-full h-full items-center justify-center">
          <div className="h-full w-full space-y-4 bg-slate-100 dark:bg-nav-darkest p-4 flex flex-col border rounded-md border-slate-300 dark:border-slate-800">
            <div className="w-full flex justify-start items-center space-x-4">
              <div className="w-24 h-10 rounded-md bg-slate-300 dark:bg-slate-700 animate-pulse"></div>
              <div className="w-24 h-10 rounded-md bg-slate-300 dark:bg-slate-700 animate-pulse"></div>
              <div className="w-24 h-10 rounded-md bg-slate-300 dark:bg-slate-700 animate-pulse"></div>
            </div>
            <div className="w-full h-full rounded-md bg-gradient-to-b to-slate-300 from-slate-200 dark:from-slate-700 dark:to-slate-800  animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default StudentProblemView;
