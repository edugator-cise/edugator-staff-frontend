import {
  FeatureGraphicWrapper,
  FeatureWrapper,
} from "components/LandingPage/shared/FeatureCards";
import { useAnimation, motion as m, AnimatePresence } from "framer-motion";
import { Plus, Smiley, SmileyWink, SmileyXEyes } from "phosphor-react";
import { useState } from "react";
import { variants } from "../data/variants";

export const ManageTeamsFeature = () => {
  const [isHovered, setIsHovered] = useState(false);
  const addButtonControls = useAnimation();

  const animationIn = () => {
    setIsHovered(true);
    addButtonControls.start("animate");
  };

  const animationOut = () => {
    setIsHovered(false);
    addButtonControls.start("initial");
  };

  return (
    <FeatureWrapper
      title="Manage Teams"
      description="Manage your students and teaching assistant permissions"
      onMouseEnter={animationIn}
      onMouseLeave={animationOut}
    >
      <FeatureGraphicWrapper className="flex flex-col items-center justify-center h-36 w-full">
        <m.div
          layout
          className="flex flex-col items-center justify-start space-y-2 h-full w-full"
        >
          <m.div layout className="w-full flex items-center space-x-2">
            <Smiley size={30} weight="fill" className="text-slate-500/90" />
            <div
              style={{
                background:
                  "radial-gradient(50% 80% at 60% 20%, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%), #192233",
              }}
              className="text-xs font-dm py-2 px-3 w-full bg-slate-500/10 rounded-md flex justify-between items-center"
            >
              <p className="text-slate-400">Amanpreet Kapoor</p>
              <p className="text-blue-500">Instructor</p>
            </div>
          </m.div>
          <m.div layout className="w-full flex items-center space-x-2">
            <SmileyXEyes
              size={30}
              weight="fill"
              className="text-slate-500/90"
            />
            <div
              style={{
                background:
                  "radial-gradient(50% 80% at 60% 20%, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%), #192233",
              }}
              className="text-xs font-dm py-2 px-3 w-full bg-slate-500/10 rounded-md flex justify-between items-center"
            >
              <p className="text-slate-400">Marc Diaz</p>
              <p className="text-slate-500">Admin</p>
            </div>
          </m.div>

          <AnimatePresence exitBeforeEnter>
            {isHovered ? (
              <m.div
                layout
                layoutId="list-item"
                variants={variants.manageTeam.listItemVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full flex items-center space-x-2"
              >
                <SmileyWink
                  size={30}
                  weight="fill"
                  className="text-slate-500/90"
                />
                <div
                  style={{
                    background:
                      "radial-gradient(50% 80% at 60% 20%, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%), #192233",
                  }}
                  className="text-xs font-dm py-2 px-3 w-full bg-slate-500/10 rounded-md flex justify-between items-center z-10"
                >
                  <p className="text-slate-400">Dustin Karp</p>
                  <p className="text-slate-500">Admin</p>
                </div>
              </m.div>
            ) : null}
          </AnimatePresence>
          <m.div
            layoutId="add-button"
            variants={variants.manageTeam.addButtonVariants}
            initial="initial"
            animate={addButtonControls}
            layout
            className="w-full flex items-center justify-center space-x-0"
          >
            <Plus size={16} weight="fill" className="text-slate-500/90" />
            <p className="text-xs text-center text-slate-300 font-dm py-2 px-3 rounded-md">
              Add Team Member
            </p>
          </m.div>
        </m.div>
      </FeatureGraphicWrapper>
    </FeatureWrapper>
  );
};
