import { ProblemBanksFeature } from "./Features/ProblemBanksFeature";
import { ManageTeamsFeature } from "./Features/ManageTeamsFeature";
import { FeatureWrapper } from "../shared/FeatureCards";
import { AuthoringToolsFeature } from "./Features/AuthoringToolsFeature";

const Instructors = () => {
  return (
    <section className="pb-24 bg-nav-darkest" id="instructors">
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
              Empower your students with hands-on learning
            </h2>
            <p className="font-inter text-white/80 sm:max-w-xl md:max-w-3xl lg:max-w-4xl">
              Build and distribute your coding curriculum with Edugator's
              interactive platform.
            </p>
          </div>
        </div>
        <ul className="lg:grid-cols-3 grid grid-cols-1 gap-4 pt-16 sm:grid-cols-2">
          <AuthoringToolsFeature />
          <ProblemBanksFeature />
          <ManageTeamsFeature />
          {/* <CourseAnalyticsFeature />
          <SSOSupportFeature />
          <PlaigarismCheckFeature /> */}
        </ul>
      </div>
    </section>
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
