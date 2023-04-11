import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Divider,
  Box,
  Button,
} from "@mui/material";
import { useRouter } from "next/router";
import { Routes } from "constants/navigationRoutes";
import { closeAlert } from "../../state/ModulesSlice";
import { useDispatch, useSelector } from "react-redux";
import { LocalStorage } from "lib/auth/LocalStorage";
import { useEffect } from "react";
import AdminHeader from "./AdminHeader";
import AdminNavigation from "components/SideNav/AdminNavigation";
import { RootState } from "lib/store/store";
import {
  setAdminContentSidebarHidden,
  setAdminMainSidebarHidden,
} from "state/interfaceControls.slice";
import { useSidebarLayout } from "hooks/useSidebarLayout";
import ContentSidebar from "components/ContentSidebar/ContentSidebar";
import MobileHeader from "components/PlaygroundLayout/MobileHeader/MobileHeader";
import { SidebarHideOverlay } from "components/PlaygroundLayout/PlaygroundLayout";
import AdminContentSidebar from "components/ContentSidebar/AdminContentSidebar";
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
    <div className="h-screen flex overflow-hidden w-screen max-w-full bg-stone-100 relative">
      {/* Main sidebar */}
      <div
        style={{
          left: mobileView ? -80 : 0,
        }}
        className={`absolute -left-[80px] transition-all sm:left-0 top-0 h-full z-50 ${
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
        className="w-px h-full absolute transition-all bg-slate-700 z-[100] min-w-[1px]"
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
            className={`mobile:left-auto !absolute top-0 transition-all h-full`}
          >
            <AdminContentSidebar
              dropdownHeights={[]}
              setActiveContent={() => {}}
              activeContent={"all"}
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
