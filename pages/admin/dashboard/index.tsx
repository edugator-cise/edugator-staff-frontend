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
import { HandWaving, ListBullets, SquaresFour } from "phosphor-react";
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

const ModulesPage = () => {
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

  return (
    <div className="min-h-screen h-full w-full text-slate-800 bg-slate-100 ">
      <div className="w-full py-3 px-4 flex justify-between items-center bg-slate-50 border-b">
        <div />
        <div className="w-8 h-8 bg-gradient-to-b from-indigo-400 to-blue-400  shadow-md rounded-full"></div>
      </div>
      <div className="p-6 lg:p-12 w-full h-full overflow-auto">
        <AddModuleModal
          open={newModuleModalOpen}
          setOpen={setNewModuleModalOpen}
          moduleCount={courseStructureData?.modules.length || 0}
        />
        <AddLessonModal
          open={newLessonModalOpen}
          setOpen={setNewLessonModalOpen}
          modules={courseStructureData?.modules || []}
        />
        <AddProblemModal
          open={newProblemModalOpen}
          setOpen={setNewProblemModalOpen}
          modules={courseStructureData?.modules || []}
        />

        <div className="w-full h-full max-w-7xl">
          <div className="flex space-x-6 items-center">
            <div className="w-14 h-14 rounded-md bg-slate-300 ring-1 flex items-center justify-center ring-offset-1 ring-offset-slate-200 ring-slate-400/70 shadow-inner">
              <SquaresFour
                size={36}
                weight="duotone"
                className="text-slate-100"
              />
            </div>
            <div className="flex flex-col space-y-[2px] justify-center">
              <h1 className="text-[26px] font-medium font-dm">Dashboard</h1>
              <p className="font-dm text-slate-600 text-sm max-w-4xl text-left">
                Welcome to your course! Here you can manage your course content
                and view your students' progress.
              </p>
            </div>
          </div>
          <div className="w-full h-px bg-slate-200 mt-8" />
          <h1 className="text-xl font-medium font-dm !mt-8 mb-4">Actions</h1>
          {courseStructureFetching ? (
            <div className="w-full h-48 flex items-center justify-center bg-slate-100">
              <FidgetSpinner className="w-10 h-10 animate-spin text-slate-800" />
            </div>
          ) : courseStructureData?.modules?.length === 0 ? (
            <NewSection
              title="New Module"
              description="Create a new module to organize your lessons and problems"
              illustration={<LearnIllustration />}
              color="blue"
              onClick={() => setNewModuleModalOpen(true)}
            />
          ) : (
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {buttonData.map((button, index) => (
                <NewSection
                  key={index}
                  title={button.title}
                  description={button.description}
                  illustration={button.illustration}
                  color={button.color}
                  onClick={button.onClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const NewSection = ({
  title,
  description,
  illustration,
  color,
  onClick,
}: {
  title: string;
  description: string;
  illustration: React.ReactNode;
  color: string;
  onClick: () => void;
}) => {
  const cursorControls = useAnimation();

  const animationIn = () => {
    cursorControls.start("animate");
  };

  const animationOut = () => {
    cursorControls.start("initial");
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={animationIn}
      onMouseLeave={animationOut}
      className="group max-w-md cursor-pointer w-full rounded-xl hover:border-slate-300 transition border bg-white p-5 flex flex-col space-y-2"
    >
      <button className="flex flex-col items-start cursor-pointer space-y-4">
        <div
          style={{
            backgroundImage:
              "radial-gradient(50% 80% at 70% 10%, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 100%)",
          }}
          className={`w-full h-52 rounded-md flex items-center justify-center relative overflow-hidden group-hover:bg-${color}-100 duration-500 bg-slate-200 transition`}
        >
          {/* Glare */}
          <div className="w-full h-full absolute inset-0" />
          {/* Rings */}
          {RING_DURATIONS.map((duration, index) => (
            <Ring
              key={index}
              color={color}
              duration={duration}
              controls={cursorControls}
              opacity={RING_OPACITIES[index]}
            />
          ))}
          <div className="absolute left-1/2 -translate-x-1/2 top-10 group-hover:-translate-y-3 transition duration-500 w-full h-full">
            {illustration}
          </div>
        </div>
        <div className="flex flex-col space-y-1 items-start">
          <h1 className="text-lg font-semibold font-dm line-clamp-1">
            {title}
          </h1>
          <p className="text-sm font-dm text-left text-slate-500">
            {description}
          </p>
        </div>
      </button>
    </div>
  );
};

ModulesPage.getLayout = (page: React.ReactNode) => (
  <AdminLayout pageTitle="Modules">{page}</AdminLayout>
);

export default ModulesPage;
