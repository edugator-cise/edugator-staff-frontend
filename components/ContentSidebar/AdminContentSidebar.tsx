import useNavigation from "hooks/useNavigation";
import React, { useEffect } from "react";
import { LocalStorage } from "lib/auth/LocalStorage";
import { FetchStatus } from "hooks/types";
import * as Accordion from "@radix-ui/react-accordion";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  DotFilledIcon,
  DotsHorizontalIcon,
  DotsVerticalIcon,
  DoubleArrowDownIcon,
  DoubleArrowUpIcon,
  HamburgerMenuIcon,
  HeightIcon,
  Pencil1Icon,
  Pencil2Icon,
  PlusIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { createNavStructure } from "utils/CodeEditorUtils";
import {
  ILessonItem,
  INavigationItem,
  IProblemItem,
} from "components/CodeEditor/types";
import Link from "next/link";
import { useRouter } from "next/router";
import * as Tabs from "@radix-ui/react-tabs";
import { ContentType } from "components/PlaygroundLayout/PlaygroundLayout";
import { DoubleArrowLeftIcon } from "@radix-ui/react-icons";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import { navLinks } from "components/SideNav/navigationData";
import { AccordionContent } from "utils/radixTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "lib/store/store";
import { setAdminContentSidebarHidden } from "state/interfaceControls.slice";
import { AnimatePresence, motion as m } from "framer-motion";
import AnimateHeight from "react-animate-height";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

