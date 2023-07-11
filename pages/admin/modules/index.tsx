import AdminLayout from "components/layouts/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "lib/store/store";
import { MixIcon } from "@radix-ui/react-icons";
import { useGetCourseStructure } from "hooks/course/useGetCourseStructure";
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
import { useState } from "react";

const ModulesPage = () => {
  const { data: courseStructureData, isFetching: courseStructureFetching } =
    useGetCourseStructure();

  const dispatch = useDispatch();

  const toggleContentSidebar = (hidden: boolean) => {
    dispatch(setAdminContentSidebarHidden(hidden));
  };

  const { adminContentSidebarHidden } = useSelector(
    (state: RootState) => state.interfaceControls
  );

  const [newModuleModalOpen, setNewModuleModalOpen] = useState(false);

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
      onClick: () => toggleContentSidebar(!adminContentSidebarHidden),
    },
    {
      title: "New Problem",
      description: "Create a new problem with a starter code template",
      illustration: <PracticeIllustration />,
      color: "amber",
      onClick: () => toggleContentSidebar(!adminContentSidebarHidden),
    },
  ];

  if (courseStructureFetching) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <FidgetSpinner className="w-10 h-10 animate-spin text-slate-800" />
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col text-slate-800">
      <AddModuleModal
        open={newModuleModalOpen}
        setOpen={setNewModuleModalOpen}
        moduleCount={courseStructureData?.modules.length || 0}
      />
      {/* <div className="min-h-[3rem] bg-nav-dark w-full"></div> */}
      <div className="w-full h-14 bg-white px-8 border border-b grid grid-cols-6 items-center">
        {/* Class Name */}
        <div className="flex items-center space-x-4 col-span-6">
          <div className="p-[2px] bg-gradient-to-b to-[#2458F2] from-[#648AE8] flex items-end justify-start rounded-[1px] outline outline-2 outline-blue-500/20 outline-offset-[2px]">
            <MixIcon className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-sm font-semibold font-dm text-slate-700">
            COP3530&nbsp;
            <span className="font-normal"> Data Structures and Algorithms</span>
          </h1>
        </div>
        {/* Search */}
        {/* <div className="rounded-md px-3 py-1 border bg-slate-100 flex items-center space-x-2 justify-start col-span-2">
          <MagnifyingGlassIcon className="w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-transparent outline-none text-slate-500 font-dm text-sm"
          />
        </div> */}
        {/* Profile Avatar */}
        {/*  <div className="w-full flex items-center justify-end col-span-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-amber-500 ">
            <p className="text-white text-sm font-dm">DK</p>
          </div>
        </div> */}
      </div>
      <div className="w-full h-full bg-slate-100 p-8 flex flex-col items-center justify-start xl:justify-center space-y-8 overflow-auto">
        {/* <h1 className="text-xl font-semibold font-dm">Courses</h1>
        <div className="w-96 rounded-md border bg-white p-6 flex flex-col space-y-2">
          <div className="w-12 h-12 rounded-sm !p-px bg-gradient-to-b from-[#648AE8] via-[#648AE8] to-[#2458F2] shadow-[#2458F2]/10 flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-b to-[#2458F2] from-[#648AE8] flex items-end p-1 justify-start rounded-[1px] outline outline-2 outline-blue-500/20 outline-offset-[3px]">
              <MixIcon className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex space-x-2 h-12">
            <div className="flex flex-col justify-center">
              <h1 className="text-lg font-semibold font-dm line-clamp-1">
                COP3530 Data Structures and Algorithms
              </h1>
              <p className="text-xs font-dm text-slate-500">Due: 10/10/2021</p>
            </div>
          </div>
        </div> */}
        <h3 className="text-5xl">👋</h3>
        <h1 className="text-xl font-semibold font-dm !mt-4">
          Welcome to your course!
        </h1>
        <p className="text-sm font-dm text-slate-500 !mt-3 max-w-3xl text-center">
          You can view and edit your course content + structure from the sidebar
          on the left, which you can toggle by clicking{" "}
          <span
            className="font-bold cursor-pointer hover:text-blue-400 text-blue-500"
            onClick={() => toggleContentSidebar(!adminContentSidebarHidden)}
          >
            here
          </span>
          . To create a new module, lesson, or problem, click one of the options
          below.
        </p>
        <div className="flex gap-4 flex-wrap w-full items-center justify-center">
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
      className="group cursor-pointer w-80 rounded-xl hover:border-slate-300 transition border bg-white p-5 flex flex-col space-y-2"
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
