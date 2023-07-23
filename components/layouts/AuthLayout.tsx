import ComponentTransition from "components/shared/ComponentTransition";
import React from "react";
import AdminHeader from "./AdminHeader";

const AuthLayout = ({
  children,
  key,
}: {
  children: React.ReactNode;
  key?: string;
}) => {
  return (
    <div className="w-screen overflow-hidden min-h-screen h-screen bg-nav-darkest flex flex-col">
      {/* Header */}
      <AdminHeader />
      <div className="h-full bg-nav-darkest flex items-start py-20 justify-center overflow-auto">
        <ComponentTransition key={key}>{children}</ComponentTransition>
      </div>
    </div>
  );
};

export default AuthLayout;
