import { CourseModule } from "hooks/course/useGetCourseStructure";
import { useState } from "react";
import Modal from "./Modal";
import Link from "next/link";
import { PlusIcon } from "@radix-ui/react-icons";

export const AddProblemModal = ({
  open,
  setOpen,
  modules,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modules: CourseModule[];
}) => {
  const [selectedModule, setSelectedModule] = useState<string>(
    modules[0]?.id || ""
  ); // contains the id of the selected module

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title="Add Problem"
      description="Select a module to add your new problem to."
    >
      <div className="flex flex-col space-y-4">
        <select
          className="w-full py-2 text-base rounded-md border border-slate-300 bg-white text-slate-800 px-3 font-dm outline-none"
          value={selectedModule}
          onChange={(e) => setSelectedModule(e.target.value)}
        >
          <option value={undefined} disabled>
            Select a module
          </option>
          {modules.map((module) => (
            <option key={module.id} value={module.id}>
              {module.moduleName}
            </option>
          ))}
        </select>

        <div className="flex justify-end items-center">
          <Link
            href={`/admin/problem/create/${encodeURIComponent(
              selectedModule
            )}?moduleName=${encodeURIComponent(
              modules.find((module) => module.id === selectedModule)
                ?.moduleName || ""
            )}`}
          >
            <button
              className="px-4 py-2 rounded-md bg-emerald-500 hover:bg-emerald-600 text-white font-dm text-sm flex items-center space-x-2 disabled:bg-emerald-500/50 disabled:cursor-not-allowed transition"
              disabled={selectedModule === ""}
            >
              <PlusIcon />
              <p>Create Problem</p>
            </button>
          </Link>
        </div>
      </div>
    </Modal>
  );
};
