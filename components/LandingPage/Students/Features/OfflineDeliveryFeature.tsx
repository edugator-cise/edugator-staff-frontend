import { DesktopIcon, LaptopIcon } from "@radix-ui/react-icons";
import {
  FeatureGraphicWrapper,
  FeatureWrapper,
} from "components/LandingPage/shared/FeatureCards";
import Lottie from "lottie-react";
import connectionAnimation from "../data/connectionAnimation.json";
import { useRef } from "react";

export const OfflineDeliveryFeature = () => {
  const lottieRef = useRef(null);

  return (
    <FeatureWrapper
      title="Offline Delivery"
      className="group"
      description="Learn concepts and practice, even when offline"
    >
      <FeatureGraphicWrapper className="flex flex-col items-center justify-center h-36 w-full">
        <div
          className={`flex flex-col items-center justify-center h-24 w-24 rounded-full relative`}
        >
          <div
            className={`absolute w-16 h-16 transition left-1/2 rounded-full -translate-x-1/2 top-1/2 -translate-y-1/2 bg-slate-500/10 group-hover:bg-blue-500/10 duration-500`}
          />
          <div
            className={`absolute group-hover:scale-100 scale-90 w-20 h-20 flex items-center justify-center transition right-1/2 rounded-full border-t border-slate-500/30 -translate-x-3/4 top-1/2 -translate-y-1/2 bg-gradient-to-l from-transparent to-slate-500/10`}
          >
            <DesktopIcon className="w-6 h-6 group-hover:-rotate-6 text-slate-500 transition ease-out" />
          </div>
          <div
            className={`absolute group-hover:scale-100 scale-90 w-20 h-20 flex items-center justify-center transition left-1/2 rounded-full border-t border-slate-500/30 translate-x-3/4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent to-slate-500/10`}
          >
            <LaptopIcon className="w-6 h-6 group-hover:rotate-6 text-slate-500 transition ease-out" />
          </div>
          <div className="w-24 h-24 transition-all bg-slate-500/10 duration-300 group-hover:bg-blue-500/10 z-50 rounded-full group-hover:animate-[live-pulse_1.5s_ease-in-out_infinite]">
            <Lottie
              lottieRef={lottieRef}
              animationData={connectionAnimation}
              loop={true}
            />
          </div>
        </div>
      </FeatureGraphicWrapper>
    </FeatureWrapper>
  );
};
