import React, { useState, useRef } from "react";
import { useAnimation, motion as m } from "framer-motion";
import Tilt from "react-parallax-tilt";
import Lottie from "lottie-react";
import { Code, Bookmark } from "phosphor-react";
import connectionAnimation from "./data/connectionAnimation.json";
import { DesktopIcon, LaptopIcon } from "@radix-ui/react-icons";
import { CornerDivider } from "./Dividers";

const Students = () => {
  return (
    <section className="pb-24 pt-12 md:pt-28 bg-nav-darkest relative px-4">
      <div className="absolute top-0 left-1/2 w-[901px] h-[901px] opacity-40 -scale-x-100 -scale-y-100">
        <img
          src="/images/HeroGradient.png"
          alt="section gradient"
          aria-hidden
        />
      </div>
      <div className="absolute top-[48rem] right-1/2 w-[901px] h-[901px] opacity-40 -scale-y-100 -scale-x-100">
        <img
          src="/images/HeroGradient.png"
          alt="section gradient"
          aria-hidden
        />
      </div>
      {/* <div className="w-10 h-10 absolute left-0 top-0 -scale-y-100">
        <CornerDivider fill={"#F8FAFC"} />
      </div>
      <div className="w-10 h-10 absolute right-0 top-0 -scale-x-100 -scale-y-100">
        <CornerDivider fill={"#F8FAFC"} />
      </div> */}
      <div className="max-w-7xl relative mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="w-full flex pt-24 flex-col">
          <div className="flex flex-col justify-center">
            <span className="uppercase font-ambit text-sm text-blue-500 tracking-widest pb-4">
              FOR STUDENTS
            </span>
            <h2
              className="font-ambit text-white text-3xl font-semibold md:text-4xl lg:text-4xl 
                  !max-w-xl pb-6 sm:max-w-xl md:max-w-3xl lg:max-w-4xl"
            >
              Progress through your journey in computer science
            </h2>
            <p className="font-inter text-white/80 sm:max-w-xl md:max-w-3xl lg:max-w-4xl">
              Learn the fundamentals of computer science through a library of
              interactive lessons and practice exercises.
            </p>
          </div>
        </div>
        <ul className="lg:grid-cols-3 grid grid-cols-1 gap-4 pt-16 sm:grid-cols-2">
          <MobileFriendlyFeature />
          <OfflineDeliveryFeature />
          <MultiLanguageFeature />
          <InteractiveContentFeature />
          <IntellisenseFeature />
          <ProgressiveLearningFeature />
        </ul>
      </div>
    </section>
  );
};

export const FeatureMaskStyles = {
  WebkitMaskImage:
    "linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
  backgroundImage: "radial-gradient(#79a1f94c 1px, transparent 0)",
  backgroundSize: "30px 30px",
  backgroundPosition: "-10px -10px",
};

export const FeatureGraphicWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      style={{
        WebkitMaskImage:
          "linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
        backgroundImage: "radial-gradient(#79a1f940 1px, transparent 0)",
        backgroundSize: "30px 30px",
        backgroundPosition: "-10px -10px",
      }}
      className={className}
    >
      {children}
    </div>
  );
};

export const FeatureWrapper = ({
  children,
  title,
  description,
  onMouseEnter,
  onMouseLeave,
  className,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
}) => {
  return (
    <li
      className={`flex flex-col relative rounded-md bg-nav-darker bg-opacity-50 hover:bg-opacity-60 transition p-6 border border-slate-500/10 hover:border-slate-500/20 ${
        className || ``
      }`}
      onMouseEnter={onMouseEnter || (() => {})}
      onMouseLeave={onMouseLeave || (() => {})}
    >
      {children}
      <h3 className="font-ambit text-white text-xl font-semibold pt-4">
        {title}
      </h3>
      <p className="font-inter text-white/80 pt-1 text-sm">{description}</p>
    </li>
  );
};

const ProgressiveLearningFeature = () => {
  return (
    <FeatureWrapper
      title="Progressive Learning"
      description="Move at your own pace, with a personalized learning path"
    >
      <FeatureGraphicWrapper className="flex flex-col items-center justify-center h-36 w-full">
        {null}
      </FeatureGraphicWrapper>
    </FeatureWrapper>
  );
};

