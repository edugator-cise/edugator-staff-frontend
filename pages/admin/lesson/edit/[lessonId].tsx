import React, { useEffect } from "react";
import { TextStack } from "components/ContentEditor/TextStack";
import { useRouter } from "next/router";
import AdminLayout from "components/AdminLayout/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  openWarningModal,
  requestGetContentSuccess,
  resetState,
  updateContentId,
  updateLessonContent,
  updateModuleId,
  updateModuleName,
  WarningTypes,
} from "state/contentEditorPageSlice";
import { useGetLesson } from "hooks/lesson/useGetLesson";
import AdminLessonEditor from "components/LessonEditor/LessonEditor";

const ContentEditorPage = () => {
  const router = useRouter();
  const { lessonId } = router.query;

  /* const {
    status,
    lesson: currentLesson,
    rawLesson,
    error,
  } = useFetchLesson({
    id: params && lessonId ? (lessonId as string) : "",
  }); */

  const {
    data: lessonData,
    isLoading: lessonLoading,
    isFetching: lessonFetching,
    isError: lessonError,
  } = useGetLesson({
    lessonId: lessonId as string,
  });

  useEffect(() => {
    // when lesson data changes, dispatch the action to update the lesson
    // in the store
    console.log("lessonData", lessonData);
    /* dispatch(updateLessonContent(lessonData ? lessonData.content : undefined)); */
  }, [lessonData]);

  useEffect(() => {
    console.log("lessonLoading", lessonFetching);
  }, [lessonFetching]);

  return lessonFetching ? (
    <div className="w-full h-full flex flex-col items-center bg-white">
      <div className="h-14 py-3 bg-nav-darkest w-full flex justify-between px-4 items-center">
        <div className="h-full w-48 rounded-md animate-pulse bg-nav-inactive-dark/50"></div>
        <div className="flex space-x-2 items-center h-full">
          <div className="w-24 h-8 rounded-md bg-nav-inactive-dark/50 animate-pulse"></div>
        </div>
      </div>
      {/* <div className="h-14 py-3 bg-slate-700 w-full flex justify-start px-4 items-center">
        <div className="flex space-x-2 items-center h-full">
          <div className="w-8 h-8 rounded-sm bg-white/10 animate-pulse"></div>
          <div className="w-8 h-8 rounded-sm bg-white/10 animate-pulse"></div>
          <div className="w-8 h-8 rounded-sm bg-white/10 animate-pulse"></div>
          <div className="w-8 h-8 rounded-sm bg-white/10 animate-pulse"></div>
          <div className="w-8 h-8 rounded-sm bg-white/10 animate-pulse"></div>
          <div className="w-8 h-8 rounded-sm bg-white/10 animate-pulse"></div>
          <div className="w-8 h-8 rounded-sm bg-white/10 animate-pulse"></div>
          <div className="w-8 h-8 rounded-sm bg-white/10 animate-pulse"></div>
          <div className="w-8 h-8 rounded-sm bg-white/10 animate-pulse"></div>
          <div className="w-8 h-8 rounded-sm bg-white/10 animate-pulse"></div>
          <div className="w-8 h-8 rounded-sm bg-white/10 animate-pulse"></div>
          <div className="w-8 h-8 rounded-sm bg-white/10 animate-pulse"></div>
        </div>
      </div> */}
      {/* Metadata */}
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
  ) : (
    <AdminLessonEditor lesson={lessonData} />
  );
};

{
  /* <TextStack rawLesson={rawLesson} moduleId={moduleId as string} /> */
}

ContentEditorPage.getLayout = (page: React.ReactNode) => (
  <AdminLayout pageTitle="Lesson Editor">{page}</AdminLayout>
);

export default ContentEditorPage;
