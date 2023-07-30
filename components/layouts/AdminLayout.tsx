import { useRouter } from "next/router";
import { NextRoutes, Routes } from "constants/navigationRoutes";
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
import { useUser } from "@clerk/nextjs";
import { EdugatorLogo } from "components/navigation/navIcons";

import CourseHeader from "components/navigation/CourseHeader";
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

const MAIN_SIDEBAR_WIDTH = 58;
const MAIN_SIDEBAR_EXPANDED_WIDTH = 288;
const CONTENT_SIDEBAR_WIDTH = 350;

const AdminLayout = ({ pageTitle, children, actionButtons = [] }: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  // useuser
  const { user } = useUser();

  useEffect(() => {
    console.log(user);
    if (!user || user.unsafeMetadata.role === "student") {
      if (!user) {
        alert("no user");
      }
      router.push(NextRoutes.Code);
    } else {
      setIsMounted(true);
    }

    return () => {
      setIsMounted(false);
    };
  }, []);
  // if user is not logged in, redirect to login
  // if user.metadata.role is not admin, redirect to login

  const dispatch = useDispatch();
  const router = useRouter();

  const { courseId = undefined } = router.query;

  console.log("COURSEID", courseId);

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

  if (!isMounted) return <div className="w-screen h-screen bg-red-500"></div>;

  return (
    <div className="flex flex-col min-h-screen max-h-screen h-full bg-red-100 w-screen max-w-full overflow-hidden">
      <CourseHeader />
      <div className="flex w-full h-[calc(100vh-40px)] bg-stone-100 relative">
        {/* Main sidebar */}
        <div
          style={{
            left: mobileView || !courseId ? -MAIN_SIDEBAR_WIDTH : 0,
          }}
          className={`absolute -left-[80px] transition-all sm:left-0 top-0 h-full z-50 ease-[cubic-bezier(0.87,_0,_0.13,_1)] ${
            !adminMainSidebarHidden
              ? "min-w-[18rem] w-[18rem]"
              : "w-5 min-w-[59px]"
          }`}
        >
          <AdminNavigation courseId={courseId as string} />
        </div>
        {/* Divider between sidebars */}
        <div className="w-full h-full flex flex-col">
          <div className="flex w-full h-full">
            {/* Content sidebar */}
            {/* If no course is selected, don't render content sidebar */}
            <div
              style={{
                left:
                  mobileView || !courseId
                    ? -(MAIN_SIDEBAR_WIDTH + CONTENT_SIDEBAR_WIDTH)
                    : contentSidebarOffset(),
              }}
              className={`mobile:left-auto !absolute top-0 transition-all h-full ease-[cubic-bezier(0.87,_0,_0.13,_1)]`}
            >
              {courseId && (
                <AdminContentSidebar courseId={courseId as string} />
              )}
            </div>

            {/* Content Holder */}
            <div
              style={{
                paddingLeft: laptopView
                  ? laptopContentMargin()
                  : contentMargin(),
              }}
              className={`relative w-full min-h-screen h-screen transition-all flex flex-col ease-[cubic-bezier(0.87,_0,_0.13,_1)] ${
                tabletView ? `!pl-[${MAIN_SIDEBAR_WIDTH}px]` : ""
              } ${mobileView ? "!pl-0" : ""} ${!courseId ? "!pl-0" : ""}`}
            >
              {/* Top bar (shown only on mobile) */}
              {/* <div
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
              </div> */}
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
    </div>
  );
};

export default AdminLayout;
