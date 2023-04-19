import { EdugatorLogo, icons } from "components/SideNav/navIcons";
import { useTheme } from "next-themes";
import * as Dialog from "@radix-ui/react-dialog";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import * as Accordion from "@radix-ui/react-accordion";
import * as Tabs from "@radix-ui/react-tabs";
import { useEffect, useState } from "react";
import {
  ChevronDownIcon,
  Cross2Icon,
  DoubleArrowLeftIcon,
} from "@radix-ui/react-icons";
import useNavigation from "hooks/useNavigation";
import { useDispatch } from "react-redux";
import { LocalStorage } from "lib/auth/LocalStorage";
import { createNavStructure } from "utils/CodeEditorUtils";
import { useRouter } from "next/router";
import { navLinks } from "components/SideNav/navigationData";
import Link from "next/link";
import { AnimatePresence, motion as m } from "framer-motion";
import { ContentType } from "../PlaygroundLayout";
import LoadingState from "components/ContentSidebar/LoadingState";
import ErrorState from "components/ContentSidebar/ErrorState";
import { FetchStatus } from "hooks/types";
import {
  ILessonItem,
  INavigationItem,
  IProblemItem,
} from "components/CodeEditor/types";
import {
  ItemPath,
  ModulePath,
} from "components/ContentSidebar/DropDownTree/paths";
import { AccordionContent } from "utils/radixTypes";
import AnimateHeight from "react-animate-height";

const MobileHeader = ({
  activeContent,
  setActiveContent,
  dropdownHeights,
  mobileNavOpen,
  setMobileNavOpen,
}: {
  activeContent: ContentType;
  setActiveContent: (activeContent: ContentType) => void;
  dropdownHeights: Record<number, number>;
  mobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;
}) => {
  const [openModules, setOpenModules] = useState<string[]>([]);

  const { systemTheme, theme, setTheme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;

  const { problemAndLessonSet, status } = useNavigation(
    LocalStorage.getToken() !== null
  );

  const dispatch = useDispatch();

  const navigation = createNavStructure(problemAndLessonSet);

  const router = useRouter();
  const { lessonId, problemId } = router.query;

  const activeId = lessonId || problemId || "";

  const toggleExercisesLinks = navLinks.filter((link) => link.toggleExercises);

  const activeExercise = navigation.find((item) => item._id === activeId);

  //get all lessons and problems from each module
  const allLessonsAndProblems = navigation.reduce(
    (acc, module) => [...acc, ...module.lessons, ...module.problems],
    [] as (ILessonItem | IProblemItem)[]
  );

  const activeItem = allLessonsAndProblems.find(
    (item) => item._id === activeId
  );

  const name = activeItem
    ? "problemName" in activeItem
      ? activeItem.problemName
      : activeItem.lessonName
    : "Select Content";

  return (
    <div className="flex flex-col items-center justify-start w-full h-12">
      <div className="w-full flex items-center justify-between bg-nav-darker px-2 py-1">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-12 h-12 min-w-[3rem] p-1 flex items-center ">
            <EdugatorLogo />
          </div>
        </div>
        {/* Content Select Dropdown */}
        <Dialog.Root open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
          <button
            onClick={() => setMobileNavOpen(true)}
            className="inline-flex max-w-[50%] py-3 text-sm items-center justify-center rounded-[4px] bg-nav-darkest border border-nav-dark px-[15px] font-medium leading-none"
          >
            <span
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
              className="text-white"
            >
              {name}
            </span>
          </button>
          <Dialog.Portal>
            <Dialog.Overlay className="DialogOverlay bg-black/50 fixed inset-0 z-[100]" />
            <Dialog.Content className="DialogContent z-[200] fixed top-[50%] left-[50%] max-h-[85vh] overflow-y-scroll w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-white shadow-xl focus:outline-none">
              <Dialog.Title className="m-0 font-medium py-4 sticky top-0 px-4 bg-nav-darker dark:bg-nav-dark">
                <p className="text-white text-sm">Exercises</p>
              </Dialog.Title>
              <div
                className={`overflow-hidden w-full h-full bg-nav-dark flex-col z-40 border-r border-r-slate-700 `}
              >
                {/* Header */}
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

                            const filteredContent = filterContent(
                              value,
                              activeContent
                            ); // Get content based on activeContent parameter
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
                                  className={`pl-[0.875rem] relative pr-4 group py-3 w-full flex items-center justify-between overflow-hidden`}
                                >
                                  <div className="flex items-center">
                                    <AnimatePresence>
                                      {!isEmpty ? (
                                        <m.div
                                          key={`${value.name}-${primaryIndex}`}
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: 1 }}
                                          exit={{ opacity: 0 }}
                                          className="absolute left-7 top-[50%] dash group-data-[state=open]:dashreverse group-data-[state=closed]:dashreverse origin-bottom"
                                        >
                                          <ModulePath
                                            moduleOpen={openModules.includes(
                                              value.name
                                            )}
                                          />
                                        </m.div>
                                      ) : (
                                        <></>
                                      )}
                                    </AnimatePresence>
                                    <div
                                      className={`w-4 h-4 mx-2 border-2 z-10 border-slate-600 group-data-[state=open]:border-white transition-colors duration-500 bg-nav-dark rounded-full ${
                                        isActiveModule
                                          ? "!border-emerald-500"
                                          : ""
                                      }`}
                                    ></div>
                                    <p className="font-medium text-left text-sm text-white">{`${
                                      primaryIndex + 1
                                    }. ${value.name}`}</p>
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
                                              type === "problem"
                                                ? "code"
                                                : "learn";

                                            return (
                                              <Link
                                                href={`/${urlPath}/${id}`}
                                                key={id}
                                              >
                                                <m.div
                                                  initial={{
                                                    opacity: 0,
                                                    x: 10,
                                                  }}
                                                  animate={{
                                                    opacity: 1,
                                                    x: 0,
                                                    transition: {
                                                      delay:
                                                        secondaryIndex * 0.1,
                                                    },
                                                  }}
                                                  exit={{ opacity: 0 }}
                                                  onClick={() => {
                                                    setMobileNavOpen(false);
                                                  }}
                                                  key={`${primaryIndex}-${secondaryIndex}`}
                                                  className={`relative flex pr-10 pl-8 items-center cursor-pointer justify-start`}
                                                >
                                                  <div className="absolute left-7 bottom-[40%]">
                                                    <ItemPath
                                                      moduleOpen={openModules.includes(
                                                        value.name
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
                                                      WebkitBoxOrient:
                                                        "vertical",
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
                    {/* 
            <HiddenSizingItems
              navigation={navigation}
              activeContent={activeContent}
            /> */}
                  </>
                )}
              </div>

              <Dialog.Close asChild>
                <button
                  className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                  aria-label="Close"
                >
                  <Cross2Icon />
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        {/* Dark Mode Toggle */}
        <div
          className={`h-10 cursor-pointer rounded-md overflow-hidden relative flex items-center justify-between px-[10px] group text-nav-inactive-light hover:bg-blue-500/5`}
          onClick={() => {
            setTheme(currentTheme === "dark" ? "light" : "dark");
          }}
        >
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
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;
