import AdminLayout from "components/layouts/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "lib/store/store";
import { MixIcon, PlusIcon } from "@radix-ui/react-icons";
import {
  CourseModule,
  useGetCourseStructure,
} from "hooks/course/useGetCourseStructure";
import { FidgetSpinner } from "tabler-icons-react";
import { useAnimation } from "framer-motion";
import LearnIllustration from "components/landing/About/Illustrations/LearnIllustration";
import {
  RING_DURATIONS,
  RING_OPACITIES,
  Ring,
} from "components/landing/About/About";
import PracticeIllustration from "components/landing/About/Illustrations/PracticeIllustration";
import BuildIllustration from "components/landing/About/Illustrations/BuildIllustration";
import { setAdminContentSidebarHidden } from "state/interfaceControls.slice";
import { AddModuleModal } from "components/navigation/AdminContentSidebar";
import { useEffect, useState } from "react";
import Link from "next/link";
import Modal from "components/shared/Modals/Modal";
import { HandWaving } from "phosphor-react";
import Image from "next/image";

/**
 * 
 * @param param0 <Modal
      open={open}
      setOpen={setOpen}
      title="Add Module"
      description="Enter a name for your new module."
    >
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          id="module-name"
          className="w-full py-2 text-base rounded-md border border-slate-300 bg-white text-slate-800 px-3 font-dm outline-none"
          placeholder="My new module"
          value={moduleName}
          onChange={(e) => setModuleName(e.target.value)}
        />

        <div className="flex justify-end items-center">
          <button
            className="px-4 py-2 rounded-md bg-emerald-500 hover:bg-emerald-600 text-white font-dm text-sm flex items-center space-x-2 disabled:bg-emerald-500/50 disabled:cursor-not-allowed transition"
            disabled={moduleName.length === 0 || loading}
            onClick={handleCreateModule}
          >
            {loading ? (
              <div className="bouncing-loader py-2">
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : (
              <>
                <PlusIcon />
                <p>Create Module</p>
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
 * @returns 
 */

// modal for adding a new lesson, will have a dropdown to select which module to add it to
// button should be enabled only if a module is selected and will link to lesson creation page when clicked
const AddLessonModal = ({
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
      title="Add Lesson"
      description="Select a module to add your new lesson to."
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

          {modules.map((module, index) => (
            <option key={module.id} value={module.id}>
              {module.moduleName}
            </option>
          ))}
        </select>

        <div className="flex justify-end items-center">
          <Link
            href={`/admin/lesson/create/${encodeURIComponent(
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
              <p>Create Lesson</p>
            </button>
          </Link>
        </div>
      </div>
    </Modal>
  );
};

// modal for adding a new problem, will have a dropdown to select which module to add it to
// button should be enabled only if a module is selected and will link to problem creation page when clicked

const AddProblemModal = ({
  open,
  setOpen,
  modules,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modules: CourseModule[];
}) => {
  const [selectedModule, setSelectedModule] = useState<string>(""); // contains the id of the selected module

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

const RosterPage = () => {
  const { data: courseStructureData, isFetching: courseStructureFetching } =
    useGetCourseStructure({
      admin: true,
    });

  const dispatch = useDispatch();

  const toggleContentSidebar = (hidden: boolean) => {
    dispatch(setAdminContentSidebarHidden(hidden));
  };

  const { adminContentSidebarHidden } = useSelector(
    (state: RootState) => state.interfaceControls
  );

  const { course } = useSelector((state: RootState) => state.course);

  useEffect(() => {
    console.log("course", course);
  }, [course]);

  const [newModuleModalOpen, setNewModuleModalOpen] = useState(false);
  const [newLessonModalOpen, setNewLessonModalOpen] = useState(false);
  const [newProblemModalOpen, setNewProblemModalOpen] = useState(false);

  const buttonData = [
    {
      title: "New Module",
      description: "Create a new module to organize your lessons and problems",
      illustration: <LearnIllustration />,
      color: "blue",
      onClick: () => setNewModuleModalOpen(true),
    },
    {
      title: "New Lesson",
      description:
        "Create an empty lesson with interactive content from scratch",
      illustration: <BuildIllustration />,
      color: "emerald",
      onClick: () => setNewLessonModalOpen(true),
    },
    {
      title: "New Problem",
      description: "Create a new problem with a starter code template",
      illustration: <PracticeIllustration />,
      color: "amber",
      onClick: () => setNewProblemModalOpen(true),
    },
  ];

  if (courseStructureFetching) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-100">
        <FidgetSpinner className="w-10 h-10 animate-spin text-slate-800" />
      </div>
    );
  }

  return (
    <div className="min-h-screen h-full w-full text-slate-800 bg-slate-100 ">
      <div className="w-full py-3 px-4 flex justify-between items-center bg-slate-50 border-b">
        <div />
        <div className="w-8 h-8 bg-gradient-to-b from-indigo-400 to-blue-400  shadow-md rounded-full"></div>
      </div>
      <div className="p-12 w-full h-full overflow-auto">
        <div className="w-full h-full max-w-7xl">
          <h1 className="text-3xl font-medium font-dm">Roster</h1>
          <p className="text-sm font-dm text-slate-600 leading-6 !mt-3 max-w-4xl text-left">
            Manage your course roster and view student progress.
          </p>
        </div>
        {/* <HandWaving size={48} className="text-blue-400" weight="duotone" /> */}
      </div>
    </div>
  );
};

RosterPage.getLayout = (page: React.ReactNode) => (
  <AdminLayout pageTitle="Roster">{page}</AdminLayout>
);

export default RosterPage;
