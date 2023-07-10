import React from "react";
import { useRouter } from "next/router";
import AdminLayout from "components/layouts/AdminLayout";
import { useGetLesson } from "hooks/lesson/useGetLesson";
import AdminLessonEditor from "components/lesson/admin/LessonEditor";

const LoadingState = () => (
  <div className="w-full h-full flex flex-col items-center bg-white">
    <div className="h-14 py-3 bg-nav-darkest w-full flex justify-between px-4 items-center">
      <div className="h-full w-48 rounded-md animate-pulse bg-nav-inactive-dark/50"></div>
      <div className="flex space-x-2 items-center h-full">
        <div className="w-24 h-8 rounded-md bg-nav-inactive-dark/50 animate-pulse"></div>
      </div>
    </div>
    <div className="h-full max-w-4xl mt-14 w-[90%] bg-white p-4 flex flex-col items-start space-y-4">
      <div className="rounded-md h-12 w-1/2 bg-slate-200 animate-pulse"></div>
      <div className="rounded-md w-28 h-8 bg-slate-200 animate-pulse !mt-12"></div>
      <div className="rounded-md w-full h-4 bg-slate-200 animate-pulse !mt-6"></div>
      <div className="rounded-md w-full h-4 bg-slate-200 animate-pulse"></div>
      <div className="rounded-md w-96 h-4 bg-slate-200 animate-pulse"></div>
      <div className="rounded-md w-full h-4 bg-white"></div>
      <div className="rounded-md w-full h-48 bg-slate-200 animate-pulse"></div>
      <div className="rounded-md w-full h-4 bg-white"></div>
      <div className="rounded-md w-full h-4 bg-slate-200 animate-pulse"></div>
      <div className="rounded-md w-96 h-4 bg-slate-200 animate-pulse"></div>
      <div className="rounded-md w-48 h-4 bg-slate-200 animate-pulse"></div>
      <div className="rounded-md w-24 h-4 animate-pulse"></div>
    </div>
  </div>
);

const ContentEditorPage = () => {
  const router = useRouter();
  const { lessonId } = router.query;

  const {
    data: lessonData,
    isLoading: lessonLoading, //only for initial load
    isFetching: lessonFetching,
    isError: lessonError, // TODO add error handling and visual state
  } = useGetLesson({
    lessonId: lessonId as string,
  });

  return lessonFetching ? (
    <LoadingState />
  ) : (
    <AdminLessonEditor lesson={lessonData} />
  );
};

ContentEditorPage.getLayout = (page: React.ReactNode) => (
  <AdminLayout pageTitle="Lesson Editor">{page}</AdminLayout>
);

export default ContentEditorPage;
