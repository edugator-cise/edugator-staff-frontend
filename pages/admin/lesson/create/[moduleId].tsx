import AdminLayout from "components/AdminLayout/AdminLayout";
import AdminLessonEditor from "components/lesson/admin/LessonEditor";

const ContentCreatePage = () => {
  return <AdminLessonEditor />;
};

ContentCreatePage.getLayout = (page: React.ReactNode) => (
  <AdminLayout pageTitle="Create Lesson">{page}</AdminLayout>
);

export default ContentCreatePage;
