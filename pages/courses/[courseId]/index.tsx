import React from "react";
import { useRouter } from "next/router";
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
import {
  ChalkboardTeacher,
  Code,
  ListBullets,
  SquaresFour,
} from "phosphor-react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { NextRoutes } from "constants/navigationRoutes";
import CustomUserButton from "components/navigation/CustomUserButton";
import { AddProblemModal } from "components/shared/Modals/AddProblemModal";
import { AddLessonModal } from "components/shared/Modals/AddLessonModal";

// if course does not exist, or user does not have permission to access the courseId,
// we will redirect them elsewhere or return a 404 (preferably the latter)

const CourseHome = () => {
  const router = useRouter();
  const { courseId } = router.query;

  console.log("COURSEID", courseId);

  const { data: courseStructureData, isFetching: courseStructureFetching } =
    useGetCourseStructure({
      courseId: courseId as string,
      admin: true,
    });

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
      <div className="w-full h-[3.5rem] py-3 px-4 flex justify-between items-center ">
        <div />
        <div className="flex space-x-2">
          <div className="w-8 h-8 rounded-full">
            <CustomUserButton />
          </div>
          <div className="w-8 h-8 rounded-full">
            <UserButton afterSignOutUrl={NextRoutes.SignIn} />
          </div>
        </div>
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
          {courseStructureFetching ? (
            <div className="flex space-x-6 items-center">
              <div className="w-14 h-14 min-w-[3.5rem] animate-pulse rounded-md bg-slate-300 ring-1 flex items-center justify-center ring-offset-1 ring-offset-slate-200 ring-slate-400/70 shadow-inner">
                <SquaresFour
                  size={36}
                  weight="duotone"
                  className="text-slate-100"
                />
              </div>
              <div className="w-80 h-[39px] bg-slate-300 rounded-md animate-pulse"></div>
            </div>
          ) : (
            <div className="flex space-x-6 items-center">
              <div className="w-14 h-14 min-w-[3.5rem] group relative rounded-md overflow-hidden ring-offset-1 ring-offset-slate-200 ring-slate-400/70 shadow-inner ring-1">
                <Image
                  src={course?.logo || "/images/placeholder.png"}
                  width={56}
                  height={56}
                  objectFit="cover"
                  className="rounded-md"
                />
                <div className="absolute inset-0 w-full h-full bg-slate-300 flex items-center justify-center opacity-0 group-hover:opacity-80 transition">
                  <SquaresFour
                    size={36}
                    weight="duotone"
                    className="text-slate-100"
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-[2px] justify-center">
                <h1 className="text-[26px] font-medium font-dm">
                  Home - {courseStructureData?.courseName}
                </h1>
                <p className="font-dm text-slate-600 text-sm max-w-4xl text-left">
                  Welcome to your course! Here you can manage your course
                  content and view your students' progress.
                </p>
              </div>
            </div>
          )}
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
      className="group hover:shadow-md hover:shadow-black/5 hover:-translate-y-1 max-w-md cursor-pointer w-full rounded-xl hover:border-slate-300 transition border bg-white p-5 flex flex-col space-y-2"
    >
      <button className="flex flex-col items-start cursor-pointer space-y-4">
        {/* <div
          style={{
            backgroundImage:
              "radial-gradient(50% 80% at 70% 10%, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 100%)",
          }}
          className={`w-full h-52 rounded-md flex items-center justify-center relative overflow-hidden group-hover:bg-${color}-100 duration-500 bg-slate-200 transition`}
        >
          <div className="w-full h-full absolute inset-0" />
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
        </div> */}
        {title === "New Module" && (
          <ListBullets className="text-blue-400 h-8 w-8" />
        )}
        {title === "New Lesson" && (
          <ChalkboardTeacher className="text-blue-400 h-8 w-8" />
        )}
        {title === "New Problem" && <Code className="text-blue-400 h-8 w-8" />}
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

CourseHome.getLayout = (page: React.ReactNode) => {
  return <AdminLayout pageTitle="Course Home">{page}</AdminLayout>;
};

export default CourseHome;
