import React from "react";
import { useRouter } from "next/router";
import AdminLayout from "components/layouts/AdminLayout";
import { useGetCourseStructure } from "hooks/course/useGetCourseStructure";
import { FidgetSpinner } from "tabler-icons-react";
import { useAnimation } from "framer-motion";
import LearnIllustration from "components/landing/About/Illustrations/LearnIllustration";
import PracticeIllustration from "components/landing/About/Illustrations/PracticeIllustration";
import BuildIllustration from "components/landing/About/Illustrations/BuildIllustration";
import { AddModuleModal } from "components/navigation/AdminContentSidebar";
import { useState } from "react";
import { ChalkboardTeacher, Code, ListBullets } from "phosphor-react";
import Image from "next/image";
import { AddProblemModal } from "components/shared/Modals/AddProblemModal";
import { AddLessonModal } from "components/shared/Modals/AddLessonModal";
import { useGetCourse } from "hooks/course/useGetCourse";
import { usePalette } from "react-palette";
import CoverImage from "components/course/home/CoverImage";
import { placeholderAvatar } from "constants/coverImageData";
import { Button } from "@/components/ui/button";
import { Users2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import SuperEllipse from "react-superellipse";

// if course does not exist, or user does not have permission to access the courseId,
// we will redirect them elsewhere or return a 404 (preferably the latter)

const CourseHome = () => {
  const router = useRouter();
  const { courseId } = router.query;

  const { data: courseData, isFetching: courseDataFetching } = useGetCourse();

  const {
    data: colors,
    loading: colorLoading,
    error: colorError,
  } = usePalette(courseData ? courseData?.logo : "");

  const primaryColor = colors.vibrant;

  const { data: courseStructureData, isFetching: courseStructureFetching } =
    useGetCourseStructure({
      courseId: courseId as string,
      admin: true,
    });

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
    <div className="min-h-screen h-1 w-full bg-white dark:bg-nav-evendarker overflow-auto">
      <div className="w-full p-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <SuperEllipse
              p1={7}
              p2={30}
              className="min-w-[72px] min-h-[72px] bg-white dark:bg-nav-darkest flex items-center justify-center drop-shadow-2xl"
            >
              <SuperEllipse
                p1={5}
                p2={32}
                className="min-w-[68px] min-h-[68px]"
              >
                <Image
                  layout="fill"
                  objectFit="cover"
                  src={courseData?.logo || placeholderAvatar}
                  alt="User profile picture"
                  className="rounded-xl"
                />
                {/* children */}
              </SuperEllipse>
            </SuperEllipse>
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl font-medium font-sans">
                {courseData?.courseName}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {courseData?.instructors ? (
              courseData.instructors.map((instructor) => (
                <div className="flex flex-row items-center space-x-2">
                  <div className="w-8 h-8 rounded-full">
                    <Image
                      src={instructor?.image || placeholderAvatar}
                      width={32}
                      height={32}
                      objectFit="cover"
                      className="rounded-full"
                    />
                  </div>
                  <p className="text-sm font-medium font-sans">
                    {instructor?.name}
                  </p>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <Separator className=" mx-auto" />

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
      {/* <CoverImage
        courseData={courseData}
        colorLoading={colorLoading}
        colorError={colorError}
        primaryColor={primaryColor}
      /> */}

      <div className="pb-8 p-8 pt-10 w-full">
        <div className="w-full h-full max-w-7xl mx-auto relative">
          {/* Course Logo */}

          <h1 className="text-xl font-medium font-dm mb-4">Actions</h1>
          <div className="w-full p-4 rounded-md bg-gray-100 relative dark:bg-nav-darkest border dark:border-slate-900">
            <div
              style={{
                WebkitMaskImage:
                  "linear-gradient(175deg, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%)",
                backgroundImage:
                  "radial-gradient(#79a1f940 1px, transparent 0)",
                backgroundSize: "30px 30px",
                backgroundPosition: "-7px -7px",
              }}
              className="w-full h-full absolute inset-0 z-0"
            ></div>
            {courseStructureFetching ? (
              <div className="w-full h-[169px] flex items-center gap-3">
                <Skeleton className="w-full h-full" />
                <Skeleton className="w-full h-full" />
                <Skeleton className="w-full h-full" />
              </div>
            ) : courseStructureData?.modules?.length === 0 ? (
              <NewSection
                primaryColor={primaryColor}
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
                    primaryColor={primaryColor}
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
    </div>
  );
};

const NewSection = ({
  primaryColor,
  title,
  description,
  illustration,
  color,
  onClick,
}: {
  primaryColor: string | undefined;
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
      style={{
        backdropFilter: "blur(2px)",
      }}
      className="group hover:shadow-md z-10 hover:shadow-black/5 hover:-translate-y-1 max-w-md cursor-pointer w-full rounded-sm hover:border-slate-300 dark:hover:border-slate-700 transition border dark:border-slate-800/80 bg-white dark:bg-nav-evendarker/40 p-5 flex flex-col space-y-2"
    >
      <button className="flex flex-col items-start cursor-pointer space-y-4">
        <div
          className={`p-2 rounded-md flex items-center justify-center ring-1 shadow-inner dark:!ring-offset-nav-darkest`}
          style={
            {
              backgroundColor: `${primaryColor}4D` || "#3b82f6",
              "--tw-ring-color": `${primaryColor}80`,
              "--tw-ring-offset-color": `#ffffffB3`,
              "--tw-ring-offset-width": "1px",
            } as React.CSSProperties
          }
        >
          {title === "New Module" && (
            <ListBullets
              style={{
                color: "white",
              }}
              className="h-6 w-6"
            />
          )}
          {title === "New Lesson" && (
            <ChalkboardTeacher
              style={{
                color: "white",
              }}
              className="h-6 w-6"
            />
          )}
          {title === "New Problem" && (
            <Code
              style={{
                color: "white",
              }}
              className="h-6 w-6"
            />
          )}
        </div>
        <div className="flex flex-col space-y-1 items-start">
          <h1 className="text-lg font-semibold font-dm line-clamp-1">
            {title}
          </h1>
          <p className="text-[13px] text-left font-sans opacity-70">
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
