import AdminLayout from "components/layouts/AdminLayout";
import LessonView from "components/lesson/student/LessonView";
import { useGetLesson } from "hooks/lesson/useGetLesson";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

const StudentLessonView = () => {
  const router = useRouter();
  const { lessonId } = router.query;

  const {
    data: lessonData,
    isLoading: lessonLoading, //only for initial load
    isFetching: lessonFetching,
    isError: lessonError, // TODO add error handling and visual state
  } = useGetLesson({
    lessonId: lessonId as string,
  }); // pass in problemdata to one component in return (goal)

  if (lessonFetching) {
    return <StudentLessonLoadingState />;
  }

  if (lessonData === undefined) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 dark:bg-nav-darkest">
        <h1 className="text-base font-dm text-slate-900 dark:text-white">
          Lesson not found
        </h1>
      </div>
    );
  }

  return <LessonView lesson={lessonData} />;
};

StudentLessonView.getLayout = (page: NextPage) => (
  <AdminLayout pageTitle="Student Lesson View">{page}</AdminLayout>
);

export default StudentLessonView;

export const StudentLessonLoadingState = () => (
  <div className="flex items-center justify-center w-full h-full p-3 relative">
    <div className="z-10 w-full h-full flex flex-col items-center bg-white dark:bg-nav-dark/50 rounded-md border dark:border-white/10">
      <div className="h-full max-w-4xl mt-14 w-[90%]  p-4 flex flex-col items-start space-y-4">
        <div className="rounded-md h-12 w-1/2 bg-slate-200 dark:bg-white/10 animate-pulse"></div>
        <div className="rounded-md w-28 h-8 bg-slate-200 dark:bg-white/10 animate-pulse !mt-12"></div>
        <div className="rounded-md w-full h-4 bg-slate-200 dark:bg-white/10 animate-pulse !mt-6"></div>
        <div className="rounded-md w-full h-4 bg-slate-200 dark:bg-white/10 animate-pulse"></div>
        <div className="rounded-md w-96 h-4 bg-slate-200 dark:bg-white/10 animate-pulse"></div>
        <div className="rounded-md w-full h-4"></div>
        <div className="rounded-md w-full h-48 bg-slate-200 dark:bg-white/10 animate-pulse"></div>
        <div className="rounded-md w-full h-4"></div>
        <div className="rounded-md w-full h-4 bg-slate-200 dark:bg-white/10 animate-pulse"></div>
        <div className="rounded-md w-96 h-4 bg-slate-200 dark:bg-white/10 animate-pulse"></div>
        <div className="rounded-md w-48 h-4 bg-slate-200 dark:bg-white/10 animate-pulse"></div>
        <div className="rounded-md w-24 h-4 animate-pulse"></div>
      </div>
    </div>
  </div>
);