const AdminContentSidebar = ({
  activeContent,
  setActiveContent,
  dropdownHeights,
}: {
  activeContent: ContentType;
  setActiveContent: (activeContent: ContentType) => void;
  dropdownHeights: Record<number, number>;
}) => {
  const [openModules, setOpenModules] = React.useState<string[]>([]);

  const { problemAndLessonSet, status } = useNavigation(
    LocalStorage.getToken() !== null
  );

  const { adminContentSidebarHidden } = useSelector(
    (state: RootState) => state.interfaceControls
  );

  const dispatch = useDispatch();

  const toggleContentSidebar = (hidden: boolean) => {
    dispatch(setAdminContentSidebarHidden(hidden));
  };

  const navigation = createNavStructure(problemAndLessonSet);

  const router = useRouter();
  const { lessonId, problemId } = router.query;

  const activeId = lessonId || problemId || "";

  const toggleExercisesLinks = navLinks.filter((link) => link.toggleExercises);

  return (
    <>
      <ScrollArea.Root
        className={`overflow-auto w-[350px] min-w-[350px] h-full bg-nav-dark flex-col z-40 border-r border-r-slate-700 `}
      >
        {/* Header */}
        <div className="w-full h-20 min-h-[5rem] flex items-center px-6 justify-between">
          <h1 className="text-white font-dm font-medium text-lg">Exercises</h1>
          <div
            onClick={() => {
              toggleContentSidebar(!adminContentSidebarHidden);
            }}
            className="w-8 h-8 flex items-center justify-center rounded-md bg-white/5 hover:bg-white/20 transition cursor-pointer"
          >
            <DoubleArrowLeftIcon className="text-slate-300" />
          </div>
        </div>
        <div className="w-full">
          <Tabs.Root
            className="flex flex-col w-full rounded-md"
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
                <Tabs.Trigger
                  key={link.id}
                  className="px-3 py-3 transition data-[state=active]:border-b data-[state=inactive]:border-b-slate-400 data-[state=active]:border-b-emerald-500 flex-1 flex items-center justify-center text-sm font-dm leading-none text-slate-500 select-none hover:text-white data-[state=active]:text-white outline-none cursor-default"
                  value={link.id}
                >
                  {link.text}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
          </Tabs.Root>
        </div>

        {status === FetchStatus.loading ? (
          <LoadingState />
        ) : status === FetchStatus.failed ? (
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
              {navigation &&
                navigation.map(
                  (value: INavigationItem, primaryIndex: number) => {
                    const filterContent = (
                      contentList: INavigationItem,
                      activeContent: "problems" | "lessons" | "all"
                    ) => {
                      if (activeContent === "problems") {
                        return contentList.problems;
                      } else if (activeContent === "lessons") {
                        return contentList.lessons;
                      } else {
                        return [
                          ...contentList.problems,
                          ...contentList.lessons,
                        ];
                      }
                    };

                    const filteredContent = filterContent(value, activeContent); // Get content based on activeContent parameter
                    const itemCount = filteredContent.length; // number of total problems, lessons or both in a module based on activeContent
                    const isEmpty = itemCount === 0; // if module is empty
                    const allContent = isEmpty ? [] : filteredContent; // all problems and lessons in a module based on activeContent
                    const isActiveModule = allContent.some(
                      (item) => item._id === activeId // if module contains the current active content
                    );

                    return (
                      <Accordion.Item
                        value={value.name}
                        key={primaryIndex}
                        className="border-t border-slate-700 last:border-b group dropdown"
                      >
                        <Accordion.Trigger
                          className={`pl-4 relative pr-4 group py-2 w-full flex items-center justify-between overflow-hidden`}
                        >
                          <div className="flex items-center">
                            <p className="font-medium text-left text-sm text-white">
                              <span className="text-slate-300 mr-1">{`${
                                primaryIndex + 1
                              }.`}</span>
                              {`${value.name}`}
                            </p>
                          </div>
                          <div className="flex space-x-2 items-center">
                            <div className="p-2 rounded-md hover:bg-nav-darker flex items-center justify-center">
                              <Pencil1Icon className="text-white w-4 h-4" />
                            </div>
                            <ChevronDownIcon
                              className="text-white ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
                              aria-hidden
                            />
                          </div>
                        </Accordion.Trigger>
                        <AccordionContent className="AccordionContent">
                          <AnimateHeight
                            contentClassName="h-full bg-nav-darker"
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
                                  className={`relative flex px-4 items-center cursor-pointer justify-center `}
                                >
                                  <p className="text-slate-400 text-sm py-3 w-full line text-center">
                                    No Content here :&#40;
                                  </p>
                                </m.div>
                              ) : (
                                allContent.map(
                                  (
                                    item: IProblemItem | ILessonItem,
                                    secondaryIndex: number
                                  ) => {
                                    const id = item._id;
                                    //check type of item
                                    const type =
                                      "problemName" in item
                                        ? "problem"
                                        : "lesson";
                                    const name =
                                      "problemName" in item
                                        ? item.problemName
                                        : item.lessonName;
                                    const urlPath =
                                      type === "problem" ? "code" : "learn";

                                    return (
                                      <Link
                                        href={`/admin/${type}/edit/${id}?moduleName=${encodeURIComponent(
                                          value.name
                                        )}&moduleId=${encodeURIComponent(
                                          value._id
                                        )}`}
                                        key={id}
                                      >
                                        <m.div
                                          initial={{ opacity: 0 }}
                                          animate={{
                                            opacity: 1,
                                            transition: {
                                              delay: secondaryIndex * 0.1,
                                            },
                                          }}
                                          exit={{ opacity: 0 }}
                                          key={`${primaryIndex}-${secondaryIndex}`}
                                          className={`relative flex pr-14 pl-0 items-center cursor-pointer justify-start bg-nav-darker hover:bg-nav-darkest border-t border-t-nav-dark/90 ${
                                            id === activeId
                                              ? "!bg-nav-darkest"
                                              : ""
                                          }`}
                                        >
                                          <DropdownMenu.Root>
                                            <DropdownMenu.Trigger asChild>
                                              <button
                                                className={`absolute rounded-md p-1 group/dotgroup top-1/2 -translate-y-1/2 right-4 hover:bg-slate-800`}
                                              >
                                                <DotsHorizontalIcon
                                                  className={`w-4 h-4 group-hover/dotgroup:text-white ${
                                                    id === activeId
                                                      ? "text-white"
                                                      : "text-slate-400"
                                                  }`}
                                                />
                                              </button>
                                            </DropdownMenu.Trigger>

                                            <DropdownMenu.Portal>
                                              <DropdownMenu.Content
                                                side="bottom"
                                                className="DropdownMenuContent font-dm data-[side=bottom]:animate-slideUpAndFade min-w-[200px] z-50 bg-white rounded-md p-1"
                                                sideOffset={5}
                                              >
                                                <DropdownMenu.Item className="space-x-2 group text-xs leading-none rounded-sm flex items-center py-3 px-2 relative pl-2 select-none outline-none data-[disabled]:text-gray-300 data-[disabled]:pointer-events-none data-[highlighted]:bg-gray-100 data-[highlighted]:text-gray-700">
                                                  <Pencil2Icon />
                                                  <p>Edit Problem</p>
                                                </DropdownMenu.Item>

                                                <DropdownMenu.Sub>
                                                  <DropdownMenu.SubTrigger className="justify-between group text-xs leading-none rounded-sm flex items-center py-3 px-2 relative pl-2 select-none outline-none data-[state=open]:bg-violet4 data-[state=open] data-[disabled]:text-gray-300 data-[disabled]:pointer-events-none data-[highlighted]:bg-gray-100 data-[highlighted]:text-gray-700 data-[highlighted]:data-[state=open]:bg-slate-100 data-[highlighted]:data-[state=open]:text-gray-600">
                                                    <div className="space-x-2 flex items-center">
                                                      <HeightIcon />
                                                      <p>Reorder Problem</p>
                                                    </div>
                                                    <div className="ml-auto text-slate-800 group-data-[highlighted]:text-gray-700 group-data-[disabled]:text-gray-300">
                                                      <ChevronRightIcon />
                                                    </div>
                                                  </DropdownMenu.SubTrigger>
                                                  <DropdownMenu.Portal>
                                                    <DropdownMenu.SubContent
                                                      className="DropdownMenuContent data-[state=open]:animate-slideLeftAndFade  min-w-[180px] z-50 bg-white rounded-md p-1 shadow-2xl"
                                                      sideOffset={2}
                                                      alignOffset={-5}
                                                    >
                                                      <DropdownMenu.Item className="space-x-2 text-xs leading-none rounded-sm flex items-center py-3 px-2 relative pl-2 select-none outline-none data-[disabled]:text-gray-300 data-[disabled]:pointer-events-none data-[highlighted]:bg-gray-100 data-[highlighted]:text-gray-700">
                                                        <DoubleArrowUpIcon />
                                                        <p>Move Up</p>
                                                      </DropdownMenu.Item>
                                                      <DropdownMenu.Item className="space-x-2 text-xs leading-none rounded-sm flex items-center py-3 px-2 relative pl-2 select-none outline-none data-[disabled]:text-gray-300 data-[disabled]:pointer-events-none data-[highlighted]:bg-gray-100 data-[highlighted]:text-gray-700">
                                                        <DoubleArrowDownIcon />
                                                        <p>Move Down</p>
                                                      </DropdownMenu.Item>
                                                    </DropdownMenu.SubContent>
                                                  </DropdownMenu.Portal>
                                                </DropdownMenu.Sub>

                                                <DropdownMenu.Separator className="h-[1px] bg-slate-200 m-2" />
                                                <DropdownMenu.Item className="group text-xs space-x-2 leading-none rounded-sm flex items-center py-3 px-2 relative pl-2 select-none outline-none data-[disabled]:text-gray-300 data-[disabled]:pointer-events-none data-[highlighted]:bg-red-100 data-[highlighted]:text-red-600 bg-red-50 text-red-600">
                                                  <TrashIcon />
                                                  <p>Delete Problem</p>
                                                </DropdownMenu.Item>
                                                <DropdownMenu.Arrow className="fill-white" />
                                              </DropdownMenu.Content>
                                            </DropdownMenu.Portal>
                                          </DropdownMenu.Root>

                                          <div className="w-[2px] min-w-[2px] h-full mr-4 flex flex-col relative"></div>
                                          <p
                                            style={{
                                              //clamp lines to 3
                                              display: "-webkit-box",
                                              WebkitLineClamp: 3,
                                              WebkitBoxOrient: "vertical",
                                              overflow: "hidden",
                                            }}
                                            className="text-white text-sm py-4 w-full line"
                                          >
                                            <span className="text-slate-500 mr-1">
                                              {`${primaryIndex + 1}.${
                                                secondaryIndex + 1
                                              }`}
                                            </span>{" "}
                                            {`${name}`}
                                          </p>
                                        </m.div>
                                      </Link>
                                    );
                                  }
                                )
                              )}
                            </AnimatePresence>
                          </AnimateHeight>
                          <div className="flex items-center justify-center px-4 py-4 bg-nav-darker">
                            <div className="flex space-x-2 w-full">
                              <button className="flex items-center justify-center w-full px-2 space-x-2 py-3 group/lessonbutton border dash border-blue-500/60 border-dashed rounded-md">
                                <PlusIcon className="w-4 h-4 text-slate-100/60 group-hover/lessonbutton:text-white" />
                                <p className="text-slate-100/60 group-hover/lessonbutton:text-white text-sm">
                                  Add Lesson
                                </p>
                              </button>
                              <Link
                                href={`/admin/problem/create/${
                                  value._id
                                }?moduleName=${encodeURIComponent(value.name)}`}
                              >
                                <div className="flex items-center justify-center w-full px-2 space-x-2 py-3 group/problembutton border border-blue-500/60 border-dashed rounded-md">
                                  <PlusIcon className="w-4 h-4 text-slate-100/60 group-hover/problembutton:text-white" />
                                  <p className="text-slate-100/60 group-hover/problembutton:text-white text-sm pointer-events-none">
                                    Add Problem
                                  </p>
                                </div>
                              </Link>
                            </div>
                          </div>
                        </AccordionContent>
                      </Accordion.Item>
                    );
                  }
                )}
              <div className="flex items-center justify-center px-4 py-4">
                <button className="flex space-x-2 items-center justify-center w-full px-2 py-3 group/modulebutton border border-blue-500/60 border-dashed rounded-md">
                  <PlusIcon className="w-4 h-4 text-slate-100/60 group-hover/modulebutton:text-white" />
                  <p className="text-slate-100/60 group-hover/modulebutton:text-white text-sm">
                    Add Module
                  </p>
                </button>
              </div>
            </Accordion.Root>
          </>
        )}
      </ScrollArea.Root>
      <HiddenSizingItems
        navigation={navigation}
        activeContent={activeContent}
      />
    </>
  );
};