const OfflineDeliveryFeature = () => {
  const [isHovered, setIsHovered] = useState(false);
  const lottieRef = useRef(null);

  return (
    <FeatureWrapper
      title="Offline Delivery"
      className="group"
      description="Learn concepts and practice, even when offline"
      onMouseEnter={() => {
        setIsHovered(true);
        if (lottieRef.current) {
          //@ts-ignore
          lottieRef.current.play(0, true);
        }
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        if (lottieRef.current) {
          // lottieRef.current.goToAndStop(0, true);
          /* lottieRef.current.setDirection(-1); */
          //lottieRef.current.play();
        }
      }}
    >
      <FeatureGraphicWrapper className="flex flex-col items-center justify-center h-36 w-full">
        <div
          className={`flex flex-col items-center justify-center h-24 w-24 rounded-full relative`}
        >
          <div
            className={`absolute w-16 h-16 transition left-1/2 rounded-full -translate-x-1/2 top-1/2 -translate-y-1/2 bg-slate-500/10 group-hover:bg-blue-500/10 duration-500`}
          />
          <div
            className={`absolute group-hover:scale-100 scale-90 w-20 h-20 flex items-center justify-center transition right-1/2 rounded-full border-t border-slate-500/30 -translate-x-3/4 top-1/2 -translate-y-1/2 bg-gradient-to-l from-transparent to-slate-500/10`}
          >
            <DesktopIcon className="w-6 h-6 group-hover:-rotate-6 text-slate-500 transition ease-out" />
          </div>
          <div
            className={`absolute group-hover:scale-100 scale-90 w-20 h-20 flex items-center justify-center transition left-1/2 rounded-full border-t border-slate-500/30 translate-x-3/4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent to-slate-500/10`}
          >
            <LaptopIcon className="w-6 h-6 group-hover:rotate-6 text-slate-500 transition ease-out" />
          </div>
          <div className="w-24 h-24 transition-all bg-slate-500/10 duration-300 group-hover:bg-blue-500/10 z-50 rounded-full group-hover:animate-[live-pulse_1.5s_ease-in-out_infinite]">
            <Lottie
              lottieRef={lottieRef}
              animationData={connectionAnimation}
              loop={true}
            />
          </div>
        </div>
      </FeatureGraphicWrapper>
    </FeatureWrapper>
  );
};

