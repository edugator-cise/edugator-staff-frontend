import { useRouter } from "next/router";
import { Routes } from "constants/navigationRoutes";
import { useDispatch, useSelector } from "react-redux";
import { LocalStorage } from "lib/auth/LocalStorage";
import React, { useEffect, useState } from "react";
import AdminNavigation from "components/navigation/AdminNavigation";
import { RootState } from "lib/store/store";
import {
  setAdminContentSidebarHidden,
  setAdminMainSidebarHidden,
} from "state/interfaceControls.slice";
import { useSidebarLayout } from "hooks/useSidebarLayout";
import MobileHeader from "components/layouts/MobileHeader";
import {
  ContentType,
  SidebarHideOverlay,
} from "components/layouts/PlaygroundLayout";
import AdminContentSidebar from "components/navigation/AdminContentSidebar";
import { useGetCourseStructure } from "hooks/course/useGetCourseStructure";
export type ButtonColor = "primary" | "success" | "error" | "info" | "warning";
export type ButtonVariant = "text" | "contained" | "outlined";

export interface ButtonProps {
  label: string;
  onClick(): void;
  variant?: string;
  color?: string;
}

type Props = {
  pageTitle: string;
  children: React.ReactNode;
  actionButtons?: ButtonProps[];
};

const MAIN_SIDEBAR_WIDTH = 80;
const MAIN_SIDEBAR_EXPANDED_WIDTH = 288;
const CONTENT_SIDEBAR_WIDTH = 350;

const AdminLayout = ({ pageTitle, children, actionButtons = [] }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const locationState = router.asPath;

  const [activeContent, setActiveContent] = useState<ContentType>("all");

  const [dropdownHeights, setDropdownHeights] = useState<
    Record<number, number>
  >({});

  const [shouldRecalculate, recalculate] = useState({});
  const recalculateDropdownHeights = () => recalculate({});

  // run the function to calculate dropdown heights when the activeContent or the course structure changes
  const { data: courseStructureData } = useGetCourseStructure({ admin: true });

  useEffect(() => {
    calculateDropdownHeights(activeContent);
  }, [activeContent, courseStructureData, shouldRecalculate]);

  const calculateDropdownHeights = (activeContent: ContentType) => {
    // if activeContent is all, get summed height of all elements with class {index}-content from index 0 to 3
    // if activeContent is lessons, get summed height of all elements with class {index}-lesson from index 0 to 1
    // if activeContent is problems, get summed height of all elements with class {index}-problem from index 2 to 3
    const dropdownHeights: Record<number, number> = {};
    const dropdowns = document.getElementsByClassName("dropdown");
    for (let i = 0; i < dropdowns.length; i++) {
      const allHeight = Array.from(
        document.getElementsByClassName(`${i}-content-admin`)
      ).reduce((acc, el) => acc + el.clientHeight, 0);

      const lessonHeight = Array.from(
        document.getElementsByClassName(`${i}-lesson-admin`)
      ).reduce((acc, el) => acc + el.clientHeight, 0);

      const problemHeight = Array.from(
        document.getElementsByClassName(`${i}-problem-admin`)
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

  const { adminContentSidebarHidden, adminMainSidebarHidden } = useSelector(
    (state: RootState) => state.interfaceControls
  );

  const {
    contentMargin,
    contentSidebarOffset,
    dividerOffset,
    laptopContentMargin,
    mobileView,
    tabletView,
    laptopView,
    setMobileNavOpen,
    mobileNavOpen,
  } = useSidebarLayout({
    mainSidebarHidden: adminMainSidebarHidden,
    contentSidebarHidden: adminContentSidebarHidden,
    setMainSidebarHidden: setAdminMainSidebarHidden,
    setContentSidebarHidden: setAdminContentSidebarHidden,
    mainSidebarWidth: MAIN_SIDEBAR_WIDTH,
    mainSidebarExpandedWidth: MAIN_SIDEBAR_EXPANDED_WIDTH,
    contentSidebarWidth: CONTENT_SIDEBAR_WIDTH,
  });

  useEffect(() => {
    if (!LocalStorage.getToken() && locationState !== Routes.Login) {
      router.push(Routes.Login);
    }
  }, []);
  return (
    <div className="h-screen flex overflow-clip w-screen max-w-full bg-stone-100 relative">
      {/* Main sidebar */}
      <div
        style={{
          left: mobileView ? -80 : 0,
        }}
        className={`absolute -left-[80px] transition-all sm:left-0 top-0 h-full z-50 ease-[cubic-bezier(0.87,_0,_0.13,_1)] ${
          !adminMainSidebarHidden
            ? "min-w-[18rem] w-[18rem]"
            : "w-5 min-w-[5rem]"
        }`}
      >
        <AdminNavigation />
      </div>

      {/* Divider between sidebars */}
      <div
        style={{
          left: mobileView ? -1 : dividerOffset(),
        }}
        className="w-px h-full absolute transition-all bg-slate-800 z-[100] min-w-[1px] ease-[cubic-bezier(0.87,_0,_0.13,_1)]"
      />

      <div className="w-full h-full flex flex-col">
        <div className="flex w-full h-full">
          {/* Content sidebar */}
          <div
            style={{
              left: mobileView
                ? -(MAIN_SIDEBAR_WIDTH + CONTENT_SIDEBAR_WIDTH)
                : contentSidebarOffset(),
            }}
            className={`mobile:left-auto !absolute top-0 transition-all h-full ease-[cubic-bezier(0.87,_0,_0.13,_1)]`}
          >
            <AdminContentSidebar
              dropdownHeights={dropdownHeights}
              setActiveContent={setActiveContent}
              activeContent={activeContent}
              recalculateDropdownHeights={recalculateDropdownHeights}
            />
          </div>

          {/* Content Holder */}
          <div
            style={{
              paddingTop: mobileView ? 56 : 0,
              paddingLeft: laptopView ? laptopContentMargin() : contentMargin(),
            }}
            className={`relative w-full h-full transition-all flex flex-col ease-[cubic-bezier(0.87,_0,_0.13,_1)] ${
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
                dropdownHeights={[]}
                setActiveContent={() => {}}
                activeContent={"all"}
              />
            </div>
            <SidebarHideOverlay
              hidden={adminContentSidebarHidden && adminMainSidebarHidden}
              setHidden={() => {
                dispatch(setAdminContentSidebarHidden(true));
                dispatch(setAdminMainSidebarHidden(true));
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

export default AdminLayout;
