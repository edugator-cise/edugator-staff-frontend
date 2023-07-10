import { sampleProblems } from "components/landing/Instructors/data/sampleProblems";
import {
  FeatureGraphicWrapper,
  FeatureWrapper,
} from "components/landing/shared/FeatureCards";

export const ProblemBanksFeature = () => {
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
