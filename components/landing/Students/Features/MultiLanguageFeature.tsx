import {
  FeatureGraphicWrapper,
  FeatureWrapper,
} from "components/landing/shared/FeatureCards";
import { languages } from "../data/languages";

export const MultiLanguageFeature = () => {
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
