import AdminLayout from "components/layouts/AdminLayout";
import AdminLessonEditor from "components/lesson/admin/LessonEditor";
import { useUserRole } from "hooks/user/useUserRole";

const ContentCreatePage = () => {
  const { role } = useUserRole();

  if (role === "student") {
    return null;
  }
  return <AdminLessonEditor />;
};

ContentCreatePage.getLayout = (page: React.ReactNode) => (
  <AdminLayout pageTitle="Create Lesson">{page}</AdminLayout>
);

export default ContentCreatePage;
