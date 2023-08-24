import React, { useEffect, useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import {
  ChevronDownIcon,
  DotsHorizontalIcon,
  DragHandleDots2Icon,
  LineHeightIcon,
  Pencil2Icon,
  PlusIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { useRouter } from "next/router";
import * as Tabs from "@radix-ui/react-tabs";
import { ContentType } from "components/layouts/PlaygroundLayout";
import { DoubleArrowLeftIcon } from "@radix-ui/react-icons";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import { navLinks } from "components/navigation/navigationData";
import { AccordionContent } from "utils/radixTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "lib/store/store";
import { setAdminContentSidebarHidden } from "state/interfaceControls.slice";
import { AnimatePresence, motion as m, Reorder } from "framer-motion";
import AnimateHeight from "react-animate-height";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Modal from "components/shared/Modals/Modal";
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
import { toTitleCase } from "@/lib/textUtils";
import { DeleteLessonModal } from "components/lesson/admin/LessonEditor";
import { useDeleteProblem } from "hooks/problem/useDeleteProblem";
import { DeleteProblemModal } from "components/problem/admin/ProblemEditor";
import { Trash } from "tabler-icons-react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
  ResponderProvided,
} from "react-beautiful-dnd";
import {
  ReorderContent,
  useReorderContent,
} from "hooks/reorder/useReorderContent";
import apiClient from "lib/api/apiClient";
import { apiRoutes } from "constants/apiRoutes";
import { toast } from "react-hot-toast";
import {
  ReorderModule,
  useReorderModule,
} from "hooks/reorder/useReorderModule";
import { Separator } from "@/components/ui/separator";

export const AddModuleModal = ({
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
  const dispatch = useDispatch();

  const toggleContentSidebar = (hidden: boolean) => {
    dispatch(setAdminContentSidebarHidden(hidden));
  };

  const {
    mutate,
    isLoading: createModuleLoading,
    isError: createModuleError,
  } = useCreateModule();

  const handleCreateModule = async () => {
    console.log(moduleCount);
    setLoading(true);
    toggleContentSidebar(false);
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
  courseId,
}: {
  courseId: string | undefined;
}) => {
  const [openModules, setOpenModules] = useState<string[]>([]);

  // modal controls

  const [newModuleModalOpen, setNewModuleModalOpen] = useState(false);
  const [deleteModuleModalOpen, setDeleteModuleModalOpen] = useState(false);
  const [deleteLessonModalOpen, setDeleteLessonModalOpen] = useState(false);
  const [deleteProblemModalOpen, setDeleteProblemModalOpen] = useState(false);

  const [moduleToDelete, setModuleToDelete] = useState<string>("");
  const [itemToDelete, setItemToDelete] = useState<string>("");

  const [activeContent, setActiveContent] = useState<ContentType>("all");

  const {
    data: courseStructure,
    isLoading: courseStructureLoading,
    isError: courseStructureError,
  } = useGetCourseStructure({
    courseId: courseId as string,
    admin: true,
  });

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
        document.getElementsByClassName(`${i}-content-admin`)
      ).reduce((acc, el) => acc + el.clientHeight + 0.6, 0);

      const lessonHeight = Array.from(
        document.getElementsByClassName(`${i}-lesson-admin`)
      ).reduce((acc, el) => acc + el.clientHeight + 0.6, 0);

      const problemHeight = Array.from(
        document.getElementsByClassName(`${i}-problem-admin`)
      ).reduce((acc, el) => acc + el.clientHeight + 0.6, 0);

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

  const router = useRouter();
  const { lessonId, problemId } = router.query;

  const {
    mutate: deleteLesson,
    isLoading: deleteLessonLoading,
    isError: deleteLessonError,
  } = useDeleteLesson();

  const removeLesson = async () => {
    await deleteLesson(itemToDelete as string);
    setDeleteLessonModalOpen(false);

    if (lessonId && lessonId === itemToDelete) {
      router.push({
        pathname: "/courses/[courseId]",
        query: { courseId: courseId },
      });
    }
  };

  const {
    mutate: deleteProblem,
    isLoading: deleteProblemLoading,
    isError: deleteProblemError,
  } = useDeleteProblem();

  const removeProblem = async () => {
    await deleteProblem(itemToDelete as string);
    setDeleteProblemModalOpen(false);
    /* setSettingsOpen(false); */
    // navigate to module page
    if (problemId && problemId === itemToDelete) {
      router.push({
        pathname: "/courses/[courseId]",
        query: { courseId: courseId },
      });
    }
  };

  const activeId = lessonId || problemId || "";

  const toggleExercisesLinks = navLinks.filter((link) => link.toggleExercises);

  const [reorderingContent, setReorderingContent] = useState(false);
  const [reorderedModules, setReorderedModules] = useState<CourseModule[]>(
    courseStructure?.modules || []
  );

  useEffect(() => {
    console.log("rererere");
    setReorderedModules(courseStructure?.modules || []);
  }, [courseStructure]);

  useEffect(() => {
    recalculateDropdownHeights();
  }, [reorderedModules]);

  //REORDER LOGIC

  const { mutateAsync: reorderModule } = useReorderModule();

  const handleModuleDragEnd = (
    result: DropResult,
    provided: ResponderProvided
  ) => {
    console.log(result);
    console.log(provided);
    const { destination, source } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    // here we need to reorderContent, and if successful, update the reorderedModules state
    // if not successful, revert the reorderedModules state

    //get contentType from after | in draggableId
    const id = result.draggableId.split("|")[0];
    const contentType = result.draggableId.split("|")[1];
    console.log(destination.index);
    const newOrderNumber = destination.index + 1;

    const reorderModulePayload: ReorderModule = {
      id,
      newOrderNumber,
    };

    //store old order in case mutate fails
    const oldContent = Array.from(reorderedModules);

    // optimistically update content
    const newContent = Array.from(reorderedModules);
    const [reorderedItem] = newContent.splice(source.index, 1);
    newContent.splice(destination.index, 0, reorderedItem);
    setReorderedModules(newContent);

    // now mutate and revert if fails

    console.log(newContent);

    reorderModule(reorderModulePayload).catch((err) => {
      console.log(err);
      toast.error("Something went wrong. Please try again.");
      setReorderedModules(oldContent);
      return;
    });
  };

  return (
    <>
      <ScrollArea.Root
        className={`w-[350px] min-w-[350px] h-full bg-nav-dark dark:bg-nav-evendarker flex-col z-40 border-r border-r-white/10 `}
      >
        {/* Header */}
        <div className="w-full h-[59px] min-h-[59px] flex items-center px-4 bg-nav-darker dark:bg-nav-evendarker justify-between border-b border-b-white/10">
          <h1 className="font-dm text-sm text-white">Course Content</h1>
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <div
                onClick={() => {
                  toggleContentSidebar(!adminContentSidebarHidden);
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
            className="flex flex-col w-full border-b border-b-white/10 shadow-inner bg-nav-darker dark:bg-nav-evendarker"
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
                    className="px-3 py-2 rounded-md transition cursor-pointer data-[state=active]:bg-blue-300/20 dark:data-[state=active]:bg-blue-300/10 border-t data-[state=inactive]:border-transparent data-[state=active]:border-t-white/[0%] w-full flex items-center justify-center text-xs font-dm leading-none text-white/40 select-none hover:text-white data-[state=active]:text-white outline-none"
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
                <DeleteLessonModal
                  open={deleteLessonModalOpen}
                  setOpen={setDeleteLessonModalOpen}
                  removeLesson={removeLesson}
                />
                <DeleteProblemModal
                  open={deleteProblemModalOpen}
                  setOpen={setDeleteProblemModalOpen}
                  removeProblem={removeProblem}
                />
              </>
            )}
            <Accordion.Root
              onValueChange={(value) => {
                //value is array of open modules
                setOpenModules(value);
              }}
              value={openModules}
              className="w-full font-dm !overflow-y-auto max-h-[calc(100%-110px)] !pb-0"
              type="multiple"
            >
              {courseStructure && courseStructure.modules.length === 0 && (
                <div className="flex items-center justify-center px-4 py-4">
                  <p className="text-slate-400 text-xs py-3 w-full line text-center">
                    Looks like you have no content yet. Add a module below to
                    get started!
                  </p>
                </div>
              )}
              <DragDropContext
                onDragStart={() => {
                  console.log(reorderedModules);
                  console.log("dragging");
                  /* setOpenModules([]); */
                }}
                onDragEnd={handleModuleDragEnd}
              >
                <Droppable droppableId="list">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {reorderedModules.length > 0 &&
                        reorderedModules.map(
                          (module: CourseModule, primaryIndex: number) => {
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
                              module.content,
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
                              <Draggable
                                draggableId={module.id}
                                index={primaryIndex}
                                key={module.id}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                  >
                                    <Accordion.Item
                                      value={module.moduleName}
                                      key={module.id}
                                      className="border-b border-t border-t-white/10 border-b-black/30 group dropdown"
                                    >
                                      <Accordion.Trigger
                                        className={`pl-4 relative pr-4 group py-[6px] w-full flex items-center justify-between overflow-hidden bg-nav-dark dark:bg-nav-evendarker`}
                                      >
                                        <div
                                          className={`absolute w-full h-full pointer-events-none z-50 bg-sky-500 inset-0 transition ${
                                            snapshot.isDragging
                                              ? "opacity-50"
                                              : "opacity-0"
                                          }`}
                                        />
                                        <div className="flex items-center space-x-2">
                                          <div {...provided.dragHandleProps}>
                                            <DragHandleDots2Icon className="text-white/30 w-4 h-4 cursor-row-resize" />
                                          </div>
                                          <p className="text-left text-[13px] text-white">
                                            <span className="text-slate-300 mr-1">{`${
                                              primaryIndex + 1
                                            }.`}</span>
                                            {`${module.moduleName}`}
                                          </p>
                                        </div>
                                        <div className="flex space-x-2 items-center">
                                          <Tooltip delayDuration={100}>
                                            <TooltipTrigger asChild>
                                              <div
                                                onClick={(e) => {
                                                  e.stopPropagation();

                                                  openDeleteModuleModal(
                                                    module.id
                                                  );
                                                }}
                                                className="p-2 rounded-md hover:bg-nav-darker flex items-center justify-center"
                                              >
                                                <Trash
                                                  className="text-red-400 w-4 h-4"
                                                  strokeWidth={1.5}
                                                />
                                                {/* <Pencil1Icon className="text-white w-4 h-4" /> */}
                                              </div>
                                            </TooltipTrigger>
                                            <TooltipContent
                                              side="left"
                                              sideOffset={5}
                                              align="center"
                                              className={`z-50 TooltipContent data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade bg-red-700 text-white font-dm text-xs rounded-md p-2`}
                                            >
                                              Delete Module
                                            </TooltipContent>
                                          </Tooltip>

                                          <ChevronDownIcon
                                            className="text-white ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
                                            aria-hidden
                                          />
                                        </div>
                                      </Accordion.Trigger>
                                      <AccordionContent className="AccordionContent">
                                        <AnimateHeight
                                          contentClassName="h-full bg-nav-darker dark:bg-nav-evendarker"
                                          height={
                                            allContent.length == 0
                                              ? 40
                                              : dropdownHeights[primaryIndex]
                                          }
                                          className="flex flex-col justify-center"
                                        >
                                          <AnimatePresence exitBeforeEnter>
                                            {isEmpty ? (
                                              <m.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className={`relative flex px-4 items-center cursor-pointer justify-center `}
                                              >
                                                <p className="text-white/60 text-xs py-3 w-full line text-center">
                                                  No Content here :&#40;
                                                </p>
                                              </m.div>
                                            ) : (
                                              <ModuleContentList
                                                courseId={courseId as string}
                                                activeId={activeId as string}
                                                module={module}
                                                allContent={allContent}
                                                setItemToDelete={
                                                  setItemToDelete
                                                }
                                                setDeleteLessonModalOpen={
                                                  setDeleteLessonModalOpen
                                                }
                                                setDeleteProblemModalOpen={
                                                  setDeleteProblemModalOpen
                                                }
                                                activeContent={activeContent}
                                                primaryIndex={primaryIndex}
                                                setActiveContent={
                                                  setActiveContent
                                                }
                                                setReorderedModules={
                                                  setReorderedModules
                                                }
                                                reorderedModules={
                                                  reorderedModules
                                                }
                                              />
                                            )}
                                          </AnimatePresence>
                                        </AnimateHeight>
                                        <div className="flex items-center justify-center px-4 py-4 bg-nav-darkest/90 dark:bg-nav-evendarker">
                                          <div className="flex space-x-2 w-full">
                                            <Link
                                              href={{
                                                pathname: `/courses/${courseId}/lesson/create/${module.id}`,
                                                query: {
                                                  moduleName: module.moduleName,
                                                },
                                              }}
                                            >
                                              <div className="flex items-center bg-nav-darker dark:bg-nav-evendarker justify-center w-full px-2 space-x-2 py-3 cursor-pointer group/lessonbutton border dash border-blue-500/30 rounded-md">
                                                <PlusIcon className="w-4 h-4 text-slate-100/60 group-hover/lessonbutton:text-white" />
                                                <p className="text-slate-100/60 group-hover/lessonbutton:text-white text-xs pointer-events-none">
                                                  Add Lesson
                                                </p>
                                              </div>
                                            </Link>
                                            <Link
                                              href={{
                                                pathname: `/courses/${courseId}/problem/create/${module.id}`,
                                                query: {
                                                  moduleName: module.moduleName,
                                                },
                                              }}
                                            >
                                              <div className="flex items-center bg-nav-darker dark:bg-nav-evendarker justify-center w-full px-2 space-x-2 py-3 cursor-pointer group/problembutton border border-blue-500/30 rounded-md">
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
                                  </div>
                                )}
                              </Draggable>
                            );
                          }
                        )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              <div className="flex items-center justify-center px-4 py-4 border-t border-t-white/10">
                <button
                  onClick={() => {
                    setNewModuleModalOpen(true);
                  }}
                  className="flex space-x-2 items-center justify-center w-full px-2 py-3 group/modulebutton border border-blue-500/60 border-dashed rounded-md"
                >
                  <PlusIcon className="w-4 h-4 text-slate-100/60 group-hover/modulebutton:text-white" />
                  <p className="text-slate-100/60 group-hover/modulebutton:text-white text-xs">
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
        courseModules={reorderedModules as CourseModule[]}
        activeContent={activeContent}
      />
    </>
  );
};

