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

// if course does not exist, or user does not have permission to access the courseId,
// we will redirect them elsewhere or return a 404 (preferably the latter)

const CourseHome = () => {
  const router = useRouter();
  const { courseId } = router.query;

  const { data: courseData, isFetching: courseDataFetching } = useGetCourse({
    courseId: courseId as string,
  });

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
    <div className="min-h-screen h-full w-full text-slate-800 bg-gray-100">
      <CoverImage
        courseData={courseData}
        colorLoading={colorLoading}
        colorError={colorError}
        primaryColor={primaryColor}
      />

      <div className="p-8 pt-10 w-full h-full overflow-auto">
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
        <div className="w-full h-full max-w-7xl relative">
          {/* Course Logo */}

          {courseStructureFetching ? (
            <div className="flex space-x-6 items-center">
              {/* <div className="w-14 h-14 min-w-[3.5rem] animate-pulse rounded-md bg-slate-300 ring-1 flex items-center justify-center ring-offset-1 ring-offset-white ring-slate-400/70 shadow-inner">
                <SquaresFour
                  size={36}
                  weight="duotone"
                  className="text-slate-100"
                />
              </div> */}
              <div className="w-80 h-[39px] bg-slate-300 rounded-md animate-pulse"></div>
            </div>
          ) : (
            <div className="flex space-x-6 items-center">
              {/* <div className="w-14 h-14 min-w-[3.5rem] group relative rounded-md overflow-hidden ring-offset-1 ring-offset-white ring-slate-400/70 shadow-inner ring-1">
                <div className="absolute inset-0 w-full h-full bg-slate-300 flex items-center justify-center transition">
                  <SquaresFour
                    size={36}
                    weight="duotone"
                    className="text-slate-100"
                  />
                </div>
              </div> */}
              <div className="flex flex-row justify-between w-full">
                <div className="flex flex-col space-y-4 justify-center">
                  <h1 className="text-3xl font-medium text-slate-800 font-sans">
                    {courseData?.courseName}
                  </h1>
                  <p className="text-sm text-gray-600 font-sans">
                    {courseData?.description}
                  </p>
                  <div className="w-full h-px bg-gray-200"></div>
                  {/* Attributes Section */}
                  <div className="flex space-x-4">
                    {courseData?.instructors?.map((instructor) => (
                      <div className="flex space-x-2 items-center">
                        <div
                          className="min-w-[2rem] min-h-[2rem] rounded-full relative transition ring-1 ring-white shadow-md"
                          style={{
                            backgroundColor:
                              colorLoading || colorError
                                ? "#000"
                                : primaryColor,
                          }}
                        >
                          <Image
                            src={instructor.image || placeholderAvatar}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-full"
                          />
                        </div>
                        <div className="flex flex-col space-y-0">
                          <p className="text-sm text-gray-800 font-sans">
                            {instructor.name}
                          </p>
                          <p className="text-xs text-gray-500 font-sans">
                            Instructor
                          </p>
                        </div>
                      </div>
                    ))}
                    <div className="w-px h-8 bg-gray-200"></div>
                  </div>
                </div>
                {/* Right Side */}
                <div className="flex space-x-2 items-center"></div>
              </div>
            </div>
          )}
          <div className="w-full h-px bg-slate-200 mt-8" />
          <h1 className="text-xl font-medium font-dm !mt-8 mb-4">Actions</h1>
          <div className="w-full p-4 rounded-md bg-gray-200 border border-gray-300">
            {courseStructureFetching ? (
              <div className="w-full h-48 flex items-center justify-center bg-slate-100">
                <FidgetSpinner className="w-10 h-10 animate-spin text-slate-800" />
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
        C
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
      className="group hover:shadow-md hover:shadow-black/5 hover:-translate-y-1 max-w-md cursor-pointer w-full rounded-xl hover:border-slate-300 transition border bg-white p-5 flex flex-col space-y-2"
    >
      <button className="flex flex-col items-start cursor-pointer space-y-4">
        <div
          className="p-2 rounded-md flex items-center justify-center bg-opacity-20"
          style={{
            backgroundColor: `${primaryColor}33` || "#3b82f6",
          }}
        >
          {title === "New Module" && (
            <ListBullets
              style={{
                color: primaryColor || "#3b82f6",
              }}
              className="h-6 w-6"
            />
          )}
          {title === "New Lesson" && (
            <ChalkboardTeacher
              style={{
                color: primaryColor || "#3b82f6",
              }}
              className="h-6 w-6"
            />
          )}
          {title === "New Problem" && (
            <Code
              style={{
                color: primaryColor || "#3b82f6",
              }}
              className="h-6 w-6"
            />
          )}
        </div>
        <div className="flex flex-col space-y-1 items-start">
          <h1 className="text-lg font-semibold font-dm line-clamp-1">
            {title}
          </h1>
          <p className="text-[13px] text-left text-slate-500 font-sans">
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
