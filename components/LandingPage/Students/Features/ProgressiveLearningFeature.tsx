import {
  FeatureGraphicWrapper,
  FeatureWrapper,
} from "components/LandingPage/shared/FeatureCards";
import { useState } from "react";
import { motion as m, useAnimation } from "framer-motion";

export const ProgressiveLearningFeature = () => {
  const containerControls = useAnimation();

  const pathVariants = (delay: number) => ({
    initial: {
      pathLength: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        delay: delay,
      },
    },
    animate: {
      pathLength: 1,
      transition: {
        duration: 1,
        ease: "easeInOut",
        delay: delay,
      },
    },
  });

  const containerVariants = {
    initial: {
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        delay: 0,
      },
    },
    animate: {
      scale: 1.04,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        delay: 0.2,
      },
    },
  };

  const bubbleVariants = (delayIn: number, delayOut: number) => ({
    initial: {
      borderColor: "#64748b",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        delay: delayIn,
      },
    },
    animate: {
      borderColor: "#3b82f6",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        delay: delayOut,
      },
    },
  });

  const animationIn = () => {
    containerControls.start("animate");
  };

  const animationOut = () => {
    containerControls.start("initial");
  };

  return (
    <FeatureWrapper
      title="Progressive Learning"
      description="Move at your own pace, with a personalized learning path"
      className="group"
      onMouseEnter={animationIn}
      onMouseLeave={animationOut}
    >
      <FeatureGraphicWrapper className="flex flex-col items-center justify-center h-36 w-full">
        <m.div
          variants={containerVariants}
          initial="initial"
          animate={containerControls}
          className="w-full h-[80%] pb-4 px-6 flex origin-right"
        >
          <div className="w-fit min-w-fit flex flex-col justify-between items-end">
            <div className=" items-center flex w-fit space-x-2 ">
              <p
                style={{
                  background:
                    "radial-gradient(50% 80% at 70% 10%, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%), #192233",
                }}
                className="text-xs rounded-full py-1 px-3 text-slate-400 font-dm whitespace-nowrap border border-slate-500/10"
              >
                Arrays
              </p>
              <m.div
                variants={bubbleVariants(0.2, 0)}
                initial="initial"
                animate={containerControls}
                className="w-3 h-3 rounded-full border border-slate-500"
              />
            </div>
            <div className="items-center flex w-fit space-x-2 ">
              <p
                style={{
                  background:
                    "radial-gradient(50% 80% at 70% 10%, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%), #192233",
                }}
                className="text-xs rounded-full py-1 px-3 text-slate-400 font-dm whitespace-nowrap border border-slate-500/10"
              >
                Integer
              </p>
              <m.div
                variants={bubbleVariants(0.3, 0.1)}
                initial="initial"
                animate={containerControls}
                className="w-3 h-3 rounded-full border border-slate-500"
              />
            </div>
          </div>
          <div className="w-full flex flex-col justify-between relative overflow-hidden">
            {/* Top Gray Arrow Line */}
            <div className="absolute h-1/2 w-[205px] top-[6px] left-1/2 -translate-x-1/2">
              <svg
                className="w-full h-full"
                viewBox="0 0 426 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.320312 0.522302C0.320312 0.522302 109.713 0.522217 153.092 0.522217C196.471 0.522217 225.219 78.6829 266.644 78.6829C308.069 78.6829 425.513 78.6829 425.513 78.6829"
                  stroke="#64748b"
                />
              </svg>
            </div>
            {/* Top Green Arrow Line */}
            <div className="absolute h-1/2 w-[205px] top-[6px] left-1/2 -translate-x-1/2">
              <m.svg
                className="w-full h-full"
                viewBox="0 0 426 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <m.path
                  variants={pathVariants(0)}
                  initial="initial"
                  animate={containerControls}
                  d="M0.320312 0.522302C0.320312 0.522302 109.713 0.522217 153.092 0.522217C196.471 0.522217 225.219 78.6829 266.644 78.6829C308.069 78.6829 425.513 78.6829 425.513 78.6829"
                  stroke="#2384d3"
                  strokeWidth={3}
                />
              </m.svg>
            </div>
            {/* Bottom Gray Arrow Line */}
            <div className="absolute h-1/2 w-[205px] bottom-[6px] left-1/2 -translate-x-1/2">
              <svg
                className="w-full h-full"
                viewBox="0 0 426 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.320312 78.6828C0.320312 78.6828 109.713 78.6829 153.092 78.6829C196.471 78.6829 225.219 0.522209 266.644 0.522209C308.069 0.522209 425.513 0.522209 425.513 0.522209"
                  stroke="#64748b"
                />
              </svg>
            </div>
            {/* Bottom Blue Arrow Line */}
            <div className="absolute h-1/2 w-[205px] bottom-[6px] left-1/2 -translate-x-1/2">
              <m.svg
                className="w-full h-full"
                viewBox="0 0 426 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <m.path
                  variants={pathVariants(0.1)}
                  initial="initial"
                  animate={containerControls}
                  d="M0.320312 78.6828C0.320312 78.6828 109.713 78.6829 153.092 78.6829C196.471 78.6829 225.219 0.522209 266.644 0.522209C308.069 0.522209 425.513 0.522209 425.513 0.522209"
                  stroke="#2384d3"
                  strokeWidth={3}
                />
              </m.svg>
            </div>
          </div>
          <div className="w-fit min-w-fit h-full flex justify-end items-center">
            <div className="items-center flex w-fit space-x-2 ">
              <m.div
                variants={bubbleVariants(0, 0.5)}
                initial="initial"
                animate={containerControls}
                className="w-3 h-3 rounded-full border border-slate-500"
              />
              <p
                style={{
                  background:
                    "radial-gradient(50% 80% at 70% 10%, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%), #192233",
                }}
                className="text-xs rounded-full py-1 px-3 text-slate-400 font-dm whitespace-nowrap border border-slate-500/10"
              >
                Two Sum
              </p>
            </div>
          </div>
        </m.div>
      </FeatureGraphicWrapper>
    </FeatureWrapper>
  );
};
