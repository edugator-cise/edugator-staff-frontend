import { EdugatorLogo, icons } from "components/SideNav/navIcons";
import { RootState } from "lib/store/store";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAdminContentSidebarHidden,
  setAdminMainSidebarHidden,
} from "state/interfaceControls.slice";
import { adminNavLinks, NavLinkItem } from "./navigationData";
import { NavLink } from "./NavLink";
import { NavLinkTooltip } from "./NavLinkTooltip";
import SwitchToggle from "components/shared/SwitchToggle";

const Divider = () => {
  return <div className="w-full h-px bg-slate-600"></div>;
};

const AdminNavigation = () => {
  const [activeLink, setActiveLink] = useState<NavLinkItem>(adminNavLinks[1]);
  const [mounted, setMounted] = useState(false);

  const { adminMainSidebarHidden, adminContentSidebarHidden } = useSelector(
    (state: RootState) => state.interfaceControls
  );

  const dispatch = useDispatch();

  const toggleMainSidebar = (hidden: boolean) => {
    dispatch(setAdminMainSidebarHidden(hidden));
  };

  const toggleContentSidebar = (hidden: boolean) => {
    dispatch(setAdminContentSidebarHidden(hidden));
  };

  const toggleExercisesLinks = adminNavLinks.filter(
    (link) => link.toggleExercises
  );

  useEffect(() => {
    // used to fix hydration mismatch with theme toggle
    setMounted(true);
  }, []);

  const router = useRouter();
  const { pathname } = router;

  const { systemTheme, theme, setTheme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <nav
      className={`flex font-dm overflow-hidden h-full bg-nav-darker dark:bg-[#212b3b] flex-col items-center justify-start`}
    >
      {/* Logo */}
      <div className="flex items-center h-16 w-full bg-gradient-to-tl from-nav-darker dark:from-[#212b3b] dark:via-[#212b3b] dark:to-emerald-700/40 via-nav-darker to-emerald-900/40 px-3">
        <Link href="/">
          <div className="flex items-center cursor-pointer">
            <div className="w-12 h-12 min-w-[3rem] p-1 flex items-center mr-2">
              <EdugatorLogo />
            </div>

            <h1
              className={`text-white font-ambit text-xl mt-1 overflow-hidden text-ellipsis transition-opacity mr-4 ${
                !adminMainSidebarHidden ? "opacity-100" : "opacity-0"
              }`}
            >
              Edugator
            </h1>
            <p className="rounded-md bg-gradient-to-br from-blue-500 to-blue-700 border border-blue-900 text-white font-dm text-xs uppercase px-2 py-1">
              Admin
            </p>
          </div>
        </Link>
      </div>
      {/* Main Sidebar Content */}
      <div className="h-full flex flex-col items-center justify-between py-4 w-full px-4">
        {/* Top Group */}
        <section className="w-full flex flex-col space-y-4">
          {/* Button Group */}
          <div className="flex flex-col space-y-2">
            {adminNavLinks.map((link, i) => {
              const toggleExercises = toggleExercisesLinks.includes(link);
              const isActiveLink = activeLink.id === link.id;

              const clickHandler = () => {
                // if link should toggle exercises (view all, lessons, problems)
                if (toggleExercises) {
                  // if link is already active, toggle exercises. if not, show exercises
                  if (isActiveLink) {
                    toggleContentSidebar(!adminContentSidebarHidden);
                  } else {
                    toggleContentSidebar(false);
                  }
                } else {
                  // if link is not in toggleExercises, close exercises
                  toggleContentSidebar(true);
                }

                setActiveLink(link);
              };

              return (
                <NavLink
                  key={i}
                  open={!adminMainSidebarHidden}
                  icon={link.icon}
                  text={link.text}
                  active={activeLink.id === link.id}
                  onClick={clickHandler}
                />
              );
            })}
          </div>
        </section>
        {/* Bottom Group */}
        <div className="w-full space-y-4">
          <div className="flex flex-col space-y-2">
            {/* Theme Toggle */}
            {mounted ? (
              <NavLinkTooltip
                text="Toggle Theme"
                disabled={!adminMainSidebarHidden}
              >
                <div
                  className={`w-full h-12 cursor-pointer rounded-md overflow-hidden relative flex items-center justify-between px-[14px] group text-nav-inactive-light hover:bg-emerald-500/5`}
                  onClick={() => {
                    setTheme(currentTheme === "dark" ? "light" : "dark");
                  }}
                >
                  <div className="flex space-x-4">
                    <div className="w-5 h-5 min-w-[20px] relative">
                      <div
                        className={`absolute top-0 left-0 w-full h-full transition-all ${
                          currentTheme === "dark"
                            ? "right-5 opacity-0 rotate-90"
                            : "opacity-100 rotate-0 right-0"
                        }`}
                      >
                        {icons.sun(false)}
                      </div>
                      <div
                        className={`absolute left-0 top-0 w-full h-full transition-all ${
                          currentTheme === "dark"
                            ? "opacity-100 rotate-0 right-0"
                            : "opacity-0 -rotate-90 -right-5"
                        }`}
                      >
                        {icons.moon(false)}
                      </div>
                    </div>
                    <label
                      className={`text-sm group-hover:text-white pointer-events-none transition text-ellipsis whitespace-nowrap ${
                        !adminMainSidebarHidden ? "opacity-100" : "opacity-0"
                      }`}
                      htmlFor="dark-mode"
                    >
                      Dark Mode
                    </label>
                  </div>

                  <SwitchToggle
                    checked={currentTheme === "dark"}
                    onCheckedChange={(checked) => {
                      setTheme(checked ? "dark" : "light");
                    }}
                  />
                </div>
              </NavLinkTooltip>
            ) : (
              <></>
            )}
          </div>
          {/* Settings */}
          <NavLinkTooltip text="Settings" disabled={!adminMainSidebarHidden}>
            <div
              className={`w-full cursor-pointer h-12 rounded-md overflow-hidden flex items-center justify-start px-[14px] group space-x-4 text-nav-inactive-light hover:bg-emerald-500/5`}
            >
              <div className="w-5 h-5 min-w-[20px]">{icons.cog(false)}</div>
              <div
                className={`text-sm group-hover:text-white transition text-ellipsis whitespace-nowrap ${
                  !adminMainSidebarHidden ? "opacity-100" : "opacity-0"
                }`}
              >
                Settings
              </div>
            </div>
          </NavLinkTooltip>
          {/* Divider */}
          <Divider />
          {/* Collapse/Expand Button */}
          <NavLinkTooltip text={"Expand"} disabled={!adminMainSidebarHidden}>
            <div
              onClick={() => toggleMainSidebar(!adminMainSidebarHidden)}
              className={`w-full cursor-pointer h-12 rounded-md overflow-hidden flex items-center justify-start px-[14px] group space-x-4 text-nav-inactive-light hover:bg-emerald-500/5`}
            >
              <div
                className={`w-5 h-5 min-w-[20px] transition-transform ${
                  !adminMainSidebarHidden ? "rotate-180" : ""
                }`}
              >
                {icons.expandArrow(false)}
              </div>
              <div
                className={`text-sm group-hover:text-white transition text-ellipsis whitespace-nowrap ${
                  !adminMainSidebarHidden ? "opacity-100" : "opacity-0"
                }`}
              >
                Collapse
              </div>
            </div>
          </NavLinkTooltip>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavigation;
