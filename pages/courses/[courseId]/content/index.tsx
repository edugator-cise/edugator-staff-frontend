import AdminLayout from "components/layouts/AdminLayout";
import { useUserRole } from "hooks/user/useUserRole";
import { NextPage } from "next";
import { ListBullets } from "phosphor-react";
import React from "react";
import { motion as m } from "framer-motion";

const BlankContentPage = () => {
  const { role } = useUserRole();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      <m.div
        key={"content-page"}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-fit h-fit items-start justify-center flex flex-col space-y-4 bg-white/50 backdrop-blur-[2px] dark:bg-nav-darkest border dark:border-white/10 shadow-sm p-8 rounded-lg"
      >
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
      </m.div>
    </div>
  );
};

BlankContentPage.getLayout = (page: NextPage) => (
  <AdminLayout pageTitle="admin">{page}</AdminLayout>
);

export default BlankContentPage;
