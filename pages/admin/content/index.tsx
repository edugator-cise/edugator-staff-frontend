import AdminLayout from "components/layouts/AdminLayout";
import ActionButton from "components/shared/Buttons/ActionButton";
import { NextPage } from "next";
import { ListBullets, FileCode, FileText } from "phosphor-react";
import React from "react";

const BlankContentPage = () => {
  return (
    <div className="w-full h-full flex flex-col relative bg-slate-100">
      <div
        className="w-full 
      h-16 min-h-[3.5rem] max-h-[3.5rem] !bg-nav-dark overflow-hidden flex items-center justify-between px-6 border-b border-b-slate-950 z-10"
      >
        <div className="flex items-end">
          <p className="text-base text-slate-400 font-dm"></p>
          <h1 className="text-white font-dm text-base"></h1>
        </div>
      </div>
      <div className="w-full h-full items-center justify-center flex flex-col space-y-4">
        <div className=" min-w-[3.5rem] rounded-md bg-slate-300 ring-1 flex items-center justify-center ring-offset-1 ring-offset-slate-200 ring-slate-400/70 shadow-inner">
          <ListBullets size={36} weight="duotone" className="text-slate-100" />
        </div>
        <h1 className="text-[26px] font-medium font-dm">Course Content</h1>
        <p className="text-slate-500 font-dm text-sm !mt-2">
          Select a lesson or problem from the left sidebar to get started.
        </p>
        {/*  <div className="flex space-x-2 items-center">
          <ActionButton
            color="purple"
            className="text-sm font-dm px-4 flex flex-col !items-start !space-x-0 space-y-1 !pt-16"
            containerClassName="w-fit"
          >
            <FileText size={18} weight="duotone" />
            <span>Add Lesson</span>
          </ActionButton>
          <ActionButton
            color="blue"
            className="text-sm font-dm px-4 flex flex-col !items-start !space-x-0 space-y-1 !pt-16"
            containerClassName="w-fit"
          >
            <FileCode size={18} weight="duotone" />
            <span>Add Coding Question</span>
          </ActionButton>
        </div> */}
      </div>
    </div>
  );
};

BlankContentPage.getLayout = (page: NextPage) => (
  <AdminLayout pageTitle="admin">{page}</AdminLayout>
);

export default BlankContentPage;