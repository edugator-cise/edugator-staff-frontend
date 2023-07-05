import React, { useEffect, useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
  DoubleArrowDownIcon,
  DoubleArrowUpIcon,
  HeightIcon,
  Pencil1Icon,
  Pencil2Icon,
  PlusIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
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
import { IProblemBase } from "lib/shared/types";
import apiClient from "lib/api/apiClient";
import { apiRoutes } from "constants/apiRoutes";
import { changeProblemOrderSuccess } from "state/ModulesSlice";
import { toast } from "react-hot-toast";
import Modal from "components/shared/Modals/Modal";
import * as Tooltip from "@radix-ui/react-tooltip";
import {
  CourseModule,
  CourseStructure,
  ModuleContent,
  useGetCourseStructure,
} from "hooks/course/useGetCourseStructure";
import { useCreateModule } from "hooks/module/useCreateModule";
import AlertModal from "components/shared/Modals/AlertModal";
import { useDeleteModule } from "hooks/module/useDeleteModule";
import { useDeleteLesson } from "hooks/lesson/useDeleteLesson";
import { toTitleCase } from "utils/textUtils";

const AddModuleModal = ({
  open,
  setOpen,
  moduleCount,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  moduleCount: number;
}) => {
  const [moduleName, setModuleName] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    mutate,
    isLoading: createModuleLoading,
    isError: createModuleError,
  } = useCreateModule();

  const handleCreateModule = async () => {
    console.log(moduleCount);
    setLoading(true);
    await mutate({ moduleName, orderNumber: moduleCount + 1 });
    setLoading(false);
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title="Add Module"
      description="Enter a name for your new module."
    >
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          id="module-name"
          className="w-full py-2 text-base rounded-md border border-slate-300 bg-white text-slate-800 px-3 font-dm outline-none"
          placeholder="My new module"
          value={moduleName}
          onChange={(e) => setModuleName(e.target.value)}
        />

        <div className="flex justify-end items-center">
          <button
            className="px-4 py-2 rounded-md bg-emerald-500 hover:bg-emerald-600 text-white font-dm text-sm flex items-center space-x-2 disabled:bg-emerald-500/50 disabled:cursor-not-allowed transition"
            disabled={moduleName.length === 0 || loading}
            onClick={handleCreateModule}
          >
            {loading ? (
              <div className="bouncing-loader py-2">
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : (
              <>
                <PlusIcon />
                <p>Create Module</p>
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

const DeleteModuleModal = ({
  open,
  setOpen,
  moduleId,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  moduleId: string;
}) => {
  const [loading, setLoading] = useState(false);

  const {
    mutate,
    isLoading: deleteModuleLoading,
    isError: deleteModuleError,
  } = useDeleteModule();

  const handleDeleteModule = async () => {
    setLoading(true);
    await mutate(moduleId);
    setLoading(false);
    setOpen(false);
  };

  return (
    <AlertModal
      open={open}
      setOpen={setOpen}
      title="Delete Module"
      description="Are you sure you want to delete this module? All content in this module will be deleted. This action cannot be undone."
      onConfirm={handleDeleteModule}
      onCancel={() => setOpen(false)}
      confirmText="Delete Module"
    />
  );
};

const AdminContentSidebar = ({
  activeContent,
  setActiveContent,
  dropdownHeights,
}: {
  activeContent: ContentType;
  setActiveContent: (activeContent: ContentType) => void;
  dropdownHeights: Record<number, number>;
}) => {
  const [openModules, setOpenModules] = useState<string[]>([]);
  const [newModuleModalOpen, setNewModuleModalOpen] = useState(false);
  const [deleteModuleModalOpen, setDeleteModuleModalOpen] = useState(false);

  const [moduleToDelete, setModuleToDelete] = useState<string>("");

  const openDeleteModuleModal = (moduleId: string) => {
    setModuleToDelete(moduleId);
    setDeleteModuleModalOpen(true);
  };

  // content sidebar hidden controls + state (VISUAL)
  const dispatch = useDispatch();

  const toggleContentSidebar = (hidden: boolean) => {
    dispatch(setAdminContentSidebarHidden(hidden));
  };

  const { adminContentSidebarHidden } = useSelector(
    (state: RootState) => state.interfaceControls
  );

  const {
    data: courseStructure,
    isLoading: courseStructureLoading,
    isError: courseStructureError,
  } = useGetCourseStructure();

  const { mutate: deleteLesson } = useDeleteLesson();

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
          <h1 className="text-white font-dm text-lg">Exercises</h1>
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

        {courseStructureLoading ? (
          <LoadingState />
        ) : courseStructureError ? (
          <ErrorState />
        ) : (
          <>
            {courseStructure && (
              <>
                <AddModuleModal
                  open={newModuleModalOpen}
                  setOpen={setNewModuleModalOpen}
                  moduleCount={courseStructure?.modules.length}
                />
                <DeleteModuleModal
                  open={deleteModuleModalOpen}
                  setOpen={setDeleteModuleModalOpen}
                  moduleId={moduleToDelete}
                />
              </>
            )}
            <Accordion.Root
              onValueChange={(value) => {
                //value is array of open modules
                setOpenModules(value);
              }}
              className="w-full font-dm"
              type="multiple"
            >
              <div className="w-full h-px bg-slate-500"></div>
              {courseStructure && courseStructure.modules.length === 0 && (
                <div className="flex items-center justify-center px-4 py-4">
                  <p className="text-slate-400 text-sm py-3 w-full line text-center">
                    Looks like you have no content yet. Add a module below to
                    get started!
                  </p>
                </div>
              )}
              {courseStructure &&
                courseStructure.modules.map(
                  (value: CourseModule, primaryIndex: number) => {
                    const filterContent = (
                      contentList: ModuleContent[],
                      activeContent: "problems" | "lessons" | "all"
                    ) => {
                      if (activeContent === "problems") {
                        return contentList.map(
                          (item) => item.contentType === "problem"
                        );
                      } else if (activeContent === "lessons") {
                        return contentList.map(
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
                        className="border-b border-slate-700 last:border-b group dropdown"
                      >
                        <Accordion.Trigger
                          className={`pl-4 relative pr-4 group py-2 w-full flex items-center justify-between overflow-hidden`}
                        >
                          <div className="flex items-center">
                            <p className="text-left text-sm text-white">
                              <span className="text-slate-300 mr-1">{`${
                                primaryIndex + 1
                              }.`}</span>
                              {`${value.moduleName}`}
                            </p>
                          </div>
                          <div className="flex space-x-2 items-center">
                            <Tooltip.Provider delayDuration={100}>
                              <Tooltip.Root>
                                <Tooltip.Trigger asChild>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();

                                      openDeleteModuleModal(value.id);
                                    }}
                                    className="p-2 rounded-md hover:bg-nav-darker flex items-center justify-center"
                                  >
                                    <TrashIcon className="text-red-400 w-4 h-4" />
                                    {/* <Pencil1Icon className="text-white w-4 h-4" /> */}
                                  </button>
                                </Tooltip.Trigger>
                                <Tooltip.Portal>
                                  <Tooltip.Content
                                    side="left"
                                    sideOffset={5}
                                    align="center"
                                    className={`z-50 TooltipContent data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade bg-red-700 text-white font-dm text-xs rounded-md p-2`}
                                  >
                                    Delete Module
                                  </Tooltip.Content>
                                </Tooltip.Portal>
                              </Tooltip.Root>
                            </Tooltip.Provider>

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
                                    item: ModuleContent,
                                    secondaryIndex: number
                                  ) => {
                                    const id = item.id;
                                    //check type of item
                                    const type = item.contentType;
                                    "problemName" in item
                                      ? "problem"
                                      : "lesson";
                                    const name = item.title;
                                    const urlPath =
                                      type === "problem" ? "code" : "learn";

                                    return (
                                      <Link
                                        href={`/admin/${type}/edit/${id}?moduleName=${encodeURIComponent(
                                          value.moduleName
                                        )}&moduleId=${encodeURIComponent(
                                          value.id
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
                                          className={`relative flex pr-14 pl-0 items-center cursor-pointer justify-start bg-nav-darker hover:bg-nav-darkest border-b border-nav-dark ${
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
                                                align="start"
                                                className="DropdownMenuContent font-dm data-[side=bottom]:animate-slideUpAndFade min-w-[200px] z-50 bg-white rounded-md p-2"
                                                sideOffset={5}
                                              >
                                                <Link
                                                  href={`/admin/${type}/edit/${id}?moduleName=${encodeURIComponent(
                                                    value.moduleName
                                                  )}&moduleId=${encodeURIComponent(
                                                    value.id
                                                  )}`}
                                                  key={id}
                                                >
                                                  <DropdownMenu.Item className="space-x-2 group text-xs leading-none rounded-sm flex items-center py-[10px] text-slate-800 px-2 relative pl-2 select-none outline-none data-[disabled]:text-gray-300 data-[disabled]:pointer-events-none data-[highlighted]:bg-gray-100 data-[highlighted]:text-gray-700">
                                                    <Pencil2Icon />
                                                    <p>
                                                      Edit {toTitleCase(type)}
                                                    </p>
                                                  </DropdownMenu.Item>
                                                </Link>
                                                {/*
                                                <DropdownMenu.Sub>
                                                  <DropdownMenu.SubTrigger className="justify-between group text-xs leading-none rounded-sm flex items-center py-[10px] text-slate-800 px-2 relative pl-2 select-none outline-none data-[state=open]:bg-violet4 data-[state=open] data-[disabled]:text-gray-300 data-[disabled]:pointer-events-none data-[highlighted]:bg-gray-100 data-[highlighted]:text-gray-700 data-[highlighted]:data-[state=open]:bg-slate-100 data-[highlighted]:data-[state=open]:text-gray-600">
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
                                                      className="DropdownMenuContent font-dm data-[state=open]:animate-slideLeftAndFade  min-w-[180px] z-50 bg-white rounded-md p-2 shadow-2xl"
                                                      sideOffset={2}
                                                      alignOffset={-5}
                                                    >
                                                      <DropdownMenu.Item
                                                        onClick={() => {}}
                                                        className="space-x-2 text-xs leading-none rounded-sm flex items-center py-[10px] text-slate-800 px-2 relative pl-2 select-none outline-none data-[disabled]:text-gray-300 data-[disabled]:pointer-events-none data-[highlighted]:bg-gray-100 data-[highlighted]:text-gray-700"
                                                      >
                                                        <DoubleArrowUpIcon />
                                                        <p>Move Up</p>
                                                      </DropdownMenu.Item>
                                                      <DropdownMenu.Item
                                                        onClick={() => {}}
                                                        className="space-x-2 text-xs leading-none rounded-sm flex items-center py-[10px] text-slate-800 px-2 relative pl-2 select-none outline-none data-[disabled]:text-gray-300 data-[disabled]:pointer-events-none data-[highlighted]:bg-gray-100 data-[highlighted]:text-gray-700"
                                                      >
                                                        <DoubleArrowDownIcon />
                                                        <p>Move Down</p>
                                                      </DropdownMenu.Item>
                                                    </DropdownMenu.SubContent>
                                                  </DropdownMenu.Portal>
                                                </DropdownMenu.Sub>
                                                  */}
                                                <DropdownMenu.Separator className="h-[1px] bg-slate-200 m-2" />
                                                <DropdownMenu.Item
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    e.preventDefault();
                                                    type === "problem"
                                                      ? console.log("problem")
                                                      : deleteLesson(id);
                                                  }}
                                                  className="group text-xs space-x-2 leading-none rounded-sm flex items-center py-[10px] px-2 relative pl-2 select-none outline-none data-[disabled]:text-gray-300 data-[disabled]:pointer-events-none data-[highlighted]:bg-red-100 data-[highlighted]:text-red-600 bg-red-50 text-red-600"
                                                >
                                                  <TrashIcon />
                                                  <p>
                                                    Delete {toTitleCase(type)}
                                                  </p>
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
                          <div className="flex items-center justify-center px-4 py-4 bg-nav-darkest/90">
                            <div className="flex space-x-2 w-full">
                              <Link
                                href={`/admin/lesson/create/${
                                  value.id
                                }?moduleName=${encodeURIComponent(
                                  value.moduleName
                                )}`}
                              >
                                <div className="flex items-center bg-nav-darker justify-center w-full px-2 space-x-2 py-3 cursor-pointer group/lessonbutton border dash border-blue-500/30 rounded-md">
                                  <PlusIcon className="w-4 h-4 text-slate-100/60 group-hover/lessonbutton:text-white" />
                                  <p className="text-slate-100/60 group-hover/lessonbutton:text-white text-xs pointer-events-none">
                                    Add Lesson
                                  </p>
                                </div>
                              </Link>
                              <Link
                                href={`/admin/problem/create/${
                                  value.id
                                }?moduleName=${encodeURIComponent(
                                  value.moduleName
                                )}`}
                              >
                                <div className="flex items-center bg-nav-darker justify-center w-full px-2 space-x-2 py-3 cursor-pointer group/problembutton border border-blue-500/30 rounded-md">
                                  <PlusIcon className="w-4 h-4 text-slate-100/60 group-hover/problembutton:text-white" />
                                  <p className="text-slate-100/60 group-hover/problembutton:text-white text-xs pointer-events-none">
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
                <button
                  onClick={() => {
                    setNewModuleModalOpen(true);
                  }}
                  className="flex space-x-2 items-center justify-center w-full px-2 py-3 group/modulebutton border border-blue-500/60 border-dashed rounded-md"
                >
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
        //navigation={navigation}
        courseStructure={courseStructure as CourseStructure}
        activeContent={activeContent}
      />
    </>
  );
};

export const HiddenSizingItems = ({
  //navigation,
  courseStructure,
  activeContent,
}: {
  //navigation: INavigationItem[];
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
                return contentList.map(
                  (item) => item.contentType === "problem"
                );
              } else if (activeContent === "lessons") {
                return contentList.map((item) => item.contentType === "lesson");
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
                "problemName" in item ? "problem" : "lesson";
                const name = item.title;

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
          }
        )}
    </div>
  );
};

export default AdminContentSidebar;
