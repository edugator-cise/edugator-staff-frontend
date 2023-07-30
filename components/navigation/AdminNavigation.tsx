import { EdugatorLogo, icons } from "components/navigation/navIcons";
import { RootState } from "lib/store/store";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAdminContentSidebarHidden,
  setAdminMainSidebarHidden,
} from "state/interfaceControls.slice";
import { adminNavLinks, NavLinkItem } from "./navigationData";
import { NavLink } from "./NavLink";
import { NavLinkTooltip } from "./NavLinkTooltip";
import { sampleCourses } from "state/courseSlice";
import Image from "next/image";
import * as Select from "@radix-ui/react-select";
import {
  CaretSortIcon,
  CheckIcon,
  ChevronDownIcon,
  ExitIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { COURSE_STRUCTURE_QUERY_KEY } from "hooks/course/useGetCourseStructure";
import { useQueryClient } from "@tanstack/react-query";
import {
  useRive,
  useStateMachineInput,
  Layout,
  Fit,
  Alignment,
} from "@rive-app/react-canvas";

const Divider = () => {
  return <div className="w-full h-px bg-slate-600"></div>;
};

const AdminNavigation = ({ courseId }: { courseId: string | undefined }) => {
  const [mounted, setMounted] = useState(false);

  const { adminMainSidebarHidden, adminContentSidebarHidden } = useSelector(
    (state: RootState) => state.interfaceControls
  );

  const dispatch = useDispatch();

  const toggleMainSidebar = (hidden: boolean) => {
    dispatch(setAdminMainSidebarHidden(hidden));
  };

  useEffect(() => {
    // used to fix hydration mismatch with theme toggle
    setMounted(true);
  }, []);

  const router = useRouter();

  const { systemTheme, theme, setTheme } = useTheme();

  // force light theme
  useEffect(() => {
    setTheme("light");
  }, [mounted]);

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <nav
      className={`flex font-dm border-r border-r-white/10 overflow-hidden h-full bg-nav-darker dark:bg-[#212b3b] flex-col items-center justify-start`}
    >
      {/* Logo */}

      {/* Main Sidebar Content */}
      <div className="h-full flex flex-col items-center justify-between pb-[10px] w-full">
        {/* Class Group */}
        {courseId ? <CourseSection /> : <div></div>}
        {/* Bottom Group */}
        <div className="w-full space-y-0">
          {/* Profile */}
          {/* <UserButton hidden={adminMainSidebarHidden} /> */}

          {/* Divider */}
          <Divider />
          {/* Collapse/Expand Button */}
          <NavLinkTooltip text={"Expand"} disabled={!adminMainSidebarHidden}>
            <div
              onClick={() => toggleMainSidebar(!adminMainSidebarHidden)}
              className={`w-full border rounded-none px-[18px] border-transparent py-4 cursor-pointer transition-all overflow-hidden box-border flex items-center justify-start group space-x-4 text-nav-inactive-light hover:bg-blue-300/5 `}
            >
              <div
                className={`w-[20px] h-[20px] min-w-[20px] transition-transform ${
                  !adminMainSidebarHidden ? "rotate-180" : ""
                }`}
              >
                {icons.expandArrow(false)}
              </div>
              <label
                className={`group-hover:text-white font-dm text-[13px] select-none pointer-events-none transition text-ellipsis whitespace-nowrap ${
                  !adminMainSidebarHidden ? "opacity-100" : "opacity-0"
                }`}
              >
                Collapse
              </label>
            </div>
          </NavLinkTooltip>
        </div>
      </div>
    </nav>
  );
};

