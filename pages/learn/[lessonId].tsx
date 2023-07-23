import React, { ReactNode } from "react";
import PlaygroundLayout from "components/layouts/PlaygroundLayout";
import { useRouter } from "next/router";
import { useGetLesson } from "hooks/lesson/useGetLesson";
import LessonView from "components/lesson/student/LessonView";

export default function LearnPage() {
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
    return <StudentLoadingState />;
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
}

export const StudentLoadingState = () => (
  <div className="flex items-center justify-center w-full h-full bg-slate-300 dark:bg-slate-950 p-3">
    <div className="w-full h-full flex flex-col items-center bg-white dark:bg-nav-darker rounded-md border dark:border-slate-800">
      <div className="h-full max-w-4xl mt-14 w-[90%] bg-white dark:bg-nav-darker p-4 flex flex-col items-start space-y-4">
        <div className="rounded-md h-12 w-1/2 bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
        <div className="rounded-md w-28 h-8 bg-slate-200 dark:bg-slate-800 animate-pulse !mt-12"></div>
        <div className="rounded-md w-full h-4 bg-slate-200 dark:bg-slate-800 animate-pulse !mt-6"></div>
        <div className="rounded-md w-full h-4 bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
        <div className="rounded-md w-96 h-4 bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
        <div className="rounded-md w-full h-4 bg-white dark:bg-nav-darker"></div>
        <div className="rounded-md w-full h-48 bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
        <div className="rounded-md w-full h-4 bg-white dark:bg-nav-darker"></div>
        <div className="rounded-md w-full h-4 bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
        <div className="rounded-md w-96 h-4 bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
        <div className="rounded-md w-48 h-4 bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
        <div className="rounded-md w-24 h-4 animate-pulse"></div>
      </div>
    </div>
  </div>
);

LearnPage.getLayout = function getLayout(page: ReactNode) {
  return <PlaygroundLayout>{page}</PlaygroundLayout>;
};
