import React, { useState } from "react";
import { sampleProblems } from "./data/sampleProblems";
import { FeatureGraphicWrapper, FeatureWrapper } from "./Students";
import {
  AnimatePresence,
  motion as m,
  useAnimation,
  Variants,
} from "framer-motion";
import {
  Plus,
  PlusCircle,
  Smiley,
  SmileyWink,
  SmileyXEyes,
  TextHOne,
  TextUnderline,
} from "phosphor-react";
import {
  CheckboxIcon,
  FontStyleIcon,
  ImageIcon,
  InputIcon,
  VideoIcon,
} from "@radix-ui/react-icons";

const Instructors = () => {
  return (
    <section className="pb-24 bg-nav-darkest">
      <div className="max-w-7xl relative mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="w-full flex pt-24 flex-col">
          <div className="flex flex-col justify-center">
            <span className="uppercase font-ambit text-sm text-emerald-500 tracking-widest pb-4">
              FOR INSTRUCTORS
            </span>
            <h2
              className="font-ambit text-white text-3xl font-semibold md:text-4xl lg:text-4xl 
                  !max-w-xl pb-6 sm:max-w-xl md:max-w-3xl lg:max-w-4xl"
            >
              Set your students up for success
            </h2>
            <p className="font-inter text-white/80 sm:max-w-xl md:max-w-3xl lg:max-w-4xl">
              Build and distribute lessons and exercises to your students.
            </p>
          </div>
        </div>
        <ul className="lg:grid-cols-3 grid grid-cols-1 gap-4 pt-16 sm:grid-cols-2">
          <AuthoringToolsFeature />
          <ProblemBanksFeature />
          <ManageTeamsFeature />
          <CourseAnalyticsFeature />
          <SSOSupportFeature />
          <PlaigarismCheckFeature />
        </ul>
      </div>
    </section>
  );
};

const AuthoringToolsFeature = () => {
  const [isHovered, setIsHovered] = useState(false);
  const containerControls = useAnimation();
  const itemControls = useAnimation();

  const animationIn = () => {
    setIsHovered(true);
    containerControls.start("animate");
    itemControls.start("animate");
  };

  const animationOut = () => {
    setIsHovered(false);
    containerControls.start("initial");
    itemControls.start("initial");
  };

  const containerVariants = {
    initial: {
      y: 5,
    },
    animate: {
      y: 70,
      transition: {
        duration: 0.3,
      },
    },
  };

  const featureIcons = [
    <InputIcon />,
    <VideoIcon />,
    <FontStyleIcon />,
    <ImageIcon />,
    <CheckboxIcon />,
  ];

  const itemTransitionValues = [
    // x start, x end, y start, y end, delay
    ["-100%", "-360%", 40, -20, 0.1],
    ["-50%", "-215%", 40, -45, 0.05],
    ["-50%", "-50%", 40, -50, 0.1],
    ["-50%", "115%", 40, -45, 0.05],
    ["0%", "260%", 40, -20, 0.15],
  ];

  const itemVariants = (index: number) => ({
    initial: {
      opacity: 0,
      x: itemTransitionValues[index][0],
      y: itemTransitionValues[index][2],
      transition: {
        duration: 0.3,
        delay: 0,
      },
    },
    animate: {
      opacity: 1,
      x: itemTransitionValues[index][1],
      y: itemTransitionValues[index][3],
      transition: {
        duration: 0.3,
        delay: itemTransitionValues[index][4],
      },
    },
  });

  return (
    <FeatureWrapper
      title="Authoring Tools"
      description="Write your lessons and exercises in markdown and publish them to your students"
      onMouseEnter={animationIn}
      onMouseLeave={animationOut}
    >
      {/* <div className="w-full h-48 bg-slate-200 rounded-md flex items-center justify-start"></div> */}
      <FeatureGraphicWrapper className="flex flex-col items-center justify-center h-36 w-full">
        <m.div
          variants={containerVariants}
          animate={containerControls}
          initial="initial"
          style={{
            background:
              "radial-gradient(50% 80% at 70% 10%, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%), #192233",
          }}
          className="w-44 h-full rounded-md border-t border-x border-slate-500/10 p-3 flex flex-col z-10"
        >
          <div className="flex flex-col space-y-1 items-start">
            <p className="text-xs text-slate-400 font-dm">
              Introduction to Algorithms
            </p>
            {/* Blinking Cursor */}
            <div className="w-[2px] h-3 bg-slate-400 rounded-full animate-pulse"></div>
          </div>
        </m.div>
        {/* Features */}
        {featureIcons.map((feature, index) => {
          //@ts-ignore
          const variants: Variants = itemVariants(index);
          return (
            <m.div
              variants={variants}
              animate={itemControls}
              initial="initial"
              style={{
                background:
                  "radial-gradient(50% 80% at 70% 10%, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%), #192233",
              }}
              className="absolute left-1/2 text-slate-400 transition hover:text-white -translate-x-1/2 w-10 h-10 flex items-center justify-center border border-slate-500/10 rounded-full"
            >
              {feature}
            </m.div>
          );
        })}
      </FeatureGraphicWrapper>
    </FeatureWrapper>
  );
};

