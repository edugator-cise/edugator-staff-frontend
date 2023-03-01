import React, { useEffect, useState } from "react";
import "allotment/dist/style.css";
import { useRouter } from "next/router";
import SideNavigation from "./SideNav/SideNavigation";
import ContentSidebar from "./ContentSidebar/ContentSidebar";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import useWindowWidth from "hooks/useWindowSize";

export type ContentType = "problems" | "lessons" | "all";

const PlaygroundLayout = ({ children }: { children: React.ReactNode }) => {
  const [contentSidebarHidden, setContentSidebarHidden] = useState(false);
  const [mainSidebarHidden, setMainSidebarHidden] = useState(false);
  const [activeContent, setActiveContent] = useState<ContentType>("all");
  const [tabletView, setTabletView] = useState(false);
  const [laptopView, setLaptopView] = useState(false);
  const [mobileView, setMobileView] = useState(false);

  const router = useRouter();
  const locationState = router.asPath;

  const windowWidth = useWindowWidth();

  useEffect(() => {
    if (!windowWidth) return;
    if (windowWidth < 800) {
      setMobileView(true);
      setTabletView(false);
      setLaptopView(false);
      setContentSidebarHidden(true);
      setMainSidebarHidden(true);
      return;
    } else if (windowWidth < 1024) {
      setMobileView(false);
      setTabletView(true);
      setLaptopView(false);
      setContentSidebarHidden(true);
      setMainSidebarHidden(true);
    } else if (windowWidth < 1420) {
      setMobileView(false);
      setTabletView(false);
      setLaptopView(true);
      setContentSidebarHidden(true);
      setMainSidebarHidden(true);
    } else {
      setTabletView(false);
      setMobileView(false);
      setLaptopView(false);
      setContentSidebarHidden(false);
      setMainSidebarHidden(mainSidebarHidden);
    }
  }, [windowWidth]);

  const mainSidebarWidth = 80;
  const mainSidebarExpandedWidth = 288;
  const contentSidebarWidth = 287;

  let contentMargin = 0;
  if (contentSidebarHidden && mainSidebarHidden) {
    contentMargin = mainSidebarWidth;
  } else if (contentSidebarHidden && !mainSidebarHidden) {
    contentMargin = mainSidebarExpandedWidth;
  } else if (!contentSidebarHidden && mainSidebarHidden) {
    contentMargin = contentSidebarWidth + mainSidebarWidth;
  } else {
    contentMargin = contentSidebarWidth + mainSidebarExpandedWidth;
  }

  let contentSidebarOffset = 0;
  if (contentSidebarHidden && mainSidebarHidden) {
    contentSidebarOffset = -contentSidebarWidth + mainSidebarWidth;
  } else if (contentSidebarHidden && !mainSidebarHidden) {
    contentSidebarOffset = -contentSidebarWidth + mainSidebarExpandedWidth;
  } else if (!contentSidebarHidden && mainSidebarHidden) {
    contentSidebarOffset = mainSidebarWidth;
  } else {
    contentSidebarOffset = mainSidebarExpandedWidth;
  }

  let dividerOffset = 0;
  if (mainSidebarHidden) {
    dividerOffset = mainSidebarWidth;
  } else if (!mainSidebarHidden) {
    dividerOffset = mainSidebarExpandedWidth;
  }

  let laptopContentMargin = 0;
  if (mainSidebarHidden) {
    laptopContentMargin = mainSidebarWidth;
  } else {
    laptopContentMargin = mainSidebarExpandedWidth;
  }

  return (
    <div className="h-screen flex overflow-hidden w-screen max-w-full bg-stone-100 relative">
      {/* <VerticalNavigation light={true} codingPage={true} /> */}
      <div
        className={`absolute -left-[80px] transition-all sm:left-0 top-0 h-full z-50 ${
          !mainSidebarHidden ? "min-w-[18rem] w-[18rem]" : "w-5 min-w-[5rem]"
        }`}
      >
        <SideNavigation
          mainSidebarHidden={mainSidebarHidden}
          setMainSidebarHidden={setMainSidebarHidden}
          exercisesHidden={contentSidebarHidden}
          setExercisesHidden={setContentSidebarHidden}
          setActiveContent={setActiveContent}
          activeContent={activeContent}
        />
      </div>
      <div
        style={{
          left: mobileView ? -1 : dividerOffset,
        }}
        className="w-px h-full absolute transition-all bg-slate-700 z-[100] min-w-[1px]"
      ></div>
      <div className="w-full h-full flex flex-col">
        {/* <TopicSidebar isHidden={isHidden} setIsHidden={setIsHidden} /> */}
        <div className="flex w-full h-full">
          <div
            style={{
              left: mobileView
                ? -(mainSidebarWidth + contentSidebarWidth)
                : contentSidebarOffset,
            }}
            className={`mobile:left-auto !absolute top-0 transition-all h-full`}
          >
            <ContentSidebar
              hidden={contentSidebarHidden}
              setHidden={setContentSidebarHidden}
              setActiveContent={setActiveContent}
              activeContent={activeContent}
            />
          </div>
          <div
            style={{
              paddingLeft: laptopView ? laptopContentMargin : contentMargin,
            }}
            className={`relative w-full h-full transition-all ${
              tabletView ? "!pl-[80px]" : ""
            } ${mobileView ? "!pl-0" : ""}`}
          >
            <SidebarHideOverlay
              hidden={contentSidebarHidden && mainSidebarHidden}
              setHidden={() => {
                setContentSidebarHidden(true);
                setMainSidebarHidden(true);
              }}
            />
            {children}
            <NextOverlay />
          </div>
        </div>
      </div>
    </div>
  );
};

const SidebarHideOverlay = ({
  hidden,
  setHidden,
}: {
  hidden: boolean;
  setHidden: (hidden: boolean) => void;
}) => {
  return (
    <div
      onClick={() => {
        setHidden(true);
      }}
      className={`laptop:opacity-0 laptop:pointer-events-none transition-opacity absolute top-0 left-0 w-full h-full bg-black/50 z-20 ${
        hidden ? "opacity-0 pointer-events-none" : "opacity-100 cursor-pointer"
      }`}
    ></div>
  );
};

const NextOverlay = () => {
  return (
    <div className="tablet:flex hidden font-dm space-x-4 cursor-pointer max-w-[30rem] absolute items-center justify-between rounded-md opacity-50 transition-opacity hover:opacity-100 bg-white dark:bg-slate-800 dark:border-slate-600 shadow-lg shadow-black/5 border bottom-4 right-4 z-50 px-4 whitespace-nowrap">
      <div className="flex flex-col py-3 text-slate-900 dark:text-white">
        <h1 className="font-bold">Up Next:</h1>
        <p className="text-sm">Introduction to C++</p>
      </div>
      <div className="flex items-end h-10">
        <ArrowRightIcon className="h-4 w-4 dark:text-blue-300 text-blue-500 " />
      </div>
    </div>
  );
};

export default PlaygroundLayout;