const InteractiveContentFeature = () => {
  const [enableTilt, setEnableTilt] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(5);

  const answers = ["Seminole", "Gator", "Bull", "Knight"];
  const correctIndex = 1;

  return (
    <FeatureWrapper
      title="Interactive Content"
      description="Enhance your knowledge through interactive content and quizzes"
      onMouseEnter={() => setEnableTilt(true)}
      onMouseLeave={() => setEnableTilt(false)}
    >
      <FeatureGraphicWrapper className="flex flex-col items-center justify-center h-36 w-full">
        <Tilt
          tiltMaxAngleX={15}
          tiltMaxAngleY={15}
          perspective={1000}
          tiltEnable={enableTilt}
          transitionSpeed={2000}
          glarePosition="top"
          glareEnable={true}
          glareMaxOpacity={0.2}
          glareColor="#ffffff"
          glareBorderRadius="6px"
          className="w-fit h-fit"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          <div
            style={{
              transformStyle: "preserve-3d",
              background:
                "radial-gradient(50% 80% at 70% 10%, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%), #192233",
            }}
            className="w-64 rounded-md border border-slate-500/10 p-4 flex flex-col"
          >
            <p
              style={{
                WebkitMaskImage:
                  "linear-gradient(to left, rgba(0,0,0,1) 50%, rgba(0,0,0,0.5) 100%)",
              }}
              className="font-dm tracking-wider text-slate-300 text-xs"
            >
              What is the mascot of UF?
            </p>
            {/* Grid of 2x2 answers */}
            <div
              className="grid grid-cols-2 gap-2 pt-2"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {answers.map((answer, index) => {
                return (
                  <div
                    style={
                      selectedAnswer === index
                        ? {
                            transform: "translateZ(20px)",
                          }
                        : {
                            transform: "translateZ(10px)",
                          }
                    }
                    onClick={() => setSelectedAnswer(index)}
                    className={`flex cursor-pointer items-center gap-x-2 transition text-xs px-2 py-1 rounded-sm border  ${
                      selectedAnswer === index && index === correctIndex
                        ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                        : selectedAnswer === index && index !== correctIndex
                        ? "bg-red-500/10 text-red-500 border-red-500/20"
                        : "bg-slate-500/5 hover:bg-slate-500/10 text-slate-500 border-slate-500/10"
                    }`}
                  >
                    <p className="font-dm text-xs ">{answer}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Tilt>
      </FeatureGraphicWrapper>
    </FeatureWrapper>
  );
};

const MultiLanguageFeature = () => {
  const languages = [
    { name: "Python", icon: "devicon-python-plain", origin: "bottom right" },
    { name: "C++", icon: "devicon-cplusplus-plain", origin: "bottom center" },
    {
      name: "JavaScript",
      icon: "devicon-javascript-plain",
      origin: "bottom left",
    },
    { name: "Java", icon: "devicon-java-plain", origin: "right center" },
    { name: "Go", icon: "devicon-go-plain", origin: "center center" },
    { name: "C#", icon: "devicon-csharp-plain", origin: "left center" },
    { name: "Ruby", icon: "devicon-ruby-plain", origin: "top right" },
    {
      name: "TypeScript",
      icon: "devicon-typescript-plain",
      origin: "top center",
    },
    { name: "Rust", icon: "devicon-rust-plain", origin: "top left" },
  ];
  return (
    <FeatureWrapper
      title="Multilanguage Support"
      description="Code in Python, Java, C++, and more"
      className="group/icongrid"
    >
      <FeatureGraphicWrapper className="flex flex-col items-center justify-center h-36 w-full">
        {/* 3x3 grid of languages */}
        <div className="grid grid-cols-3 gap-2">
          {languages.map((language) => (
            <div
              key={language.icon}
              style={{
                background:
                  "radial-gradient(50% 80% at 70% 10%, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%), #192233",
                transformOrigin: language.origin,
              }}
              className="flex flex-col items-center justify-center p-2 rounded-md group group-hover/icongrid:scale-110 hover:!scale-125 transition-all hover:shadow-xl !shadow-black/20"
            >
              <i
                className={`${language.icon} text-xl text-slate-400 group-hover/icongrid:text-slate-300 group-hover:!text-slate-50 transition`}
              />
            </div>
          ))}
        </div>
      </FeatureGraphicWrapper>
    </FeatureWrapper>
  );
};

const IntellisenseFeature = () => {
  const containerControls = useAnimation();
  const textControls = useAnimation();
  const suggestionControls = useAnimation();

  const textLine1 = "const express = require('express')";
  const textLine2 = "const app = express()";
  const textLine4 = "app.";
  const suggestions = ["> get", "post", "put", "delete"];

  const containerVariants = {
    initial: {
      x: "50%",
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        //spring ease
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const suggestionVariants = (delay: number) => ({
    initial: {
      opacity: 0,
      y: `0.25em`,
    },
    animate: {
      opacity: 1,
      y: `0em`,
      transition: {
        duration: 0.5,
        delay: delay,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  });

  const characterVariants = (delay: number) => ({
    initial: {
      opacity: 0,
      y: `0.25em`,
    },
    animate: {
      opacity: 1,
      y: `0em`,
      transition: {
        duration: 0.5,
        delay: delay,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  });

  const animationIn = () => {
    textControls.start("animate").then(() => {
      containerControls.start("animate");
      suggestionControls.start("animate");
    });
    setTimeout(() => {}, 350);
  };

  const animationOut = () => {
    suggestionControls.start("initial");
    containerControls.start("initial");
    textControls.start("initial");
  };

  return (
    <FeatureWrapper
      title="Intellisense"
      description="Get suggestions as you code, and auto-complete with ease"
      onMouseEnter={animationIn}
      onMouseLeave={animationOut}
    >
      <FeatureGraphicWrapper className="flex flex-col items-center justify-end h-36 w-full">
        <div
          style={{
            background:
              "radial-gradient(50% 80% at 70% 10%, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%), #192233",
          }}
          className="flex relative h-[95%] w-full rounded-t-md border-t border-x border-slate-500/10"
        >
          {/* Intellisense suggestion box */}
          <m.div
            variants={containerVariants}
            initial="initial"
            animate={containerControls}
            className="w-28 rounded-md bg-nav-darker/90 absolute top-1 left-14 border border-slate-500/20 flex flex-col space-y-1 p-2"
          >
            {suggestions.map((suggestion, index) => (
              <m.p
                variants={suggestionVariants(index * 0.1)}
                initial="initial"
                animate={suggestionControls}
                className={`text-white/60 text-xs font-mono px-2 ${
                  index === 0 && "!text-white font-semibold"
                }`}
              >
                {suggestion}
              </m.p>
            ))}
          </m.div>
          <div className="items-center border-r border-slate-500/20 font-mono px-1 pt-2 flex flex-col space-y-2 bg-slate-500/10">
            <p className="text-white/80 font-inter text-xs">1</p>
            <p className="text-white/80 font-inter text-xs">2</p>
            <p className="text-white/80 font-inter text-xs">3</p>
            <p className="text-white/80 font-inter text-xs">4</p>
          </div>
          <div className="flex flex-col px-2 pt-2 space-y-2 font-mono">
            <p className="text-white/60 text-xs">{textLine1}</p>
            <p className="text-white/60 text-xs">{textLine2}</p>
            <p className="text-white/60 text-xs">&nbsp;</p>
            <p className="text-white/80 text-xs">
              {textLine4.split("").map((character, index) => {
                console.log(character);
                return (
                  <m.span
                    key={index}
                    className="inline-block"
                    variants={characterVariants(index * 0.1)}
                    initial="initial"
                    animate={textControls}
                  >
                    {character}
                  </m.span>
                );
              })}
            </p>
          </div>
        </div>
      </FeatureGraphicWrapper>
    </FeatureWrapper>
  );
};

const MobileFriendlyFeature = () => {
  const containerControls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  // want the container to go from larger width to smaller width, and switch from 2 columns to 1 column
  const containerVariants = {
    initial: {
      width: "90%",
      transition: {
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
    animate: {
      width: "30%",
      transition: {
        duration: 0.5,
        //spring ease
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const animationIn = () => {
    setIsHovered(true);
    containerControls.start("animate");
  };

  const animationOut = () => {
    setIsHovered(false);
    containerControls.start("initial");
  };

  return (
    <FeatureWrapper
      title="Mobile Friendly"
      description="Use Edugator on your phone, tablet, or desktop"
      onMouseEnter={animationIn}
      onMouseLeave={animationOut}
    >
      <FeatureGraphicWrapper className="flex flex-col items-center justify-end h-36 w-full">
        <m.div
          style={{
            //radial gradient translucen tbackground
            background:
              "radial-gradient(50% 80% at 70% 10%, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%), #192233",
          }}
          className="flex h-[90%] flex-col rounded-t-md border-t border-x border-slate-500/10 p-2 gap-2"
          variants={containerVariants}
          layout
          initial="initial"
          animate={containerControls}
        >
          <p
            style={{
              WebkitMaskImage:
                "linear-gradient(to left, rgba(0,0,0,1) 50%, rgba(0,0,0,0.5) 100%)",
            }}
            className="font-dm tracking-wider text-slate-400 text-xs font-bold"
          >
            Problem 1
          </p>
          <m.div
            layout
            className="w-full h-full flex gap-2"
            style={
              isHovered ? { flexDirection: "column" } : { flexDirection: "row" }
            }
          >
            <m.div
              layout
              className="flex flex-col items-center justify-center w-full h-full border border-slate-500/20 bg-gradient-to-tr from-slate-500/[2%] to-slate-50/[5%] rounded-md"
            />
            <m.div
              layout
              className="flex flex-col items-center justify-center w-full h-full border border-slate-500/20 bg-gradient-to-bl from-slate-500/[2%] to-slate-50/[5%] rounded-md"
            />
          </m.div>
        </m.div>
      </FeatureGraphicWrapper>
    </FeatureWrapper>
  );
};

export default Students;
