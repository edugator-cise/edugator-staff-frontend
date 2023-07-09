import AdminLayout from "components/AdminLayout/AdminLayout";
import AdminProblemEditor from "components/problem/admin/ProblemEditor";

const ProblemCreatePage = () => {
  return <AdminProblemEditor />;
};

ProblemCreatePage.getLayout = (page: React.ReactNode) => (
  <AdminLayout pageTitle="Problem Editor">{page}</AdminLayout>
);

export default ProblemCreatePage;
