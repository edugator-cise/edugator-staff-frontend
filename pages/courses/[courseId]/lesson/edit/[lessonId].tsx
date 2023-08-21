import React from "react";
import { useRouter } from "next/router";
import AdminLayout from "components/layouts/AdminLayout";
import { useGetLesson } from "hooks/lesson/useGetLesson";
import AdminLessonEditor from "components/lesson/admin/LessonEditor";
import { StudentLoadingState } from "pages/learn/[lessonId]";
import { useUserRole } from "hooks/user/useUserRole";

const ContentEditorPage = () => {
  const router = useRouter();
  const { lessonId } = router.query;
  const { role } = useUserRole();

  const {
    data: lessonData,
    isLoading: lessonLoading, //only for initial load
    isFetching: lessonFetching,
    isError: lessonError, // TODO add error handling and visual state
  } = useGetLesson({
    lessonId: lessonId as string,
  });

  if (role === "student") {
    return null;
  }

  return lessonFetching ? (
    <div className="w-full h-full">
      <div className="h-14 py-3 bg-nav-darkest w-full flex justify-between px-4 items-center">
        <div className="h-full w-48 rounded-md animate-pulse bg-nav-inactive-dark/50"></div>
        <div className="flex space-x-2 items-center h-full">
          <div className="w-24 h-8 rounded-md bg-nav-inactive-dark/50 animate-pulse"></div>
        </div>
      </div>
      <StudentLoadingState />
    </div>
  ) : (
    <AdminLessonEditor lesson={lessonData} />
  );
};

ContentEditorPage.getLayout = (page: React.ReactNode) => (
  <AdminLayout pageTitle="Lesson Editor">{page}</AdminLayout>
);

export default ContentEditorPage;
