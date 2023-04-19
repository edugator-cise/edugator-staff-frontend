import React, { useEffect, useState } from "react";
import "allotment/dist/style.css";
import { useRouter } from "next/router";
import SideNavigation from "../SideNav/SideNavigation";
import ContentSidebar from "../ContentSidebar/ContentSidebar";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import useWindowWidth from "hooks/useWindowSize";
import { EdugatorLogo } from "../SideNav/navIcons";
import { useDeviceSize } from "hooks/useDeviceSize";
import { useDispatch, useSelector } from "react-redux";
import {
  setContentSidebarHidden,
  setMainSidebarHidden,
} from "state/interfaceControls.slice";
import { RootState } from "lib/store/store";
import MobileHeader from "./MobileHeader/MobileHeader";

export type ContentType = "problems" | "lessons" | "all";

const PlaygroundLayout = ({ children }: { children: React.ReactNode }) => {
  const [activeContent, setActiveContent] = useState<ContentType>("all");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const dispatch = useDispatch();

  const { contentSidebarHidden, mainSidebarHidden } = useSelector(
    (state: RootState) => state.interfaceControls
  );

  const router = useRouter();
  const locationState = router.asPath;

  const { mobileView, tabletView, laptopView } = useDeviceSize();

  const [dropdownHeights, setDropdownHeights] = React.useState<
    Record<number, number>
  >({});

  useEffect(() => {
    calculateDropdownHeights(activeContent);
  }, [activeContent]);

  const calculateDropdownHeights = (activeContent: ContentType) => {
    // if activeContent is all, get summed height of all elements with class {index}-content from index 0 to 3
    // if activeContent is lessons, get summed height of all elements with class {index}-lesson from index 0 to 1
    // if activeContent is problems, get summed height of all elements with class {index}-problem from index 2 to 3
    const dropdownHeights: Record<number, number> = {};
    const dropdowns = document.getElementsByClassName("dropdown");
    for (let i = 0; i < dropdowns.length; i++) {
      const allHeight = Array.from(
        document.getElementsByClassName(`${i}-content`)
      ).reduce((acc, el) => acc + el.clientHeight, 0);

      const lessonHeight = Array.from(
        document.getElementsByClassName(`${i}-lesson`)
      ).reduce((acc, el) => acc + el.clientHeight, 0);

      const problemHeight = Array.from(
        document.getElementsByClassName(`${i}-problem`)
      ).reduce((acc, el) => acc + el.clientHeight, 0);

      if (activeContent === "all") {
        dropdownHeights[i] = allHeight;
      } else if (activeContent === "lessons") {
        dropdownHeights[i] = lessonHeight;
      } else if (activeContent === "problems") {
        dropdownHeights[i] = problemHeight;
      }
    }
    setDropdownHeights(dropdownHeights);
  };

  useEffect(() => {
    if (!mobileView && !tabletView && !laptopView) {
      dispatch(setContentSidebarHidden(false));
      dispatch(setMainSidebarHidden(mainSidebarHidden));
    } else {
      setMobileNavOpen(false);
      dispatch(setContentSidebarHidden(true));
      dispatch(setMainSidebarHidden(true));
    }
  }, [mobileView, tabletView, laptopView]);

  const mainSidebarWidth = 80;
  const mainSidebarExpandedWidth = 288;
  const contentSidebarWidth = 287;

  const contentMargin = () => {
    if (contentSidebarHidden && mainSidebarHidden) {
      return mainSidebarWidth;
    } else if (contentSidebarHidden && !mainSidebarHidden) {
      return mainSidebarExpandedWidth;
    } else if (!contentSidebarHidden && mainSidebarHidden) {
      return contentSidebarWidth + mainSidebarWidth;
    } else {
      return contentSidebarWidth + mainSidebarExpandedWidth;
    }
  };

  const contentSidebarOffset = () => {
    if (contentSidebarHidden && mainSidebarHidden) {
      return -contentSidebarWidth + mainSidebarWidth;
    } else if (contentSidebarHidden && !mainSidebarHidden) {
      return -contentSidebarWidth + mainSidebarExpandedWidth;
    } else if (!contentSidebarHidden && mainSidebarHidden) {
      return mainSidebarWidth;
    } else {
      return mainSidebarExpandedWidth;
    }
  };

  const dividerOffset = () => {
    if (mainSidebarHidden) {
      return mainSidebarWidth;
    } else if (!mainSidebarHidden) {
      return mainSidebarExpandedWidth;
    }
  };

  const laptopContentMargin = () => {
    if (mainSidebarHidden) {
      return mainSidebarWidth;
    } else {
      return mainSidebarExpandedWidth;
    }
  };

  return (
    <div className="h-screen flex overflow-hidden w-screen max-w-full bg-stone-100 relative">
      {/* Main sidebar */}
      <div
        style={{
          left: mobileView ? -80 : 0,
        }}
        className={`absolute -left-[80px] transition-all sm:left-0 top-0 h-full z-50 ${
          !mainSidebarHidden ? "min-w-[18rem] w-[18rem]" : "w-5 min-w-[5rem]"
        }`}
      >
        <SideNavigation
          setActiveContent={setActiveContent}
          activeContent={activeContent}
        />
      </div>

      {/* Divider between sidebars */}
      <div
        style={{
          left: mobileView ? -1 : dividerOffset(),
        }}
        className="w-px h-full absolute transition-all bg-slate-700 z-[100] min-w-[1px]"
      />

      <div className="w-full h-full flex flex-col">
        <div className="flex w-full h-full">
          {/* Content sidebar */}
          <div
            style={{
              left: mobileView
                ? -(mainSidebarWidth + contentSidebarWidth)
                : contentSidebarOffset(),
            }}
            className={`mobile:left-auto !absolute top-0 transition-all h-full`}
          >
            <ContentSidebar
              dropdownHeights={dropdownHeights}
              setActiveContent={setActiveContent}
              activeContent={activeContent}
            />
          </div>

          {/* Content Holder */}
          <div
            style={{
              paddingTop: mobileView ? 56 : 0,
              paddingLeft: laptopView ? laptopContentMargin() : contentMargin(),
            }}
            className={`relative w-full h-full transition-all flex flex-col ${
              tabletView ? "!pl-[80px]" : ""
            } ${mobileView ? "!pl-0" : ""}`}
          >
            {/* Top bar (shown only on mobile) */}
            <div
              style={{
                top: mobileView ? 0 : -96,
                left: mobileView ? 0 : 80,
              }}
              className="absolute left-0 transition-all w-full"
            >
              <MobileHeader
                mobileNavOpen={mobileNavOpen}
                setMobileNavOpen={setMobileNavOpen}
                dropdownHeights={dropdownHeights}
                setActiveContent={setActiveContent}
                activeContent={activeContent}
              />
            </div>
            <SidebarHideOverlay
              hidden={contentSidebarHidden && mainSidebarHidden}
              setHidden={() => {
                dispatch(setContentSidebarHidden(true));
                dispatch(setMainSidebarHidden(true));
              }}
            />
            {children}
            {/* <NextOverlay /> */}
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
  setHidden: () => void;
}) => {
  return (
    <div
      onClick={() => {
        setHidden();
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
