import AdminLayout from "components/layouts/AdminLayout";
import React from "react";

// dashboard for students and instructor.
// accessible only if authenticated and has active session.
// all info dependent on permissions in organization is fetched in client hook

const DashboardPage = () => {
  return <div>This is the dashboard for both students and instructors</div>;
};

DashboardPage.getLayout = (page: React.ReactNode) => {
  // todo rename AdminLayout
  return <AdminLayout pageTitle="dashboard">{page}</AdminLayout>;
};

export default DashboardPage;