export const CourseSection = () => {
  const STATE_MACHINE_NAME = "Motion";
  const INPUT_NAME = "Active";
  const RIVE_URL =
    "https://public.rive.app/hosted/187312/79189/UJxBjnBe9kmIIFqRhyPqbQ.riv";

  const {
    rive,
    RiveComponent,
    setContainerRef,
    setCanvasRef,
    canvas,
    container,
  } = useRive(
    {
      src: RIVE_URL,
      autoplay: true,
      stateMachines: STATE_MACHINE_NAME,
    },
    {
      useDevicePixelRatio: true,
      shouldResizeCanvasToContainer: true,
    }
  );

  // set the canvas container ref
  const containerRef = useRef<HTMLDivElement>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      setContainerRef(containerRef.current);
    }
  }, [containerRef]);

  useEffect(() => {
    if (canvasRef.current) {
      setCanvasRef(canvasRef.current);
    }
  }, [canvasRef]);

  const activeInput = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    INPUT_NAME
  );

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

  const router = useRouter();

  useEffect(() => {
    if (activeInput) {
      if (adminContentSidebarHidden) {
        //set activeInput to false
        activeInput.value = false;
      } else {
        //set activeInput to true
        activeInput.value = true;
      }
    }
  }, [adminContentSidebarHidden]);

  const queryClient = useQueryClient();
  const { pathname } = router;
  const { courseId } = router.query;

  return (
    <section className="w-full flex flex-col">
      {/* <label
        className={`text-xs text-white/50 leading-6 uppercase tracking-wide font-bold ${
          adminMainSidebarHidden ? "text-center" : "text-left"
        }`}
      >
        {adminMainSidebarHidden ? <p>•••</p> : <p>Course</p>}
      </label> */}
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
        <Select.Trigger
          className={`flex bg-black/20 font-dm relative items-center justify-between transition-all space-x-2 rounded-[7px] text-sm leading-none w-full text-white data-[placeholder]:text-slate-400 ${
            adminMainSidebarHidden ? "p-[11px]" : "p-4"
          }`}
          aria-label="Select an organization"
        >
          <div className="flex items-center space-x-4 whitespace-nowrap truncate">
            <div
              className={` transition-all rounded-md relative ${
                adminMainSidebarHidden
                  ? "min-w-[2.25rem] h-9 w-9"
                  : "h-10 w-10 min-w-[2.5rem]"
              }`}
            >
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
              className={`truncate w-full transition !max-w-[160px] pb-[1px] text-sm ${
                adminMainSidebarHidden ? "opacity-0" : "opacity-100"
              }`}
            >
              <Select.Value placeholder="Select a course" />
              <p className="text-xs text-white/40 font-sans text-left truncate">
                Student / Instructor
              </p>
            </div>
          </div>
          <CaretSortIcon
            className={`absolute right-3 top-1/2 -translate-y-1/2 duration-300 ${
              adminMainSidebarHidden ? "opacity-0" : "opacity-100"
            }`}
          />
        </Select.Trigger>
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
      <div className="w-full h-px bg-white/10"></div>

      {/* Button Group */}
      <div
        className={`flex flex-col space-y-2 transition-all ${
          adminMainSidebarHidden ? "px-2 pt-2" : "px-4 pt-4"
        }`}
      >
        {adminNavLinks.map((link, i) => {
          const toggleExercises = link.id === "content";
          const isActiveLink = activeLink.id === link.id;

          const clickHandler = () => {
            // IF ID is content and active link is content, toggle content sidebar but don't push to href
            // if id is content and active link is not content, toggle content sidebar and push to href
            // if id is not content, toggle content sidebar to false and push to href
            if (link.id === "content" && activeLink.id === "content") {
              toggleContentSidebar(!adminContentSidebarHidden);
              return;
            } else if (link.id === "content" && activeLink.id !== "content") {
              toggleContentSidebar(false);
            } else {
              toggleContentSidebar(true);
            }

            router.push({
              pathname: `/courses/${courseId}${link.href}`,
            });

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

          if (link.id === "content") {
            return (
              <NavLinkTooltip text={"RIVE"} disabled={adminMainSidebarHidden}>
                <button
                  onClick={() => {
                    clickHandler();
                  }}
                  className={`w-full border border-transparent h-[42px] transition rounded-[6px] overflow-hidden box-border flex items-center justify-start pl-2 pr-[10px] group space-x-4 ${
                    activeLink.id === "content" ||
                    pathname.includes("content") ||
                    pathname.includes("lesson") ||
                    pathname.includes("problem")
                      ? "bg-blue-300/20 text-white "
                      : "text-nav-inactive-light hover:bg-blue-300/5"
                  }`}
                >
                  <div
                    className={`w-[23px] h-[23px] min-w-[23px] ${
                      activeLink.id === "content" ||
                      pathname.includes("content") ||
                      pathname.includes("lesson") ||
                      pathname.includes("problem")
                        ? ""
                        : "grayscale"
                    }`}
                  >
                    <RiveComponent />
                  </div>

                  {/* <div className="w-[20px] h-[20px] min-w-[20px]">{icon(active)}</div> */}
                  <label
                    className={`group-hover:text-white font-dm text-[13px] pointer-events-none transition text-ellipsis whitespace-nowrap ${
                      !adminMainSidebarHidden ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    Course Content
                  </label>
                </button>
              </NavLinkTooltip>
            );
          }
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
