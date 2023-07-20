import { EdugatorLogo, icons } from "components/navigation/navIcons";
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
import { sampleCourses, setCourseId } from "state/courseSlice";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import * as Select from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, PlusIcon } from "@radix-ui/react-icons";
import { COURSE_STRUCTURE_QUERY_KEY } from "hooks/course/useGetCourseStructure";
import { useQueryClient } from "@tanstack/react-query";

const Divider = () => {
  return <div className="w-full h-px bg-slate-600"></div>;
};

const AdminNavigation = () => {
  const [activeLink, setActiveLink] = useState<NavLinkItem>(adminNavLinks[0]);
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

  const activeCourseId = useSelector(
    (state: RootState) => state.course.courseId
  );

  const queryClient = useQueryClient();
  const router = useRouter();
  const { pathname } = router;

  const { systemTheme, theme, setTheme } = useTheme();

  // force light theme
  useEffect(() => {
    setTheme("light");
  }, [mounted]);

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
        {/* Class Group */}
        {/* Top Group */}
        <section className="w-full flex flex-col space-y-4">
          {/* <div className="rounded-md h-16 w-full bg-white/[7.5%] border-t border-t-white/[10%]">
            <div className="w-4 h-4 bg-white/5"></div>
          </div> */}
          <Select.Root
            onValueChange={(value) => {
              queryClient.invalidateQueries([
                COURSE_STRUCTURE_QUERY_KEY,
                value,
              ]);
              router.push(`/admin/dashboard`);
              dispatch(setCourseId(value));
            }}
            value={activeCourseId}
          >
            {/* add in 'bg-gradient-t-b' for depth below */}
            <div className="overflow-hidden bg-[#3A3F49] dark:bg-[#484F5B] from-[#3A3F49] dark:from-[#484F5B] via-[#242934] dark:via-[#242934] via-[12px] to-[#242934] dark:to-[#242934] cursor-pointer rounded-lg group p-px flex items-center group justify-center transition duration-200 ease-in-out">
              <Select.Trigger
                className={`flex font-dm relative items-center justify-between transition-all space-x-2 rounded-[7px] text-sm leading-none bg-[#242934] dark:bg-[#333B49] w-full text-white data-[placeholder]:text-slate-400 ${
                  adminMainSidebarHidden ? "p-[3px]" : "p-2"
                }`}
                aria-label="Select an organization"
              >
                <div className="flex items-center space-x-4 whitespace-nowrap truncate">
                  <div className="h-10 w-10 min-w-[2.5rem] rounded-md relative">
                    <Image
                      placeholder="empty"
                      src={
                        sampleCourses.find(
                          (course) => course.id === activeCourseId
                        )?.logo ||
                        "https://images.unsplash.com/photo-1622837137196-4b3b8b0b0b0e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xhc3N8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
                      }
                      alt={
                        sampleCourses.find(
                          (course) => course.id === activeCourseId
                        )?.courseName || "Course Logo"
                      }
                      layout="fill"
                      objectFit="cover"
                      className="rounded-[4px] z-10"
                    />
                  </div>
                  <div
                    className={`truncate transition ${
                      adminMainSidebarHidden ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    <Select.Value placeholder="Select a course" />
                  </div>
                </div>
                <ChevronDownIcon
                  className={`absolute right-3 top-1/2 -translate-y-1/2 duration-300 ${
                    adminMainSidebarHidden ? "opacity-0" : "opacity-100"
                  }`}
                />
              </Select.Trigger>
            </div>
            <Select.Portal>
              <Select.Content
                position="popper"
                side={adminMainSidebarHidden ? "right" : "bottom"}
                sideOffset={adminMainSidebarHidden ? 18 : -48}
                align={adminMainSidebarHidden ? "start" : "center"}
                className={`SelectContent bg-[#3A3F49] dark:bg-[#484F5B]  from-[#3A3F49] dark:from-[#484F5B] via-[#242934] dark:via-[#242934] via-[12px] to-[#242934] dark:to-[#242934] p-px z-50 font-dm data-[state=closed]:animate-slideUp overflow-hidden rounded-lg ${
                  adminMainSidebarHidden
                    ? "w-[250px]"
                    : "w-[calc(var(--radix-select-trigger-width)+16px)]"
                }`}
              >
                {/* add in 'bg-gradient-t-b' for depth above */}
                <Select.Viewport className="bg-[#242934] dark:bg-[#333B49] rounded-[7px]">
                  <Select.Group>
                    <Select.Label className="text-xs leading-[25px] text-gray-400 py-[6px] px-3 !font-bold">
                      Select course
                    </Select.Label>
                    {sampleCourses?.map((course) => (
                      <Select.Item
                        key={course.id}
                        value={course.id}
                        className="text-sm space-x-4 leading-none text-white flex items-center py-2 transition px-3 relative select-none data-[disabled]:text-slate-500 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-[#2F343E] dark:data-[highlighted]:bg-[#3D4552] data-[highlighted]:border-y-[#3A3F49] dark:data-[highlighted]:border-y-[#484F5B] border-y border-y-transparent cursor-pointer data-[highlighted]:text-white"
                      >
                        <div className="h-10 w-10 min-w-[2.5rem] rounded-md relative">
                          <Image
                            placeholder="empty"
                            src={course.logo}
                            alt={course.courseName}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                          />
                        </div>
                        <div className="flex flex-col justify-center space-y-1 max-w-[calc(100%-90px)]">
                          <div className="truncate ">
                            <Select.ItemText>
                              {course.courseName}
                            </Select.ItemText>
                          </div>
                          <p className="text-xs text-white/40">0 students</p>
                        </div>
                        <Select.ItemIndicator className="absolute right-2 p-1 bg-[#46474A] rounded-full inline-flex items-center justify-center">
                          <CheckIcon />
                        </Select.ItemIndicator>
                      </Select.Item>
                    ))}
                    <button className="text-xs leading-[25px] text-gray-400 w-full flex items-center justify-start space-x-2 hover:bg-[#2F343E] dark:hover:bg-[#3D4552] hover:border-t-[#3A3F49] dark:hover:border-t-[#484F5B] border-t border-t-transparent py-[6px] px-3 !font-bold">
                      <PlusIcon />
                      <p>Create new course</p>
                    </button>
                  </Select.Group>
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>

          {/* Button Group */}
          <div className="flex flex-col space-y-2 !mt-8">
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

                // if link has href, push to href
                if (link.href) {
                  router.push(link.href);
                }

                setActiveLink(link);
              };

              // if route contains either "problem" or "lesson", then 1 is active.
              // if admincontentsidebar is hidden, then 0 should be active. otherwise, 1 should be active
              const activeIndex = () => {
                if (
                  pathname.includes("problem") ||
                  pathname.includes("lesson")
                ) {
                  return 1;
                } else {
                  return adminContentSidebarHidden ? 0 : 1;
                }
              };

              return (
                <NavLink
                  key={i}
                  open={!adminMainSidebarHidden}
                  icon={link.icon}
                  text={link.text}
                  active={i === activeIndex()}
                  onClick={clickHandler}
                />
              );
            })}
          </div>
        </section>
        {/* Bottom Group */}
        <div className="w-full space-y-4">
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
