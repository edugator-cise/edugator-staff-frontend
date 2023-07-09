import React, { ReactNode, useEffect, useState, useReducer } from "react";
import "allotment/dist/style.css";
import dynamic from "next/dynamic";
import { AllotmentProps } from "allotment";
import AdminLayout from "components/AdminLayout/AdminLayout";
import CodeEditorPane from "components/problem/admin/CodeEditorPane";
import MetadataEditorPane from "components/problem/admin/MetadataEditorPane";
import { ProblemAction } from "components/problem/admin/types";
import { sampleTestCases } from "components/problem/admin/utils";
import InputOutputEditorPane from "components/problem/admin/InputOutputEditorPane";
import {
  CheckCircledIcon,
  Cross2Icon,
  GearIcon,
  Pencil1Icon,
  RocketIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import * as Tooltip from "@radix-ui/react-tooltip";
import Modal from "components/shared/Modals/Modal";
import SwitchToggle from "components/shared/SwitchToggle";
import AlertModal from "components/shared/Modals/AlertModal";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { Problem } from "hooks/problem/useGetProblem";
import ActionButton from "components/shared/Buttons/ActionButton";
import { useNavigationConfirmation } from "hooks/shared/useConfirmNavigation";
import ProblemView from "../student/ProblemView";
import { useQueryClient } from "@tanstack/react-query";

const Allotment = dynamic<AllotmentProps>(
  () => import("allotment").then((mod) => mod.Allotment),
  { ssr: false }
);

const AdminProblemEditor = ({ problem }: { problem?: Problem }) => {
  const router = useRouter();
  const { problemId, moduleId, moduleName } = router.query;

  const {
    id,
    title,
    statement,
    hidden,
    fileName,
    dueDate,
    codeHeader,
    codeBody,
    codeFooter,
    templatePackage,
    timeLimit,
    memoryLimit,
    buildCommand,
    languages,
    orderNumber,
    createdAt,
    updatedAt,
    testCases,
  } = problem || {};

  const [unsavedChanges, setUnsavedChanges] = useState(false); // set to true when user makes changes to anything in problem state
  const [editable, setEditable] = useState(false); // set to true when user clicks "edit" button
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false); // set to true when user tries navigating away from page with unsaved changes

  useEffect(() => {
    console.log(problem);
  }, [problem]);

  // REDUCER

  const header =
    codeHeader === undefined ? "SAMPLE C++ HEADER HERE" : codeHeader;
  const footer =
    codeFooter === undefined ? "SAMPLE C++ FOOTER HERE" : codeFooter;
  const body = codeBody === undefined ? "SAMPLE C++ BODY HERE" : codeBody;
  const solution = "";

  const initialProblemState: Problem = {
    title: title || "",
    hidden: hidden || false,
    dueDate: dueDate || new Date().toISOString(),
    statement: statement || "",
    codeHeader: header,
    codeBody: body,
    codeFooter: footer,
    templatePackage: templatePackage || "",
    fileName: fileName || "",
    timeLimit: timeLimit || 10,
    memoryLimit: memoryLimit || 2048,
    buildCommand: buildCommand || "",
    testCases: testCases || sampleTestCases,
    languages: languages || "cpp",
  };

  function problemReducer(state: Problem, action: ProblemAction): Problem {
    // when any changes to the problem state are made for the first time, let global state know there is unsaved changes
    // to know when to show the "unsaved changes" dialog
    setUnsavedChanges(true);

    console.log("changing state");
    switch (action.type) {
      case "SET_TITLE":
        console.log(action.payload);
        console.log(state);
        return { ...state, title: action.payload };
      case "SET_HIDDEN":
        return { ...state, hidden: action.payload };
      case "SET_STATEMENT":
        return { ...state, statement: action.payload };
      case "SET_HEADER":
        return { ...state, codeHeader: action.payload };
      case "SET_BODY":
        return { ...state, codeBody: action.payload };
      case "SET_FOOTER":
        return { ...state, codeFooter: action.payload };
      case "SET_TEMPLATE_PACKAGE":
        return { ...state, templatePackage: action.payload };
      case "SET_FILE_NAME":
        return { ...state, fileName: action.payload };
      case "SET_TIME_LIMIT":
        return { ...state, timeLimit: action.payload };
      case "SET_MEMORY_LIMIT":
        return { ...state, memoryLimit: action.payload };
      case "SET_BUILD_COMMAND":
        return { ...state, buildCommand: action.payload };
      case "ADD_TEST_CASE":
        return { ...state, testCases: [...state.testCases, action.payload] };
      case "UPDATE_TEST_CASE":
        return {
          ...state,
          testCases: state.testCases.map((testCase, index) =>
            index === action.payload.index ? action.payload.testCase : testCase
          ),
        };
      case "REMOVE_TEST_CASE":
        return {
          ...state,
          testCases: state.testCases.filter(
            (_, index) => index !== action.payload
          ),
        };
      default:
        return state;
    }
  }

  const [problemState, problemDispatch] = useReducer<
    React.Reducer<Problem, ProblemAction>
  >(problemReducer, initialProblemState);

  // HANDLE NAVIGATION AWAY FROM PAGE WITH UNSAVED CHANGES

  const {
    confirmModalOpen: confirmNavigationModalOpen,
    handleModalClose: handleConfirmNavigationModalClose,
    setConfirmModalOpen: setConfirmNavigationModalOpen,
  } = useNavigationConfirmation(unsavedChanges, router);

  const queryClient = useQueryClient();

  const onCancelChanges = () => {
    // set content back to old content
    setConfirmModalOpen(false);
    setTimeout(() => {
      setEditable(false);
      queryClient.invalidateQueries(["problem", problemId]);
    }, 200);
  };

  const onCancelWithoutChanges = () => {
    console.log("no unsaved changes");
    setEditable(false);
    return;
  };

  return (
    <div className={`w-full h-full flex flex-col relative bg-slate-100`}>
      {/* Modal for cancelling changes */}
      <AlertModal
        title="Are you sure?"
        open={confirmModalOpen}
        setOpen={setConfirmModalOpen}
        description="Are you sure you want to cancel? All unsaved changes will be lost."
        onCancel={() => {
          setConfirmModalOpen(false);
        }}
        onConfirm={() => {
          onCancelChanges();
        }}
        confirmText="Confirm"
      />
      {/* Modal for confirming navigation */}
      <AlertModal
        title="Are you sure?"
        open={confirmNavigationModalOpen}
        setOpen={setConfirmNavigationModalOpen}
        description="Are you sure you want to leave? All unsaved changes will be lost."
        onCancel={() => {
          handleConfirmNavigationModalClose(false);
        }}
        onConfirm={() => {
          setConfirmModalOpen(false);
          setTimeout(() => {
            handleConfirmNavigationModalClose(true);
          }, 200);
        }}
        confirmText="Confirm"
      />
      <Modal
        title="Problem Settings"
        open={settingsOpen}
        setOpen={setSettingsOpen}
      >
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2 w-full">
            <label htmlFor="hidden" className="text-xs text-slate-800 font-dm">
              Visibility
            </label>
            <div className="flex items-center justify-between space-x-2 w-full">
              <div className="text-sm font-dm text-slate-800">
                Problem Hidden?
              </div>
              <SwitchToggle
                checked={problemState.hidden}
                onCheckedChange={(checked) => {
                  problemDispatch({
                    type: "SET_HIDDEN",
                    payload: checked,
                  });
                }}
              />
            </div>
          </div>
          <div className="flex items-center justify-between space-x-4">
            <div className="flex flex-col space-y-2 w-full">
              <label
                htmlFor="time limit"
                className="text-xs text-slate-800 font-dm"
              >
                Time Limit (seconds)
              </label>
              <input
                type="number"
                id="time limit"
                className="w-full py-2 text-sm rounded-md border border-slate-300 bg-white text-slate-800 px-3 font-dm outline-none"
                placeholder="5"
                value={problemState?.timeLimit}
                onChange={(e) => {
                  problemDispatch({
                    type: "SET_TIME_LIMIT",
                    payload: parseInt(e.target.value),
                  });
                }}
              />
            </div>
            <div className="flex flex-col space-y-2 w-full">
              <label
                htmlFor="memory limit"
                className="text-xs text-slate-800 font-dm"
              >
                Memory Limit (MB)
              </label>
              <input
                type="number"
                id="memory limit"
                className="w-full py-2 text-sm rounded-md border border-slate-300 bg-white text-slate-800 px-3 font-dm outline-none"
                placeholder="2048"
                value={problemState.memoryLimit}
                onChange={(e) => {
                  problemDispatch({
                    type: "SET_MEMORY_LIMIT",
                    payload: parseInt(e.target.value),
                  });
                }}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <label
              htmlFor="build command"
              className="text-xs text-slate-800 font-dm"
            >
              Build Flags
            </label>
            <input
              type="text"
              id="build command"
              className="w-full py-2 text-sm rounded-md border border-slate-300 bg-white text-slate-800 px-3 font-dm outline-none"
              placeholder="-Werror -Wall"
              value={problemState.buildCommand}
              onChange={(e) => {
                problemDispatch({
                  type: "SET_BUILD_COMMAND",
                  payload: e.target.value,
                });
              }}
            />
          </div>
          <button
            onClick={() => setDeleteModalOpen(true)}
            className="w-full py-3 bg-red-100 hover:bg-red-200 cursor-pointer text-red-600 rounded-md flex space-x-2 items-center justify-center"
          >
            <TrashIcon />
            <p className="text-xs font-dm">Delete Problem</p>
          </button>
        </div>
      </Modal>
      <AlertModal
        title="Delete Problem"
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        description="Are you sure you want to delete this problem? This action cannot be undone."
        onCancel={() => {
          setDeleteModalOpen(false);
        }}
        onConfirm={() => {
          console.log("delete problem");
          toast.success("Problem deleted successfully!");
          setDeleteModalOpen(false);
          setSettingsOpen(false);
          // navigate to module page
        }}
        confirmText="Delete Problem"
      />

      {/* Top Banner */}
      <div className="w-full h-16 min-h-[3.5rem] max-h-[3.5rem] bg-nav-dark flex items-center justify-between px-6 border-b border-b-slate-700">
        <div className="flex items-end">
          <p className="text-base text-slate-400 font-dm">
            {moduleName}
            <span className="text-slate-600">&nbsp;&nbsp;&gt;&nbsp;&nbsp;</span>
          </p>
          <h1 className="text-white font-dm text-base">
            {title || "New Problem"}
          </h1>
        </div>
        <div className="flex space-x-2 items-center">
          {problem ? (
            <div className="flex space-x-2 items-center">
              {editable ? (
                <>
                  <Tooltip.Provider delayDuration={100}>
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                        <div
                          className="p-2 rounded-md cursor-pointer border border-slate-700 bg-white/5 flex items-center justify-center space-x-2"
                          onClick={() => {
                            setSettingsOpen(!settingsOpen);
                          }}
                        >
                          <GearIcon color="white" />
                        </div>
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Content
                          side="bottom"
                          sideOffset={5}
                          align="center"
                          className={`z-20 TooltipContent data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade bg-gray-800 text-white font-dm text-xs rounded-md p-2`}
                        >
                          Settings
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  </Tooltip.Provider>
                  <ActionButton
                    color="red"
                    onClick={() => {
                      if (!unsavedChanges) {
                        onCancelWithoutChanges();
                        return;
                      }
                      setConfirmModalOpen(true);
                    }}
                  >
                    <Cross2Icon />
                    <p>Cancel</p>
                  </ActionButton>
                  <ActionButton
                    color="green"
                    disabled={
                      !unsavedChanges || !editable
                      /* lessonState.title === "" ||
                      lessonState.content === "" ||
                      !lessonState.title ||
                      !lessonState.content ||
                      updateLessonLoading ||
                      !editable ||
                      !unsavedChanges */
                    }
                    onClick={async () => {
                      /* console.log(lessonState);
                      await saveLesson(); */
                    }}
                  >
                    <CheckCircledIcon />
                    <p>Save Changes</p>
                  </ActionButton>
                </>
              ) : (
                <>
                  <ActionButton
                    color="blue"
                    onClick={() => {
                      setEditable(true);
                    }}
                  >
                    <Pencil1Icon />
                    <p>Edit</p>
                  </ActionButton>
                </>
              )}
            </div>
          ) : (
            <>
              <Tooltip.Provider delayDuration={100}>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <div
                      className="p-2 rounded-md cursor-pointer border border-slate-700 bg-white/5 flex items-center justify-center space-x-2"
                      onClick={() => {
                        setSettingsOpen(!settingsOpen);
                      }}
                    >
                      <GearIcon color="white" />
                    </div>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      side="bottom"
                      sideOffset={5}
                      align="center"
                      className={`z-20 TooltipContent data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade bg-gray-800 text-white font-dm text-xs rounded-md p-2`}
                    >
                      Settings
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
              <ActionButton
                color="green"
                disabled={
                  true
                  /* lessonState.title === "" ||
                lessonState.content === "" ||
                !lessonState.title ||
                !lessonState.content ||
                createLessonLoading */
                }
                onClick={async () => {
                  /* console.log(lessonState);
                await publishLesson(); */
                }}
              >
                <RocketIcon />
                <p>Publish</p>
              </ActionButton>
            </>
          )}
        </div>
      </div>

      <div className="w-full h-full relative">
        {editable ? (
          <Allotment
            sizes={[310, 350]}
            snap={true}
            minSize={400}
            className="code-editor-allotment"
          >
            <div className="flex w-full h-full flex-col">
              <MetadataEditorPane
                problemState={problemState}
                dispatch={problemDispatch}
              />
              {/* <MetadataPane */}
            </div>
            <Allotment sizes={[100, 100]} vertical snap={false} minSize={300}>
              <>
                <CodeEditorPane
                  problem={problem as Problem}
                  problemState={problemState}
                  dispatch={problemDispatch}
                />
              </>
              <>
                <InputOutputEditorPane
                  problemState={problemState}
                  dispatch={problemDispatch}
                />
              </>
            </Allotment>
          </Allotment>
        ) : (
          <ProblemView problem={problem} />
        )}
        {/* <AIChat /> */}
      </div>
    </div>
  );
};

AdminProblemEditor.getLayout = (page: ReactNode) => (
  <AdminLayout pageTitle="Problem Editor">{page}</AdminLayout>
);

export default AdminProblemEditor;
