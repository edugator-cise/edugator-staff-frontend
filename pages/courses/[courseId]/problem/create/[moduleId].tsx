import AdminLayout from "components/layouts/AdminLayout";
import AdminProblemEditor from "components/problem/admin/ProblemEditor";
import { useUserRole } from "hooks/user/useUserRole";

const ProblemCreatePage = () => {
  const { role } = useUserRole();

  if (role === "student") {
    return null;
  }
  return <AdminProblemEditor />;
};

ProblemCreatePage.getLayout = (page: React.ReactNode) => (
  <AdminLayout pageTitle="Problem Editor">{page}</AdminLayout>
);

export default ProblemCreatePage;
