import useNavigation from "hooks/useNavigation";
import React, { useEffect } from "react";
import { LocalStorage } from "lib/auth/LocalStorage";
import { FetchStatus } from "hooks/types";
import * as Accordion from "@radix-ui/react-accordion";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { createNavStructure } from "utils/CodeEditorUtils";
import {
  ILessonItem,
  INavigationItem,
  IProblemItem,
} from "components/CodeEditor/types";
import Link from "next/link";
import { useRouter } from "next/router";
import * as Tabs from "@radix-ui/react-tabs";
import { ContentType } from "components/PlaygroundLayout";
import { DoubleArrowLeftIcon } from "@radix-ui/react-icons";

const AccordionContent = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <Accordion.Content
    className={
      "data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden" +
      (className ? ` ${className}` : "")
    }
    {...props}
  >
    <div className="">{children}</div>
  </Accordion.Content>
);

const ContentSidebar = ({
  hidden,
  setHidden,
  activeContent,
  setActiveContent,
}: {
  hidden: boolean;
  setHidden: (hidden: boolean) => void;
  activeContent: ContentType;
  setActiveContent: (activeContent: ContentType) => void;
}) => {
  const [openModules, setOpenModules] = React.useState<string[]>([]);

  const { problemAndLessonSet, status } = useNavigation(
    LocalStorage.getToken() !== null
  );

  const navigation = createNavStructure(problemAndLessonSet);

  const router = useRouter();
  const { lessonId, problemId } = router.query;

  const activeId = lessonId || problemId || "";

  useEffect(() => {
    var path = document.querySelector("path");
    var length = path?.getTotalLength() || 0;
    console.log("length", length);
  }, []);

  return (
    <ScrollArea.Root
      className={`overflow-hidden w-72 min-w-[18rem] h-full bg-nav-dark flex flex-col !absolute top-0 z-20 border-r border-r-slate-700 transition-all ${
        hidden ? "-left-[207px]" : "left-[81px]"
      }`}
    >
      <ScrollArea.Viewport className="w-full h-full">
        {/* Header */}
        <div className="w-full h-20 min-h-[5rem] flex items-center px-6 justify-between">
          <h1 className="text-white font-dm font-medium text-lg">Exercises</h1>
          <div
            onClick={() => {
              setHidden(!hidden);
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
              <Tabs.Trigger
                className="px-3 py-3 transition data-[state=active]:border-b data-[state=inactive]:border-b-slate-400 data-[state=active]:border-b-emerald-500 flex-1 flex items-center justify-center text-sm font-dm leading-none text-slate-500 select-none hover:text-white data-[state=active]:text-white outline-none cursor-default"
                value="all"
              >
                View All
              </Tabs.Trigger>
              <Tabs.Trigger
                className="px-3 py-3 transition data-[state=active]:border-b data-[state=inactive]:border-b-slate-400 data-[state=active]:border-b-emerald-500 flex-1 flex items-center justify-center text-sm font-dm leading-none text-slate-500 select-none hover:text-white data-[state=active]:text-white outline-none cursor-default"
                value="lessons"
              >
                Lessons
              </Tabs.Trigger>
              <Tabs.Trigger
                className="px-3 py-3 transition data-[state=active]:border-b data-[state=inactive]:border-b-slate-400 data-[state=active]:border-b-emerald-500 flex-1 flex items-center justify-center text-sm font-dm leading-none text-slate-500 select-none hover:text-white data-[state=active]:text-white outline-none cursor-default"
                value="problems"
              >
                Problems
              </Tabs.Trigger>
            </Tabs.List>
          </Tabs.Root>
        </div>

        {status === FetchStatus.loading ? (
          <div className="flex flex-col items-center justify-start h-full p-3 space-y-4">
            <div className="w-full h-12 rounded-md bg-slate-700 animate-pulse"></div>
            <div className="w-full h-12 rounded-md bg-slate-700/80 animate-pulse"></div>
            <div className="w-full h-12 rounded-md bg-slate-700/60 animate-pulse"></div>
            <div className="w-full h-12 rounded-md bg-slate-700/20 animate-pulse"></div>
            <div className="w-full h-12 rounded-md bg-slate-700/10 animate-pulse"></div>
          </div>
        ) : status === FetchStatus.failed ? (
          <div className="flex flex-col items-center justify-start h-full p-3 space-y-4">
            <div className="w-full h-12 rounded-md bg-red-500/20 animate-pulse"></div>
            <div className="w-full h-12 rounded-md bg-red-500/20 animate-pulse"></div>
            <div className="w-full h-12 rounded-md bg-red-500/20 animate-pulse"></div>
            <div className="w-full h-12 rounded-md bg-red-500/20 animate-pulse"></div>
          </div>
        ) : (
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
              navigation.map((value: INavigationItem, primaryIndex: number) => {
                const itemCount = value.problems.length + value.lessons.length;

                const allContent =
                  itemCount === 0 ? [] : [...value.problems, ...value.lessons];

                const isActiveModule = allContent.some(
                  (item) => item._id === activeId
                );

                return (
                  <Accordion.Item
                    value={value.name}
                    key={primaryIndex}
                    className="border-t border-slate-700 last:border-b group"
                  >
                    <Accordion.Trigger className="pl-[0.875rem] overflow-hidden relative pr-4 group py-3 w-full flex items-center justify-between">
                      <div className="flex items-center space-x-2 ">
                        <div className="absolute left-7 top-[50%] dash group-data-[state=open]:dashreverse group-data-[state=closed]:dashreverse transition-transform duration-500 origin-bottom">
                          {itemCount > 0 ? (
                            <svg
                              width="12"
                              height="120"
                              viewBox="0 0 18 218"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.7619 1.5791V204.575C1.7619 209.416 5.58548 216.34 16.1739 216.34"
                                stroke="#42454F"
                                stroke-width="4"
                                stroke-linecap="round"
                                strokeDasharray={
                                  openModules.includes(value.name)
                                    ? "1000"
                                    : "0"
                                }
                                strokeDashoffset={
                                  openModules.includes(value.name)
                                    ? "1000"
                                    : "0"
                                }
                                style={
                                  openModules.includes(value.name)
                                    ? {
                                        animationName: "dash",
                                        animationDuration: "1s",
                                        animationTimingFunction: "ease-in",
                                        animationFillMode: "forwards",
                                        animationDelay: `0`,
                                        animationDirection: "normal",
                                      }
                                    : {}
                                }
                                className={`transition-colors duration-300 ${
                                  openModules.includes(value.name)
                                    ? "stroke-slate-700"
                                    : "stroke-nav-dark"
                                }`}
                              />
                            </svg>
                          ) : (
                            <></>
                          )}
                        </div>
                        <div
                          className={`w-4 h-4 border-2 z-10 border-slate-600 group-data-[state=open]:border-white transition-colors duration-500 bg-nav-dark rounded-full ${
                            isActiveModule ? "!border-emerald-500" : ""
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
                    <AccordionContent>
                      <div className="flex flex-col">
                        {itemCount === 0 ? (
                          <div
                            className={`relative flex px-8 items-center cursor-pointer justify-center `}
                          >
                            <p className="text-slate-400 text-sm py-3 w-full line text-center">
                              No Content here :&#40;
                            </p>
                          </div>
                        ) : (
                          allContent.map(
                            (
                              item: IProblemItem | ILessonItem,
                              secondaryIndex: number
                            ) => {
                              const id = item._id;
                              //check type of item
                              const type =
                                "problemName" in item ? "problem" : "lesson";
                              const name =
                                "problemName" in item
                                  ? item.problemName
                                  : item.lessonName;
                              const urlPath =
                                type === "problem" ? "code" : "learn";

                              return (
                                <Link href={`/${urlPath}/${id}`} key={id}>
                                  <div
                                    key={`${primaryIndex}-${secondaryIndex}`}
                                    className={`relative flex pr-10 pl-8 items-center cursor-pointer justify-start `}
                                  >
                                    <div className="absolute left-7 bottom-[40%]">
                                      <svg
                                        width="12"
                                        height="120"
                                        viewBox="0 0 18 218"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          id="curved-path"
                                          d="M1.7619 1.5791V204.575C1.7619 209.416 5.58548 216.34 16.1739 216.34"
                                          stroke="#42454F"
                                          stroke-width="4"
                                          stroke-linecap="round"
                                          strokeDasharray="1000"
                                          strokeDashoffset="1000"
                                          style={{
                                            animationName: "dash",
                                            animationDuration: "4s",
                                            animationTimingFunction:
                                              "cubic-bezier(0.33, 1, 0.68, 1)",
                                            animationFillMode: "forwards",
                                            animationDelay: `${
                                              secondaryIndex * 0.2 - 0.05
                                            }s`,
                                            animationDirection: "normal",
                                            animationIterationCount: "1",
                                          }}
                                          className={`transition-all duration-300  path ${
                                            openModules.includes(value.name)
                                              ? "stroke-slate-700"
                                              : "stroke-nav-dark"
                                          }`}
                                        />
                                      </svg>
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
                                  </div>
                                </Link>
                              );
                            }
                          )
                        )}
                      </div>
                    </AccordionContent>
                    <Accordion.Content className="AccordionContent flex flex-col overflow-hidden bg-slate-800"></Accordion.Content>
                  </Accordion.Item>
                );
              })}
          </Accordion.Root>
        )}
        <ScrollArea.Scrollbar
          className="flex select-none touch-none p-0.5 bg-slate-600/60 transition duration-[160ms] ease-out hover:bg-white/20 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="flex-1 bg-slate-400 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Scrollbar
          className="flex select-none touch-none p-0.5 bg-slate-600/60 transition duration-[160ms] ease-out hover:bg-white/20 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
          orientation="horizontal"
        >
          <ScrollArea.Thumb className="flex-1 bg-slate-400 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner className="bg-white/20" />
      </ScrollArea.Viewport>
    </ScrollArea.Root>
  );
};

export default ContentSidebar;
