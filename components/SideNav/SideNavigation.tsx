import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";

import { EdugatorLogo, icons } from "./navIcons";
import { ContentType } from "components/PlaygroundLayout/PlaygroundLayout";
import { navLinks, NavLinkText, NavLinkItem } from "./navigationData";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "lib/store/store";
import {
  setMainSidebarHidden,
  setContentSidebarHidden,
} from "state/interfaceControls.slice";
import Link from "next/link";
import { NavLinkTooltip } from "./NavLinkTooltip";
import { NavLink } from "./NavLink";
import SwitchToggle from "components/shared/SwitchToggle";

const Divider = () => {
  return <div className="w-full h-px bg-slate-600"></div>;
};

const SideNavigation = ({
  activeContent,
  setActiveContent,
}: {
  activeContent: ContentType;
  setActiveContent: (activeContent: ContentType) => void;
}) => {
  const [activeLink, setActiveLink] = useState<NavLinkItem>(navLinks[1]);
  const [activeClass, setActiveClass] = useState(0);
  const [mounted, setMounted] = useState(false);

  const { mainSidebarHidden, contentSidebarHidden } = useSelector(
    (state: RootState) => state.interfaceControls
  );

  const dispatch = useDispatch();

  const toggleMainSidebar = (hidden: boolean) => {
    dispatch(setMainSidebarHidden(hidden));
  };

  const toggleContentSidebar = (hidden: boolean) => {
    dispatch(setContentSidebarHidden(hidden));
  };

  useEffect(() => {
    // used to fix hydration mismatch with theme toggle
    setMounted(true);
  }, []);

  //if navlink has toggleExercises attribute, then it will toggle the exercises sidebar
  //create array with just these links
  const toggleExercisesLinks = navLinks.filter((link) => link.toggleExercises);

  useEffect(() => {
    // whenever activeContent changes (from content sidebar), update active link in main side nav
    if (toggleExercisesLinks.map((link) => link.id).includes(activeContent)) {
      setActiveLink(
        (toggleExercisesLinks.find(
          (link) => link.id === activeContent
        ) as NavLinkItem) || navLinks[1]
      );
    }
  }, [activeContent]);

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
              className={`text-white font-ambit text-xl mt-1 overflow-hidden text-ellipsis transition-opacity ${
                !mainSidebarHidden ? "opacity-100" : "opacity-0"
              }`}
            >
              Edugator
            </h1>
          </div>
        </Link>
      </div>
      {/* Main Sidebar Content */}
      <div className="h-full flex flex-col items-center justify-between py-4 w-full px-4">
        {/* Top Group */}
        <section className="w-full flex flex-col space-y-4">
          {/* Class Group */}
          {/* <div
            className={`flex flex-col space-y-3 transition-all rounded-md ${
              !mainSidebarHidden
                ? "p-2 bg-nav-darkest ring-2 ring-[#060b14]"
                : "p-0"
            }`}
          >
            {classes.map((item, index) => (
              <NavLinkTooltip
                text={`${item.name}: ${item.course}`}
                disabled={!mainSidebarHidden}
                key={index}
              >
                <div
                  onClick={() => {
                    setActiveClass(index);
                    toggleMainSidebar(!mainSidebarHidden);
                  }}
                  className={`w-full flex p-1 transition-all hover:bg-blue-500/10 items-center relative ${
                    activeClass === index && mainSidebarHidden
                      ? "ring-2 ring-blue-500"
                      : ""
                  } ${
                    activeClass === index && !mainSidebarHidden
                      ? "bg-blue-500/10"
                      : ""
                  } ${!mainSidebarHidden ? "rounded-sm" : "rounded-md"}`}
                >
                  <div className="!max-h-[48px] !max-w-[48px] h-full !min-w-[40px]">
                    <AspectRatio.Root
                      ratio={1 / 1}
                      asChild
                      className="rounded-sm relative"
                    >
                      <Image src={item.icon} layout="fill" objectFit="cover" />
                    </AspectRatio.Root>
                  </div>
                  <section
                    className={`flex ml-3 justify-center h-full flex-col whitespace-nowrap overflow-hidden text-left leading-none transition-opacity ${
                      !mainSidebarHidden ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <h1
                      className={`font-bold text-white overflow-hidden text-ellipsis text-sm`}
                    >
                      {item.name}
                    </h1>
                    <p
                      className={`text-white/70 text-xs overflow-hidden text-ellipsis`}
                    >
                      {item.course}
                    </p>
                  </section>
                </div>
              </NavLinkTooltip>
            ))}
            <NavLinkTooltip disabled={!mainSidebarHidden} text="Add Class">
              <div
                className={`w-full rounded-sm relative transition overflow-hidden cursor-pointer px-1 flex items-center group justify-start h-10`}
              >
                <div
                  className={`h-10 w-10 min-w-[2.5rem] rounded-full transition-all items-center justify-center flex ${
                    !mainSidebarHidden ? "bg-white/5" : "group-hover:bg-white/5"
                  }`}
                >
                  <div className="w-3 h-3 min-w-[.75rem]">
                    {icons.plusThin(false)}
                  </div>
                </div>
                <p className="text-white/70 text-xs ml-3 whitespace-nowrap group-hover:text-white transition">
                  Add Class
                </p>
              </div>
            </NavLinkTooltip>
          </div>
          <Divider />*/}
          {/* Button Group */}
          <div className="flex flex-col space-y-2">
            {navLinks.map((link, i) => {
              const toggleExercises = toggleExercisesLinks.includes(link);
              const isActiveLink = activeLink.id === link.id;

              const clickHandler = () => {
                // if link should toggle exercises (view all, lessons, problems)
                if (toggleExercises) {
                  // if link is already active, toggle exercises. if not, show exercises
                  if (isActiveLink) {
                    toggleContentSidebar(!contentSidebarHidden);
                  } else {
                    toggleContentSidebar(false);
                  }
                } else {
                  // if link is not in toggleExercises, close exercises
                  toggleContentSidebar(true);
                }

                setActiveLink(link);

                switch (link.text) {
                  case "View All":
                    setActiveContent("all");
                    break;
                  case "Lessons":
                    setActiveContent("lessons");
                    break;
                  case "Problems":
                    setActiveContent("problems");
                    break;
                  default:
                    break;
                }
              };

              return (
                <NavLink
                  key={i}
                  open={!mainSidebarHidden}
                  icon={link.icon}
                  text={link.text as NavLinkText}
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
              <NavLinkTooltip text="Toggle Theme" disabled={!mainSidebarHidden}>
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
                        !mainSidebarHidden ? "opacity-100" : "opacity-0"
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
          <NavLinkTooltip text="Settings" disabled={!mainSidebarHidden}>
            <div
              className={`w-full cursor-pointer h-12 rounded-md overflow-hidden flex items-center justify-start px-[14px] group space-x-4 text-nav-inactive-light hover:bg-emerald-500/5`}
            >
              <div className="w-5 h-5 min-w-[20px]">{icons.cog(false)}</div>
              <div
                className={`text-sm group-hover:text-white transition text-ellipsis whitespace-nowrap ${
                  !mainSidebarHidden ? "opacity-100" : "opacity-0"
                }`}
              >
                Settings
              </div>
            </div>
          </NavLinkTooltip>
          {/* Divider */}
          <Divider />
          {/* Collapse/Expand Button */}
          <NavLinkTooltip text={"Expand"} disabled={!mainSidebarHidden}>
            <div
              onClick={() => toggleMainSidebar(!mainSidebarHidden)}
              className={`w-full cursor-pointer h-12 rounded-md overflow-hidden flex items-center justify-start px-[14px] group space-x-4 text-nav-inactive-light hover:bg-emerald-500/5`}
            >
              <div
                className={`w-5 h-5 min-w-[20px] transition-transform ${
                  !mainSidebarHidden ? "rotate-180" : ""
                }`}
              >
                {icons.expandArrow(false)}
              </div>
              <div
                className={`text-sm group-hover:text-white transition text-ellipsis whitespace-nowrap ${
                  !mainSidebarHidden ? "opacity-100" : "opacity-0"
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

export default SideNavigation;
