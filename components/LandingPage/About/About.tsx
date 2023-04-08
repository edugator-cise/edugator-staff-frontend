import React from "react";
import { CornerDivider } from "../Dividers";
import ExpandArrow from "../ExpandArrow";
import BuildIllustration from "./Illustrations/BuildIllustration";
import LearnIllustration from "./Illustrations/LearnIllustration";
import PracticeIllustration from "./Illustrations/PracticeIllustration";
import { useState } from "react";
import { useAnimation, motion as m, AnimationControls } from "framer-motion";

const aboutData = [
  // {
  //   title: "Build",
  //   description:
  //     "Build your curriculum and set your students up for success with our interactive instruction portal.",
  //   illustration: <BuildIllustration />,
  // },
    {
    title: "Learn",
    description:
      "Learn the fundamentals of computer science with our interactive lessons and practice exercises.",
    illustration: <LearnIllustration />,
  },
  {
    title: "Code",
    description:
      "Code your solution to short programming concepts and receive immediate feedback.",
    illustration: <PracticeIllustration />,
  },
  {
    title: "Practice",
    description:
      "Practice what you've learned with course-specific exercises and technical interview style problems.",
    illustration: <BuildIllustration />,
  },
];

const ringVariants = (scale: number) => ({
  initial: {
    scale: 1,
    transition: {
      duration: 0.25,
      ease: "easeInOut",
    },
  },
  animate: {
    scale: scale,
    transition: {
      duration: scale * 0.2,
      ease: "easeInOut",
    },
  },
});

const RING_DURATIONS = [1, 1.2, 1.44, 1.728, 2.07, 2.49];
const RING_OPACITIES = [0.6, 0.5, 0.4, 0.3, 0.2, 0.1];
const COLORS = ["blue", "emerald", "amber"];

const Ring = ({
  color,
  duration,
  controls,
  opacity,
}: {
  color: string;
  duration: number;
  controls: AnimationControls;
  opacity: number;
}) => {
  return (
    <m.div
      variants={ringVariants(duration)}
      animate={controls}
      initial="initial"
      style={{
        opacity: opacity,
        filter: `blur(${duration * 0.4}px)`,
      }}
      className={`absolute rounded-full h-48 w-48 ring-1 ring-${color}-400 -bottom-24`}
    />
  );
};

const AboutSection = ({
  title,
  description,
  illustration,
  color,
}: {
  title: string;
  description: string;
  illustration: React.ReactNode;
  color: string;
}) => {
  const cursorControls = useAnimation();

  const animationIn = () => {
    cursorControls.start("animate");
  };

  const animationOut = () => {
    cursorControls.start("initial");
  };

  return (
    <li
      onMouseEnter={animationIn}
      onMouseLeave={animationOut}
      className="flex flex-col items-start group cursor-pointer"
    >
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
      <h3 className="font-ambit text-nav-darker text-xl font-semibold pt-4">
        {title}
      </h3>
      <p className="font-inter text-nav-darker/80 pt-2">{description}</p>
      {/* <button className=" flex items-center space-x-1 mt-4">
        <span className="font-dm text-nav-darkest font-bold">Learn More</span>
        <ExpandArrow />
      </button> */}
    </li>
  );
};

const About = () => {
  return (
    <div className="pb-48 pt-12 md:pt-28 bg-slate-50 relative" id="about">
      <div className="w-10 h-10 hidden sm:block absolute right-0 bottom-0 -scale-x-100">
        <CornerDivider fill={"#0C121C"} />
      </div>
      <div className="w-10 h-10 hidden sm:block absolute left-0 bottom-0 ">
        <CornerDivider fill={"#0C121C"} />
      </div>
      <div className="max-w-7xl relative mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center space-y-8">
        <div className="container flex pt-24 pb-4 flex-col">
          <div className="flex flex-col justify-center items-center">
            <span className="uppercase font-ambit text-sm text-blue-500 tracking-widest pb-4">
              Learning Reimagined
            </span>
            <h2
              className="font-ambit text-3xl font-semibold md:text-4xl lg:text-4xl 
                  !max-w-xl text-center pb-6 sm:max-w-xl md:max-w-3xl lg:max-w-4xl text-nav-darkest"
            >
              We manage your course content, so you can focus on learning.
            </h2>
            <p className="font-inter sm:max-w-xl md:max-w-3xl lg:max-w-4xl text-nav-darkest/80 text-center">
              We provide a platform for students to learn computing concepts.
              {/* instructors to build and manage their course content. */}
            </p>
          </div>
        </div>
        <ul className="lg:grid-cols-3 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {aboutData.map((item, index) => {
            return <AboutSection {...item} key={index} color={COLORS[index]} />;
          })}
        </ul>
      </div>
    </div>
  );
};

export default About;
