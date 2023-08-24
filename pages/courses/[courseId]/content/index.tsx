import AdminLayout from "components/layouts/AdminLayout";
import { useUserRole } from "hooks/user/useUserRole";
import { NextPage } from "next";
import { ListBullets } from "phosphor-react";
import React from "react";

const BlankContentPage = () => {
  const { role } = useUserRole();

  return (
    <div className="w-full h-full flex flex-col relative dark:bg-transparent">
      {role === "teachingAssistant" || role === "instructor" ? (
        <div className="w-full h-16 min-h-[59px] max-h-[59px] bg-nav-dark dark:bg-nav-evendarker overflow-hidden flex items-center justify-between px-6 border-b border-b-white/10 z-10">
          <div className="flex items-end">
            <p className="text-base text-slate-400 font-dm"></p>
            <h1 className="text-white font-dm text-base"></h1>
          </div>
        </div>
      ) : null}
      <div className="w-full h-full items-center justify-center flex flex-col space-y-4">
        <div className="min-h-[3.5rem] min-w-[3.5rem] rounded-md ring-1 flex items-center justify-center ring-offset-1 bg-slate-300 ring-offset-slate-200 ring-slate-400/70 dark:bg-slate-700 dark:ring-offset-nav-evendarker dark:ring-slate-400/70 shadow-inner">
          <ListBullets
            size={36}
            weight="duotone"
            className="text-white dark:text-[#989ea8]"
          />
        </div>
        <h1 className="text-[26px] font-medium font-dm">Course Content</h1>
        <p className="opacity-60 font-dm text-sm !mt-2">
          Select a lesson or problem from the left sidebar to get started.
        </p>
      </div>
    </div>
  );
};

BlankContentPage.getLayout = (page: NextPage) => (
  <AdminLayout pageTitle="admin">{page}</AdminLayout>
);

export default BlankContentPage;
