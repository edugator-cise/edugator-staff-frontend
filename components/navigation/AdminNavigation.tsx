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
import {
  Course,
  sampleCourses,
  setCourse,
  setCourseId,
} from "state/courseSlice";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ExitIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { COURSE_STRUCTURE_QUERY_KEY } from "hooks/course/useGetCourseStructure";
import { useQueryClient } from "@tanstack/react-query";
import { useClerk, useUser } from "@clerk/nextjs";
import * as Popover from "@radix-ui/react-popover";
import * as Tooltip from "@radix-ui/react-tooltip";

const Divider = () => {
  return <div className="w-full h-px bg-slate-600"></div>;
};

const UserButton = ({ hidden }: { hidden?: boolean }) => {
  const { user } = useClerk();

  const imageUrl = user?.imageUrl;
  const firstName = user?.firstName || "First";
  const lastName = user?.lastName || "Last";
  const email = user?.emailAddresses[0].emailAddress || "";

  return (
    <Popover.Root>
      <Popover.Trigger
        disabled={!hidden}
        className={`w-full rounded-md overflow-hidden transition-all flex items-center justify-start  group space-x-4 text-nav-inactive-light ${
          hidden
            ? "p-2 cursor-pointer pl-[8px] pr-[15px]"
            : "ring-1 ring-slate-800 p-3 bg-black/20"
        }`}
      >
        <div className="w-8 h-8 min-w-[32px] rounded-full relative focus:ring-2 outline-none transition">
          <Image
            src={
              imageUrl ||
              "https://t4.ftcdn.net/jpg/04/08/24/43/360_F_408244382_Ex6k7k8XYzTbiXLNJgIL8gssebpLLBZQ.jpg"
            }
            alt="User profile picture"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
        <div
          className={`flex space-y-0 flex-col transition items-start overflow-hidden ${
            !hidden ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-sm font-dm text-white/70 truncate max-w-full">
            {firstName} {lastName}
          </p>
          <p className="text-xs text-white/40 font-sans truncate max-w-[calc(100%-30px)]">
            {email}
          </p>
        </div>
        <Tooltip.Provider disableHoverableContent delayDuration={150}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild disabled={hidden}>
              <div
                className={`absolute right-8 cursor-pointer p-1 w-7 h-7 duration-300 flex items-center justify-center hover:bg-white/20 transition rounded-md ${
                  hidden ? "opacity-0 hidden" : "opacity-100"
                }`}
              >
                <ExitIcon className="text-white/70" />
              </div>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                side="top"
                className="TooltipContent z-[100] data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade text-sm font-dm select-none rounded-[4px] bg-nav-darker border border-slate-700 text-slate-300 px-3 py-2 leading-none will-change-[transform,opacity]"
                sideOffset={10}
              >
                <p className="text-xs">Sign Out</p>
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </Popover.Trigger>
      <Popover.Content
        align="end"
        side="right"
        sideOffset={6}
        alignOffset={12}
        className="PopoverContent border-[#3A3F49] dark:border-[#484F5B] bg-[#242934] dark:bg-[#333B49] min-w-[200px] max-w-[300px] border rounded-lg shadow-md flex flex-col"
      >
        <ul className="space-y-2">
          <li className="flex space-x-4 items-center p-4 pb-2 rounded-sm ">
            <div className="w-10 h-10 min-w-[40px] rounded-full relative focus:ring-2 outline-none transition">
              <Image
                src={
                  imageUrl ||
                  "https://t4.ftcdn.net/jpg/04/08/24/43/360_F_408244382_Ex6k7k8XYzTbiXLNJgIL8gssebpLLBZQ.jpg"
                }
                alt="User profile picture"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col space-y-0 overflow-hidden">
              <p className="text-sm font-dm font-semibold text-white whitespace-nowrap truncate max-w-full">
                {firstName} {lastName}
              </p>
              <p className="text-xs text-gray-400 truncate whitespace-nowrap">
                {email}
              </p>
            </div>
          </li>
          <div className="w-full h-px bg-[#3A3F49] dark:bg-[#484F5B]"></div>
          <div className="flex flex-col space-y-1 pb-2">
            <li className="px-4 hover:bg-[#2F343E] dark:hover:bg-[#3D4552] hover:border-y-[#3A3F49] dark:hover:border-y-[#484F5B] border-y border-y-transparent hover:text-white py-2 group flex space-x-3 cursor-pointer items-center transition">
              <ExitIcon className="text-gray-500 group-hover:text-white/80 transition" />
              <p className="text-[13px] text-gray-400 font-sans transition group-hover:text-white truncate max-w-full">
                Sign Out
              </p>
            </li>
          </div>
        </ul>
      </Popover.Content>
    </Popover.Root>
  );
};

const AdminNavigation = ({ courseId }: { courseId: string | undefined }) => {
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
      <div className="flex items-center h-16 w-full bg-gradient-to-tl from-nav-darker dark:from-[#212b3b] dark:via-[#212b3b] dark:to-emerald-700/40 via-nav-darker to-emerald-900/40 px-4">
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
        {courseId ? <CourseSection /> : <div></div>}
        {/* Bottom Group */}
        <div className="w-full space-y-4">
          {/* Profile */}
          <UserButton hidden={adminMainSidebarHidden} />

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
                className={`text-[13px] font-sans group-hover:text-white transition text-ellipsis whitespace-nowrap ${
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

export const CourseSection = () => {
  const [activeLink, setActiveLink] = useState<NavLinkItem>(adminNavLinks[0]);

  const { adminMainSidebarHidden } = useSelector(
    (state: RootState) => state.interfaceControls
  );

  const dispatch = useDispatch();

  const toggleMainSidebar = (hidden: boolean) => {
    dispatch(setAdminMainSidebarHidden(hidden));
  };

  const toggleContentSidebar = (hidden: boolean) => {
    dispatch(setAdminContentSidebarHidden(hidden));
  };

  const { adminContentSidebarHidden } = useSelector(
    (state: RootState) => state.interfaceControls
  );

  const toggleExercisesLinks = adminNavLinks.filter(
    (link) => link.toggleExercises
  );

  const router = useRouter();

  const queryClient = useQueryClient();
  const { pathname } = router;
  const { courseId } = router.query;

  return (
    <section className="w-full flex flex-col space-y-2">
      <label
        className={`text-xs text-white/50 leading-6 uppercase tracking-wide font-bold ${
          adminMainSidebarHidden ? "text-center" : "text-left"
        }`}
      >
        {adminMainSidebarHidden ? <p>•••</p> : <p>Course</p>}
      </label>
      <Select.Root
        onValueChange={(value) => {
          queryClient.invalidateQueries([COURSE_STRUCTURE_QUERY_KEY, value]);
          router.push({
            pathname: `/courses/${value}`,
          });
          //dispatch(setCourseId(value));
          console.log(sampleCourses.find((c) => c.id === value));
          /* dispatch(
            setCourse(sampleCourses.find((c) => c.id === value) as Course)
          ); */
        }}
        value={courseId as string | undefined}
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
                    sampleCourses.find((course) => course.id === courseId)
                      ?.logo ||
                    "https://images.unsplash.com/photo-1622837137196-4b3b8b0b0b0e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xhc3N8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
                  }
                  alt={
                    sampleCourses.find((course) => course.id === courseId)
                      ?.courseName || "Course Logo"
                  }
                  layout="fill"
                  objectFit="cover"
                  className="rounded-[4px] z-10"
                />
              </div>
              <div
                className={`truncate w-full transition !max-w-[160px] pb-[1px] ${
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
            sideOffset={adminMainSidebarHidden ? 10 : -48}
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
                      <div className="truncate pb-[1px]">
                        <Select.ItemText>{course.courseName}</Select.ItemText>
                      </div>
                      <p className="text-xs text-white/40 font-sans">
                        0 students
                      </p>
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
      <div className="flex flex-col space-y-2 !mt-4">
        {adminNavLinks.map((link, i) => {
          const toggleExercises = link.id === "content";
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
              // one case to disable navigation: if active link is "content" and clicked link is "content"
              if (activeLink.id === "content" && link.id === "content") {
                return;
              } else {
                console.log(activeLink.id, link.id);
              }
              // push to courseId plus link href
              router.push({
                pathname: `/courses/[courseId]${link.href}`,
                query: {
                  courseId,
                },
              });
            }

            setActiveLink(link);
          };

          // if route contains either "problem" or "lesson", then 1 is active.
          // if admincontentsidebar is hidden, then 0 should be active. otherwise, 1 should be active
          const activeIndex = () => {
            if (
              pathname.includes("problem") ||
              pathname.includes("lesson") ||
              pathname.includes("content")
            ) {
              return 1;
            } else if (pathname.includes("roster")) {
              return 2;
            } else {
              return 0;
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
  );
};

export default AdminNavigation;