const ProblemBanksFeature = () => {
  return (
    <FeatureWrapper
      title="Problem Banks"
      description="Select from an expansive library of previously authored problems"
      className="group overflow-hidden"
    >
      <div className="h-36"></div>
      <FeatureGraphicWrapper className="absolute top-0 left-0 flex flex-col items-center justify-center h-44 w-full">
        <div className="flex w-full h-full relative items-center justify-center">
          <div className="grid h-full animate-skew-scroll gap-4 grid-cols-3">
            {sampleProblems.map((problem, index) => {
              const difficultyClass = {
                Easy: "bg-green-100 text-green-800",
                Medium: "bg-yellow-100 text-yellow-800",
                Hard: "bg-red-100 text-red-800",
              }[problem.difficulty];

              return (
                <div
                  key={index}
                  style={{
                    background:
                      "radial-gradient(50% 80% at 70% 10%, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%), #192233",
                  }}
                  className="cursor-default rounded-md border border-slate-500/20 p-3 shadow-md transition-all hover:translate-x-1 hover:-translate-y-1 hover:scale-[1.025] hover:shadow-xl"
                >
                  <p className="mb-3 text-xs text-slate-400 font-dm">
                    {problem.title}
                  </p>
                  <div className="flex justify-start space-x-2">
                    <span
                      className={`font-dm rounded-full bg-green-100 px-2 text-xs font-medium text-green-800 ${difficultyClass}`}
                    >
                      {problem.difficulty}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </FeatureGraphicWrapper>
    </FeatureWrapper>
  );
};

const ManageTeamsFeature = () => {
  const [isHovered, setIsHovered] = useState(false);
  const addButtonControls = useAnimation();

  const listItemVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.3,
      },
    },
  };

  const addButtonVariants = {
    initial: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        delay: 0.4,
      },
    },
    animate: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {},
    },
  };

  const animationIn = () => {
    setIsHovered(true);
    addButtonControls.start("animate");
  };

  const animationOut = () => {
    setIsHovered(false);
    addButtonControls.start("initial");
  };

  return (
    <FeatureWrapper
      title="Manage Teams"
      description="Manage your students and teaching assistant permissions"
      onMouseEnter={animationIn}
      onMouseLeave={animationOut}
    >
      <FeatureGraphicWrapper className="flex flex-col items-center justify-center h-36 w-full">
        <m.div
          layout
          className="flex flex-col items-center justify-start space-y-2 h-full w-full"
        >
          <m.div layout className="w-full flex items-center space-x-2">
            <Smiley size={30} weight="fill" className="text-slate-500/90" />
            <div
              style={{
                background:
                  "radial-gradient(50% 80% at 60% 20%, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%), #192233",
              }}
              className="text-xs font-dm py-2 px-3 w-full bg-slate-500/10 rounded-md flex justify-between items-center"
            >
              <p className="text-slate-400">Amanpreet Kapoor</p>
              <p className="text-blue-500">Instructor</p>
            </div>
          </m.div>
          <m.div layout className="w-full flex items-center space-x-2">
            <SmileyXEyes
              size={30}
              weight="fill"
              className="text-slate-500/90"
            />
            <div
              style={{
                background:
                  "radial-gradient(50% 80% at 60% 20%, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%), #192233",
              }}
              className="text-xs font-dm py-2 px-3 w-full bg-slate-500/10 rounded-md flex justify-between items-center"
            >
              <p className="text-slate-400">Marc Diaz</p>
              <p className="text-slate-500">Admin</p>
            </div>
          </m.div>

          <AnimatePresence exitBeforeEnter>
            {isHovered ? (
              <m.div
                layout
                layoutId="list-item"
                variants={listItemVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full flex items-center space-x-2"
              >
                <SmileyWink
                  size={30}
                  weight="fill"
                  className="text-slate-500/90"
                />
                <div
                  style={{
                    background:
                      "radial-gradient(50% 80% at 60% 20%, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%), #192233",
                  }}
                  className="text-xs font-dm py-2 px-3 w-full bg-slate-500/10 rounded-md flex justify-between items-center z-10"
                >
                  <p className="text-slate-400">Dustin Karp</p>
                  <p className="text-slate-500">Admin</p>
                </div>
              </m.div>
            ) : null}
          </AnimatePresence>
          <m.div
            layoutId="add-button"
            variants={addButtonVariants}
            initial="initial"
            animate={addButtonControls}
            layout
            className="w-full flex items-center justify-center space-x-0"
          >
            <Plus size={16} weight="fill" className="text-slate-500/90" />
            <p className="text-xs text-center text-slate-300 font-dm py-2 px-3 rounded-md">
              Add Team Member
            </p>
          </m.div>
        </m.div>
      </FeatureGraphicWrapper>
    </FeatureWrapper>
  );
};

const CourseAnalyticsFeature = () => {
  return (
    <FeatureWrapper
      title="Course Analytics"
      description="Track your students' progress and performance"
    >
      <ComingSoonBadge />
    </FeatureWrapper>
  );
};

const SSOSupportFeature = () => {
  return (
    <FeatureWrapper
      title="LTI / SSO Support"
      description="Integrate with your school's LMS"
    >
      <ComingSoonBadge />
    </FeatureWrapper>
  );
};

const PlaigarismCheckFeature = () => {
  return (
    <FeatureWrapper
      title="Plagiarism Check"
      description="Check your students' work for plagiarism"
    >
      <ComingSoonBadge />
    </FeatureWrapper>
  );
};

const ComingSoonBadge = () => {
  return (
    <div className="absolute top-0 right-0 bg-gradient-to-br from-blue-500 to-emerald-500 text-white font-dm text-sm px-3 py-2 rounded-bl-md rounded-tr-md">
      Coming Soon
    </div>
  );
};

export default Instructors;
