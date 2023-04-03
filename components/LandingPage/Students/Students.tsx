import { ProgressiveLearningFeature } from "./Features/ProgressiveLearningFeature";
import { OfflineDeliveryFeature } from "./Features/OfflineDeliveryFeature";
import { MobileFriendlyFeature } from "./Features/MobileFriendlyFeature";
import { MultiLanguageFeature } from "./Features/MultiLanguageFeature";
import { InteractiveContentFeature } from "./Features/InteractiveContentFeature";
import { IntellisenseFeature } from "./Features/IntellisenseFeature";

const Students = () => {
  return (
    <section className="pb-24 pt-12 md:pt-28 bg-nav-darkest relative">
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
        <ul className="lg:grid-cols-3 grid grid-cols-1 gap-4 pt-16 sm:grid-cols-2 w-full">
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

export default Students;
