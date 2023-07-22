import {
  FeatureGraphicWrapper,
  FeatureWrapper,
} from "components/landing/shared/FeatureCards";
import { motion as m, useAnimation } from "framer-motion";
import { variants } from "../data/variants";

export const IntellisenseFeature = () => {
  const containerControls = useAnimation();
  const textControls = useAnimation();

  const textLine1 = "const express = require('express')";
  const textLine2 = "const app = express()";
  const textLine4 = "app.";
  const suggestions = ["> get", "post", "put", "delete"];

  const animationIn = () => {
    textControls.start("animate").then(() => {
      containerControls.start("animate");
    });
    setTimeout(() => {}, 350);
  };

  const animationOut = () => {
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
            variants={variants.intellisense.containerVariants}
            initial="initial"
            animate={containerControls}
            className="w-28 rounded-md bg-nav-darker/90 absolute top-1 left-14 border border-slate-500/20 flex flex-col space-y-1 p-2"
          >
            {suggestions.map((suggestion, index) => (
              <m.p
                key={index}
                variants={variants.intellisense.suggestionVariants(index * 0.1)}
                initial="initial"
                animate={containerControls}
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
                return (
                  <m.span
                    key={index}
                    className="inline-block"
                    variants={variants.intellisense.characterVariants(
                      index * 0.1
                    )}
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