const ModuleContentList = ({
  allContent,
  setItemToDelete,
  setDeleteLessonModalOpen,
  setDeleteProblemModalOpen,
  activeId,
  module,
  activeContent,
  primaryIndex,
  setActiveContent,
  setReorderedModules,
  reorderedModules,
  courseId,
}: {
  module: CourseModule;
  activeId: string;
  activeContent: "problems" | "lessons" | "all";
  primaryIndex: number;
  allContent: ModuleContent[];
  setItemToDelete: React.Dispatch<React.SetStateAction<string>>;
  setDeleteLessonModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteProblemModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveContent: (activeContent: "problems" | "lessons" | "all") => void;
  setReorderedModules: React.Dispatch<React.SetStateAction<CourseModule[]>>;
  reorderedModules: CourseModule[];
  courseId: string;
}) => {
  const [reorderedContent, setReorderedContent] = useState(
    module.content || []
  );

  useEffect(() => {
    // set reordered content to module content on mount, so moving content doesnt revert updated titles
    setReorderedContent(module.content);
  }, [reorderedModules]);

  /* const reorderContent = async (
    reorderContent: ReorderContent,
    sourceIndex: number,
    destinationIndex: number
  ) => {
    const { data } = await apiClient.post(
      apiRoutes.v2.admin.reorderContent(module.id),
      reorderContent
    );
  }; */

  const { mutateAsync: reorderContent } = useReorderContent(module.id);

  const handleDragEnd = (result: DropResult, provided: ResponderProvided) => {
    console.log(result);
    console.log(provided);
    const { destination, source } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    // here we need to reorderContent, and if successful, update the reorderedModules state
    // if not successful, revert the reorderedModules state

    //get contentType from after | in draggableId
    const id = result.draggableId.split("|")[0];
    const contentType = result.draggableId.split("|")[1];
    console.log(destination.index);
    const newOrderNumber = destination.index + 1;

    console.log(module.content);

    const reorderContentPayload: ReorderContent = {
      id,
      contentType,
      newOrderNumber,
    };

    //store old order in case mutate fails
    const oldContent = Array.from(reorderedContent);

    // optimistically update content
    const newContent = Array.from(reorderedContent);
    const [reorderedItem] = newContent.splice(source.index, 1);
    newContent.splice(destination.index, 0, reorderedItem);
    setReorderedContent(newContent);

    const newModules = Array.from(reorderedModules);
    newModules[primaryIndex].content = newContent;
    setReorderedModules(newModules);

    // now mutate and revert if fails

    reorderContent(reorderContentPayload).catch((err) => {
      console.log(err);
      toast.error("Something went wrong. Please try again.");
      setReorderedContent(oldContent);
      return;
    });
  };

  return (
    <DragDropContext
      onDragEnd={handleDragEnd}
      onDragStart={(start, provided) => console.log(start, provided)}
    >
      <Separator className="bg-white/5" />
      <Droppable
        droppableId={`module-${module.id}`}
        isDropDisabled={activeContent !== "all"}
      >
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {allContent.map((item: ModuleContent, secondaryIndex: number) => {
              const id = item.id;
              //check type of item
              const type = item.contentType;

              const name = item.title;
              return (
                <Draggable
                  draggableId={`${item.id}|${item.contentType}`}
                  index={secondaryIndex}
                  key={item.id}
                  isDragDisabled={activeContent !== "all"}
                >
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.draggableProps}>
                      <Link
                        href={{
                          pathname: `/courses/${courseId}/${type}/edit/${id}`,
                        }}
                        key={id}
                      >
                        <m.div
                          key={`${primaryIndex}-${secondaryIndex}`}
                          className={`relative flex pr-14 pl-0 items-center cursor-pointer justify-start bg-nav-darker dark:bg-white/[2%] dark:hover:bg-white/[4%] hover:bg-nav-darkest border-b border-white/5 ${
                            id === activeId
                              ? "!bg-nav-darkest dark:!bg-white/5"
                              : ""
                          }`}
                        >
                          <div
                            className={`absolute w-full h-full pointer-events-none z-50 bg-sky-500/80 inset-0 transition ${
                              snapshot.isDragging ? "opacity-50" : "opacity-0"
                            }`}
                          />
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
                                className="DropdownMenuContent font-dm data-[side=bottom]:animate-slideUpAndFade min-w-[150px] z-50 bg-white rounded-md p-1"
                                sideOffset={5}
                              >
                                <Link
                                  href={{
                                    pathname: `/courses/${courseId}/${type}/edit/${id}`,
                                  }}
                                  key={id}
                                >
                                  <DropdownMenu.Item className="space-x-2 font-bold group text-xs leading-none rounded-sm flex items-center py-[10px] text-slate-800 px-2 relative pl-2 select-none outline-none data-[disabled]:text-gray-300 data-[disabled]:pointer-events-none data-[highlighted]:bg-slate-200 cursor-pointer data-[highlighted]:text-slate-600">
                                    <p>Edit</p>
                                  </DropdownMenu.Item>
                                </Link>
                                <DropdownMenu.Separator className="h-[1px] bg-slate-200 m-1" />
                                <DropdownMenu.Item
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    setItemToDelete(id);
                                    type === "problem"
                                      ? setDeleteProblemModalOpen(true)
                                      : setDeleteLessonModalOpen(true);
                                  }}
                                  className="group cursor-pointer text-xs font-bold space-x-2 leading-none rounded-sm flex items-center py-[10px] px-2 relative pl-2 select-none outline-none data-[disabled]:text-gray-300 data-[disabled]:pointer-events-none data-[highlighted]:bg-red-100 data-[highlighted]:text-red-600 text-red-600"
                                >
                                  <p>Delete</p>
                                </DropdownMenu.Item>
                                <DropdownMenu.Arrow className="fill-white" />
                              </DropdownMenu.Content>
                            </DropdownMenu.Portal>
                          </DropdownMenu.Root>

                          <div className="w-[2px] min-w-[2px] h-full mr-4 flex flex-col relative"></div>
                          <div className="flex items-center space-x-2">
                            <div
                              {...provided.dragHandleProps}
                              className={
                                activeContent === "all" ? "" : "hidden"
                              }
                            >
                              <DragHandleDots2Icon className="text-slate-500 w-4 h-4 cursor-row-resize" />
                            </div>
                            <p
                              style={{
                                //clamp lines to 3
                                display: "-webkit-box",
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                              }}
                              className="text-white text-[13px] py-3 w-full line"
                            >
                              <span className="text-slate-500 mr-1">
                                {`${primaryIndex + 1}.${secondaryIndex + 1}`}
                              </span>{" "}
                              {`${name}`}
                            </p>
                          </div>
                        </m.div>
                      </Link>
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export const HiddenSizingItems = ({
  //navigation,
  courseModules,
  activeContent,
}: {
  //navigation: INavigationItem[];
  courseModules: CourseModule[];
  activeContent: "problems" | "lessons" | "all";
}) => {
  return (
    <div className="w-full absolute pointer-events-none -z-10 opacity-0">
      {/* Sizing Elements to animate height (stay hidden) */}
      {courseModules &&
        courseModules.map((value: CourseModule, primaryIndex: number) => {
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
                      className={`text-white text-[13px] py-3 w-full line ${
                        activeContent === "all" ? "pl-6" : "pl-2"
                      }`}
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
