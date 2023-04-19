import {
  CheckboxIcon,
  FontStyleIcon,
  ImageIcon,
  InputIcon,
  VideoIcon,
} from "@radix-ui/react-icons";
import {
  FeatureGraphicWrapper,
  FeatureWrapper,
} from "components/LandingPage/shared/FeatureCards";
import { useAnimation, motion as m } from "framer-motion";
import { variants } from "../data/variants";

export const AuthoringToolsFeature = () => {
  const containerControls = useAnimation();

  const animationIn = () => {
    containerControls.start("animate");
  };

  const animationOut = () => {
    containerControls.start("initial");
  };

  const featureIcons = [
    <InputIcon />,
    <VideoIcon />,
    <FontStyleIcon />,
    <ImageIcon />,
    <CheckboxIcon />,
  ];

  return (
    <FeatureWrapper
      title="Authoring Tools"
      description="Write your lessons and exercises in markdown and publish them to your students"
      onMouseEnter={animationIn}
      onMouseLeave={animationOut}
    >
      {/* <div className="w-full h-48 bg-slate-200 rounded-md flex items-center justify-start"></div> */}
      <FeatureGraphicWrapper className="flex flex-col items-center justify-center h-36 w-full">
        <m.div
          variants={variants.authoringTools.containerVariants}
          animate={containerControls}
          initial="initial"
          style={{
            background:
              "radial-gradient(50% 80% at 70% 10%, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%), #192233",
          }}
          className="w-44 h-full rounded-md border-t border-x border-slate-500/10 p-3 flex flex-col z-10"
        >
          <div className="flex flex-col space-y-1 items-start">
            <p className="text-xs text-slate-400 font-dm">
              Introduction to Algorithms
            </p>
            {/* Blinking Cursor */}
            <div className="w-[2px] h-3 bg-slate-400 rounded-full animate-pulse"></div>
          </div>
        </m.div>
        {/* Features */}
        {featureIcons.map((feature, index) => {
          //@ts-ignore
          const itemVariants: Variants =
            variants.authoringTools.itemVariants(index);
          return (
            <m.div
              key={index}
              variants={itemVariants}
              animate={containerControls}
              initial="initial"
              style={{
                background:
                  "radial-gradient(50% 80% at 70% 10%, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%), #192233",
              }}
              className="absolute left-1/2 text-slate-400 transition hover:text-white -translate-x-1/2 w-10 h-10 flex items-center justify-center border border-slate-500/10 rounded-full"
            >
              {feature}
            </m.div>
          );
        })}
      </FeatureGraphicWrapper>
    </FeatureWrapper>
  );
};
