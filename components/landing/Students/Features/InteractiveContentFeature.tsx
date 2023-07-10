import {
  FeatureGraphicWrapper,
  FeatureWrapper,
} from "components/landing/shared/FeatureCards";
import Tilt from "react-parallax-tilt";
import { useState } from "react";

export const InteractiveContentFeature = () => {
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
                    key={index}
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
                    className={`flex cursor-pointer items-center space-x-2 transition text-xs px-2 py-1 rounded-sm border  ${
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
