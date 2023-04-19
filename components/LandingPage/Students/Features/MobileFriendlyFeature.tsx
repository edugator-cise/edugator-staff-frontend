import {
  FeatureGraphicWrapper,
  FeatureWrapper,
} from "components/LandingPage/shared/FeatureCards";
import { motion as m, useAnimation } from "framer-motion";
import { useState } from "react";
import { variants } from "../data/variants";

export const MobileFriendlyFeature = () => {
  const containerControls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  // want the container to go from larger width to smaller width, and switch from 2 columns to 1 column

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
          className={`flex h-[90%] flex-col rounded-t-md border-t border-x border-slate-500/10 p-2 space-y-2`}
          variants={variants.mobileFriendly.containerVariants}
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
            className={`w-full h-full flex ${
              isHovered ? "space-y-2" : "space-x-2"
            }`}
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
