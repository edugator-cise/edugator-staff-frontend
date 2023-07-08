import AdminLayout from "components/AdminLayout/AdminLayout";
import AdminLessonEditor from "components/LessonEditor/LessonEditor";

const ContentCreatePage = () => {
  return <AdminLessonEditor />;
};

ContentCreatePage.getLayout = (page: React.ReactNode) => (
  <AdminLayout pageTitle="Create Lesson">{page}</AdminLayout>
);

export default ContentCreatePage;
