import React, { useEffect, useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/router";
import * as Tabs from "@radix-ui/react-tabs";
import { ContentType } from "components/layouts/PlaygroundLayout";
import { DoubleArrowLeftIcon } from "@radix-ui/react-icons";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import { ItemPath, ModulePath } from "./DropDownTree/paths";
import { navLinks } from "components/navigation/navigationData";
import { AccordionContent } from "utils/radixTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "lib/store/store";
import { setContentSidebarHidden } from "state/interfaceControls.slice";
import { AnimatePresence, motion as m } from "framer-motion";
import AnimateHeight from "react-animate-height";
import {
  CourseModule,
  CourseStructure,
  ModuleContent,
  useGetCourseStructure,
} from "hooks/course/useGetCourseStructure";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ContentSidebar = ({ courseId }: { courseId: string | undefined }) => {
  const [openModules, setOpenModules] = useState<string[]>([]);

  const [activeContent, setActiveContent] = useState<ContentType>("all");

  const {
    data: courseStructure,
    isLoading: courseStructureLoading,
    isError: courseStructureError,
  } = useGetCourseStructure({
    courseId: courseId as string,
    admin: false,
  });

  const { contentSidebarHidden } = useSelector(
    (state: RootState) => state.interfaceControls
  );

  const dispatch = useDispatch();

  const toggleContentSidebar = (hidden: boolean) => {
    dispatch(setContentSidebarHidden(hidden));
  };

  // sizing of dropdowns

  const [dropdownHeights, setDropdownHeights] = useState<
    Record<number, number>
  >({});

  const [shouldRecalculate, recalculate] = useState({});
  const recalculateDropdownHeights = () => recalculate({});

  useEffect(() => {
    calculateDropdownHeights(activeContent);
  }, [activeContent, courseStructure, shouldRecalculate]);

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

  const router = useRouter();
  const { lessonId, problemId } = router.query;

  const activeId = lessonId || problemId || "";

  const toggleExercisesLinks = navLinks.filter((link) => link.toggleExercises);

  return (
    <>
      <ScrollArea.Root
        className={`overflow-auto w-72 min-w-[18rem] h-full bg-nav-dark flex-col  z-40 border-r border-r-slate-700 `}
      >
        {/* Header */}
        <div className="w-full h-[60px] min-h-[60px] flex items-center px-4 bg-nav-darker justify-between border-b border-b-white/10">
          <h1 className="text-white font-dm text-sm">Course Content</h1>
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <div
                onClick={() => {
                  toggleContentSidebar(!contentSidebarHidden);
                }}
                className="w-8 h-8 flex items-center justify-center rounded-md bg-white/5 hover:bg-white/20 transition cursor-pointer"
              >
                <DoubleArrowLeftIcon className="text-slate-300" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="left" sideOffset={5} align="center">
              Collapse
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="w-full">
          <Tabs.Root
            className="flex flex-col w-full border-b border-b-white/10 shadow-inner bg-nav-darker"
            value={activeContent}
            onValueChange={(value) => {
              setActiveContent(value as ContentType);
            }}
          >
            <Tabs.List
              className="shrink-0 flex"
              aria-label="Select content type"
            >
              {toggleExercisesLinks.map((link) => (
                <div className="p-2 flex-1">
                  <Tabs.Trigger
                    key={link.id}
                    className="px-3 py-2 rounded-md transition cursor-pointer data-[state=active]:bg-blue-300/20 border-t data-[state=inactive]:border-transparent data-[state=active]:border-t-white/[0%] w-full flex items-center justify-center text-xs font-dm leading-none text-slate-500 select-none hover:text-white data-[state=active]:text-white outline-none"
                    value={link.id}
                  >
                    {link.text}
                  </Tabs.Trigger>
                </div>
              ))}
            </Tabs.List>
          </Tabs.Root>
        </div>

        {courseStructureLoading ? (
          <LoadingState />
        ) : courseStructureError ? (
          <ErrorState />
        ) : (
          <>
            <Accordion.Root
              onValueChange={(value) => {
                //value is array of open modules
                setOpenModules(value);
              }}
              className="w-full font-dm"
              type="multiple"
            >
              <div className="w-full h-px bg-slate-500"></div>
              {courseStructure &&
                courseStructure.modules.map(
                  (value: CourseModule, primaryIndex: number) => {
                    const filterContent = (
                      contentList: ModuleContent[],
                      activeContent: "problems" | "lessons" | "all"
                    ) => {
                      if (activeContent === "problems") {
                        // filter contentList to only include problems
                        return contentList.filter(
                          (item) => item.contentType === "problem"
                        );
                      } else if (activeContent === "lessons") {
                        // filter contentList to only include lessons
                        return contentList.filter(
                          (item) => item.contentType === "lesson"
                        );
                      } else {
                        return contentList;
                      }
                    };

                    const filteredContent = filterContent(
                      value.content,
                      activeContent
                    ); // Get content based on activeContent parameter
                    const itemCount = filteredContent.length; // number of total problems, lessons or both in a module based on activeContent
                    const isEmpty = itemCount === 0; // if module is empty
                    const allContent = isEmpty
                      ? ([] as ModuleContent[])
                      : (filteredContent as ModuleContent[]); // all problems and lessons in a module based on activeContent
                    const isActiveModule = allContent.some(
                      (item) => item.id === activeId // if module contains the current active content
                    );

                    return (
                      <Accordion.Item
                        value={value.moduleName}
                        key={primaryIndex}
                        className="border-b border-t border-t-slate-700 border-b-slate-950 group dropdown"
                      >
                        <Accordion.Trigger
                          className={`pl-[0.875rem] relative pr-4 group py-3 w-full flex items-center justify-between overflow-hidden`}
                        >
                          <div className="flex items-center">
                            <AnimatePresence>
                              {!isEmpty ? (
                                <m.div
                                  key={`${value.moduleName}-${primaryIndex}`}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  className="absolute left-7 top-[50%] dash group-data-[state=open]:dashreverse group-data-[state=closed]:dashreverse origin-bottom"
                                >
                                  <ModulePath
                                    moduleOpen={openModules.includes(
                                      value.moduleName
                                    )}
                                  />
                                </m.div>
                              ) : (
                                <></>
                              )}
                            </AnimatePresence>
                            <div
                              className={`w-4 h-4 mx-2 border-2 z-10 border-slate-600 group-data-[state=open]:border-white transition-colors duration-500 bg-nav-dark rounded-full ${
                                isActiveModule ? "!border-emerald-500" : ""
                              }`}
                            ></div>
                            <p className="text-left text-sm text-white">{`${
                              primaryIndex + 1
                            }. ${value.moduleName}`}</p>
                          </div>
                          <ChevronDownIcon
                            className="text-white ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
                            aria-hidden
                          />
                        </Accordion.Trigger>
                        <AccordionContent className="AccordionContent">
                          <AnimateHeight
                            contentClassName="h-full"
                            height={
                              allContent.length == 0
                                ? 44
                                : dropdownHeights[primaryIndex]
                            }
                            className="flex flex-col"
                          >
                            <AnimatePresence exitBeforeEnter>
                              {isEmpty ? (
                                <m.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  className={`relative flex px-8 items-center cursor-pointer justify-center `}
                                >
                                  <p className="text-slate-400 text-sm py-3 w-full line text-center">
                                    No Content here :&#40;
                                  </p>
                                </m.div>
                              ) : (
                                allContent.map(
                                  (
                                    item: ModuleContent,
                                    secondaryIndex: number
                                  ) => {
                                    const id = item.id;
                                    //check type of item
                                    //check type of item
                                    const type = item.contentType;

                                    const name = item.title;
                                    const urlPath =
                                      type === "problem" ? "code" : "learn";

                                    return (
                                      <Link
                                        href={{
                                          pathname: `/courses/${courseId}/${type}/${id}`,
                                        }}
                                        key={id}
                                      >
                                        <m.div
                                          initial={{ opacity: 0, x: 10 }}
                                          animate={{
                                            opacity: 1,
                                            x: 0,
                                            transition: {
                                              delay: secondaryIndex * 0.1,
                                            },
                                          }}
                                          exit={{ opacity: 0 }}
                                          key={`${primaryIndex}-${secondaryIndex}`}
                                          className={`relative flex pr-10 pl-8 items-center cursor-pointer justify-start`}
                                        >
                                          <div className="absolute left-7 bottom-[40%]">
                                            <ItemPath
                                              moduleOpen={openModules.includes(
                                                value.moduleName
                                              )}
                                              index={secondaryIndex}
                                            />
                                          </div>
                                          <div
                                            className={`absolute w-[6px] h-[6px] rounded-full top-1/2 -translate-y-1/2 right-5 ${
                                              id === activeId
                                                ? "bg-emerald-500"
                                                : "bg-slate-600"
                                            }`}
                                          ></div>
                                          <div className="w-[2px] min-w-[2px] h-full mr-4 flex flex-col relative"></div>
                                          <p
                                            style={{
                                              //clamp lines to 3
                                              display: "-webkit-box",
                                              WebkitLineClamp: 3,
                                              WebkitBoxOrient: "vertical",
                                              overflow: "hidden",
                                            }}
                                            className="text-white text-sm py-3 w-full line"
                                          >
                                            {`${primaryIndex + 1}.${
                                              secondaryIndex + 1
                                            } ${name}`}
                                          </p>
                                        </m.div>
                                      </Link>
                                    );
                                  }
                                )
                              )}
                            </AnimatePresence>
                          </AnimateHeight>
                        </AccordionContent>
                      </Accordion.Item>
                    );
                  }
                )}
            </Accordion.Root>
          </>
        )}
      </ScrollArea.Root>
      <HiddenSizingItems
        courseStructure={courseStructure as CourseStructure}
        activeContent={activeContent}
      />
    </>
  );
};

export const HiddenSizingItems = ({
  courseStructure,
  activeContent,
}: {
  courseStructure: CourseStructure;
  activeContent: "problems" | "lessons" | "all";
}) => {
  return (
    <div className="w-full absolute pointer-events-none -z-10 opacity-0">
      {/* Sizing Elements to animate height (stay hidden) */}
      {courseStructure &&
        courseStructure.modules.map(
          (value: CourseModule, primaryIndex: number) => {
            const filterContent = (
              contentList: ModuleContent[],
              activeContent: "problems" | "lessons" | "all"
            ) => {
              if (activeContent === "problems") {
                // filter contentList to only include problems
                return contentList.filter(
                  (item) => item.contentType === "problem"
                );
              } else if (activeContent === "lessons") {
                // filter contentList to only include lessons
                return contentList.filter(
                  (item) => item.contentType === "lesson"
                );
              } else {
                return contentList;
              }
            };

            const filteredContent = filterContent(value.content, activeContent); // Get content based on activeContent parameter
            const itemCount = filteredContent.length; // number of total problems, lessons or both in a module based on activeContent
            const isEmpty = itemCount === 0; // if module is empty
            const allContent = isEmpty
              ? ([] as ModuleContent[])
              : (filteredContent as ModuleContent[]); // all problems and lessons in a module based on activeContent

            return allContent.map(
              (item: ModuleContent, secondaryIndex: number) => {
                const id = item.id;
                //check type of item
                const type = item.contentType;
                const name = item.title;

                return (
                  <div key={id}>
                    <div
                      className={`relative flex pr-10 pl-8 items-center cursor-pointer justify-start ${primaryIndex}-${type} ${primaryIndex}-content`}
                    >
                      <div className="w-[2px] min-w-[2px] h-full mr-4 flex flex-col relative"></div>
                      <p
                        style={{
                          //clamp lines to 3
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                        className="text-white text-sm py-3 w-full line"
                      >
                        {`${primaryIndex + 1}.${secondaryIndex + 1} ${name}`}
                      </p>
                    </div>
                  </div>
                );
              }
            );
          }
        )}
    </div>
  );
};

export default ContentSidebar;