export const HiddenSizingItems = ({
  navigation,
  activeContent,
}: {
  navigation: INavigationItem[];
  activeContent: "problems" | "lessons" | "all";
}) => {
  return (
    <div className="w-full absolute pointer-events-none -z-10 opacity-0">
      {/* Sizing Elements to animate height (stay hidden) */}
      {navigation &&
        navigation.map((value: INavigationItem, primaryIndex: number) => {
          const filterContent = (
            contentList: INavigationItem,
            activeContent: "problems" | "lessons" | "all"
          ) => {
            if (activeContent === "problems") {
              return contentList.problems;
            } else if (activeContent === "lessons") {
              return contentList.lessons;
            } else {
              return [...contentList.problems, ...contentList.lessons];
            }
          };

          const filteredContent = filterContent(value, activeContent);

          const allContent = [...value.problems, ...value.lessons];

          return allContent.map(
            (item: IProblemItem | ILessonItem, secondaryIndex: number) => {
              const id = item._id;
              const name =
                "problemName" in item ? item.problemName : item.lessonName;
              const type = "problemName" in item ? "problem" : "lesson";

              return (
                <div key={id}>
                  <div
                    className={`relative font-dm flex pr-14 pl-0 items-center cursor-pointer justify-start ${primaryIndex}-${type}-admin ${primaryIndex}-content-admin`}
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
                      className="text-white text-sm py-4 w-full line"
                    >
                      <span className="text-slate-500 mr-1">
                        {`${primaryIndex + 1}.${secondaryIndex + 1}`}
                      </span>{" "}
                      {`${name}`}
                    </p>
                  </div>
                </div>
              );
            }
          );
        })}
    </div>
  );
};

export default AdminContentSidebar;
