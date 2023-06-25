import {
  ChevronDownIcon,
  EyeClosedIcon,
  EyeNoneIcon,
  EyeOpenIcon,
  GearIcon,
  PlusIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { Gear } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { Settings } from "tabler-icons-react";
import { ProblemAction, ProblemData, TestCaseVisibility } from "../types";
import * as RadioGroup from "@radix-ui/react-radio-group";
import * as Accordion from "@radix-ui/react-accordion";
import * as Tooltip from "@radix-ui/react-tooltip";
import { AccordionContent } from "utils/radixTypes";
import Modal from "components/shared/Modals/Modal";
import { toast } from "react-hot-toast";

const NewTestCaseModal = ({
  open,
  setOpen,
  problemState,
  dispatch,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  problemState: ProblemData;
  dispatch: React.Dispatch<ProblemAction>;
}) => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [visibility, setVisibility] = useState(
    TestCaseVisibility.IO_VISIBLE.toString()
  );
  const [hint, setHint] = useState("");

  const resetState = () => {
    setInput("");
    setOutput("");
    setVisibility(TestCaseVisibility.IO_VISIBLE.toString());
    setHint("");
  };

  const addTestCase = () => {
    if (input === "" || output === "") {
      toast.error("Input and output cannot be empty");
      return;
    }
    dispatch({
      type: "ADD_TEST_CASE",
      payload: {
        input,
        expectedOutput: output,
        hint,
        visibility: parseInt(visibility),
      },
    });
    resetState();
    setOpen(false);
  };

  return (
    <Modal title="Add Test Case" open={open} setOpen={setOpen}>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <p className="text-xs text-slate-600 font-dm">Input</p>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-md p-2 text-sm text-slate-600 font-dm"
            placeholder="1 2"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <p className="text-xs text-slate-600 font-dm">Output</p>
          <textarea
            value={output}
            onChange={(e) => setOutput(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-md p-2 text-sm text-slate-600 font-dm"
            placeholder="3"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex flex-col space-y-2">
            <p className="text-xs text-slate-600 font-dm">Visibility</p>
            <RadioGroup.Root
              className="flex flex-col gap-2.5"
              onValueChange={(value) => {
                setVisibility(value);
              }}
              defaultValue={TestCaseVisibility.IO_VISIBLE.toString()}
              aria-label="Visibility"
            >
              <div className="flex items-center">
                <RadioGroup.Item
                  className="bg-white border w-6 h-6 rounded-full shadow-sm hover:shadow-md transition outline-none cursor-pointer"
                  value={TestCaseVisibility.IO_VISIBLE.toString()}
                  id={TestCaseVisibility.IO_VISIBLE.toString()}
                >
                  <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-full after:bg-blue-500" />
                </RadioGroup.Item>
                <label
                  className="text-slate-600 text-sm leading-none pl-3 font-dm"
                  htmlFor={TestCaseVisibility.IO_VISIBLE.toString()}
                >
                  Input and output visible
                </label>
              </div>
              <div className="flex items-center">
                <RadioGroup.Item
                  className="bg-white border w-6 h-6 rounded-full shadow-sm hover:shadow-md transition outline-none cursor-pointer"
                  value={TestCaseVisibility.I_VISIBLE_O_HIDDEN.toString()}
                  id={TestCaseVisibility.I_VISIBLE_O_HIDDEN.toString()}
                >
                  <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-full after:bg-blue-500" />
                </RadioGroup.Item>
                <label
                  className="text-slate-600 text-sm leading-none pl-3 font-dm"
                  htmlFor={TestCaseVisibility.I_VISIBLE_O_HIDDEN.toString()}
                >
                  Input visible, output hidden
                </label>
              </div>
              <div className="flex items-center">
                <RadioGroup.Item
                  className="bg-white border w-6 h-6 rounded-full shadow-sm hover:shadow-md transition outline-none cursor-pointer"
                  value={TestCaseVisibility.IO_HIDDEN.toString()}
                  id={TestCaseVisibility.IO_HIDDEN.toString()}
                >
                  <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-full after:bg-blue-500" />
                </RadioGroup.Item>
                <label
                  className="text-slate-600 text-sm leading-none pl-3 font-dm"
                  htmlFor={TestCaseVisibility.IO_HIDDEN.toString()}
                >
                  Input and output hidden
                </label>
              </div>
            </RadioGroup.Root>
          </div>
          <div className="flex flex-col space-y-2 !mt-4">
            <p className="text-xs text-slate-600 font-dm">
              Hint&nbsp;
              <span className="text-slate-400">(Optional)</span>
            </p>
            <textarea
              value={hint}
              onChange={(e) => setHint(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-md p-2 text-sm text-slate-600 font-dm"
              placeholder="Add two numbers"
            />
          </div>
        </div>
        <button
          onClick={addTestCase}
          className="px-4 py-2 self-end bg-slate-700 cursor-pointer rounded-md hover:bg-slate-600 w-full flex items-center justify-center !mt-4 space-x-2"
        >
          <PlusIcon className="w-4 h-4 text-white" />
          <p className="text-xs text-white font-dm  pointer-events-none">
            Add Test Case
          </p>
        </button>
      </div>
    </Modal>
  );
};

const InputOutputEditorPane = ({
  problemState,
  dispatch,
}: {
  problemState: ProblemData;
  dispatch: React.Dispatch<ProblemAction>;
}) => {
  const [newTestCaseOpen, setNewTestCaseOpen] = useState(false);
  const testCasesEmpty = problemState?.testCases?.length === 0;
  return (
    <div className="w-full h-full bg-slate-100 flex flex-col overflow-auto">
      <NewTestCaseModal
        open={newTestCaseOpen}
        setOpen={setNewTestCaseOpen}
        problemState={problemState}
        dispatch={dispatch}
      />
      {testCasesEmpty ? (
        <div
          className={`w-full h-full flex flex-col p-4 space-y-2 justify-center items-center`}
        >
          <div className={`flex w-full items-center justify-center`}>
            <h1 className="text-lg font-dm font-medium text-slate-800">
              Test Cases
            </h1>
          </div>
          <p className={`text-center text-sm text-slate-600 font-dm`}>
            At least one test case is required with visible input and output.
          </p>
          <button
            className="text-xs text-white font-dm flex items-center space-x-2 w-96 justify-center py-2 bg-slate-700 !mt-4 hover:bg-slate-600 sticky bottom-4 rounded-md"
            /* onClick={() => {
              dispatch({
                type: "ADD_TEST_CASE",
                payload: {
                  input: "",
                  expectedOutput: "",
                  hint: "",
                  visibility: TestCaseVisibility.IO_VISIBLE,
                },
              });
            }} */
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setNewTestCaseOpen(true);
            }}
          >
            <PlusIcon />
            <p>Add Test Case</p>
          </button>
        </div>
      ) : (
        <div className={`w-full h-full flex flex-col p-4 space-y-2`}>
          <div className={`flex w-full items-center justify-between`}>
            <h1 className="text-lg font-dm font-medium text-slate-800">
              Test Cases
            </h1>
          </div>
          <p className={`text-left text-xs text-slate-600 font-dm`}>
            At least one test case is required with visible input and output.
          </p>
          <div className="flex flex-col space-y-4 pb-4 !mt-6">
            <Accordion.Root
              onValueChange={(value) => {
                //value is array of open modules
              }}
              className="w-full space-y-2"
              type="multiple"
            >
              {problemState?.testCases?.map((testCase, index) => {
                return (
                  <Accordion.Item
                    value={index.toString()}
                    key={index}
                    className="bg-white rounded-md border group hover:border-slate-300 transition"
                  >
                    <Accordion.Trigger className="flex flex-row space-x-4 items-center justify-between w-full px-3 py-2">
                      <div className="flex space-x-2 items-center">
                        <p className="text-sm text-slate-800 font-dm">
                          Test Case {index + 1}
                        </p>
                      </div>
                      <div className="flex space-x-2 items-center">
                        <Tooltip.Provider delayDuration={100}>
                          <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                              <div className="text-sm text-slate-500 font-dm hover:bg-slate-700/5 rounded-sm p-2">
                                {testCase.visibility ===
                                TestCaseVisibility.IO_VISIBLE ? (
                                  <EyeOpenIcon />
                                ) : testCase.visibility ===
                                  TestCaseVisibility.I_VISIBLE_O_HIDDEN ? (
                                  <EyeNoneIcon />
                                ) : (
                                  <EyeClosedIcon />
                                )}
                              </div>
                            </Tooltip.Trigger>
                            <Tooltip.Portal>
                              <Tooltip.Content
                                side="top"
                                sideOffset={5}
                                align="center"
                                className={`z-20 TooltipContent data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade bg-gray-800 border border-slate-500 text-white font-dm text-xs rounded-md p-2`}
                              >
                                {testCase.visibility ===
                                TestCaseVisibility.IO_VISIBLE
                                  ? "Input and output visible"
                                  : testCase.visibility ===
                                    TestCaseVisibility.I_VISIBLE_O_HIDDEN
                                  ? "Input visible, output hidden"
                                  : "Input and output hidden"}
                              </Tooltip.Content>
                            </Tooltip.Portal>
                          </Tooltip.Root>
                        </Tooltip.Provider>
                        <Tooltip.Provider delayDuration={100}>
                          <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                              <div
                                className="text-sm text-red-500 font-dm hover:bg-red-500/10 rounded-sm p-2"
                                onClick={(e) => {
                                  e.preventDefault();
                                  toast.success("Deleted test case");
                                  dispatch({
                                    type: "REMOVE_TEST_CASE",
                                    payload: index,
                                  });
                                }}
                              >
                                <TrashIcon />
                              </div>
                            </Tooltip.Trigger>
                            <Tooltip.Portal>
                              <Tooltip.Content
                                side="top"
                                sideOffset={5}
                                align="center"
                                className={`z-20 TooltipContent data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade bg-gray-800 border border-slate-500 text-white font-dm text-xs rounded-md p-2`}
                              >
                                Delete Test Case
                              </Tooltip.Content>
                            </Tooltip.Portal>
                          </Tooltip.Root>
                        </Tooltip.Provider>

                        <button className="text-sm text-slate-500 font-dm rounded-sm p-2">
                          <ChevronDownIcon className="group-data-[state=open]:rotate-180 transition" />
                        </button>
                      </div>
                    </Accordion.Trigger>
                    <AccordionContent className="AccordionContent">
                      <div className="flex flex-col p-3 border-t border-slate-200 bg-slate-50 rounded-b-md space-y-4">
                        <div className="flex flex-col space-y-2">
                          <p className="text-xs text-slate-600 font-dm">
                            Input
                          </p>
                          <textarea
                            className="w-full bg-white border border-slate-300 rounded-md p-2 text-sm text-slate-600 font-dm"
                            value={testCase.input}
                            placeholder="1 2"
                            onChange={(e) => {
                              dispatch({
                                type: "UPDATE_TEST_CASE",
                                payload: {
                                  index,
                                  testCase: {
                                    ...testCase,
                                    input: e.target.value,
                                  },
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="flex flex-col space-y-2">
                          <p className="text-xs text-slate-600 font-dm">
                            Output
                          </p>
                          <textarea
                            className="w-full bg-white border border-slate-300 rounded-md p-2 text-sm text-slate-600 font-dm"
                            value={testCase.expectedOutput}
                            placeholder="3"
                            onChange={(e) => {
                              dispatch({
                                type: "UPDATE_TEST_CASE",
                                payload: {
                                  index,
                                  testCase: {
                                    ...testCase,
                                    expectedOutput: e.target.value,
                                  },
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="flex flex-col space-y-2">
                          <div className="flex flex-col space-y-2">
                            <p className="text-xs text-slate-600 font-dm">
                              Visibility
                            </p>
                            <RadioGroup.Root
                              className="flex flex-col gap-2.5"
                              defaultValue={TestCaseVisibility.IO_VISIBLE.toString()}
                              aria-label="Visibility"
                              onValueChange={(value) => {
                                dispatch({
                                  type: "UPDATE_TEST_CASE",
                                  payload: {
                                    index,
                                    testCase: {
                                      ...testCase,
                                      visibility: parseInt(value),
                                    },
                                  },
                                });
                              }}
                            >
                              <div className="flex items-center">
                                <RadioGroup.Item
                                  className="bg-white border w-6 h-6 rounded-full shadow-sm hover:shadow-md transition outline-none cursor-pointer"
                                  value={TestCaseVisibility.IO_VISIBLE.toString()}
                                  id={TestCaseVisibility.IO_VISIBLE.toString()}
                                >
                                  <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-full after:bg-blue-500" />
                                </RadioGroup.Item>
                                <label
                                  className="text-slate-600 text-sm leading-none pl-3 font-dm"
                                  htmlFor={TestCaseVisibility.IO_VISIBLE.toString()}
                                >
                                  Input and output visible
                                </label>
                              </div>
                              <div className="flex items-center">
                                <RadioGroup.Item
                                  className="bg-white border w-6 h-6 rounded-full shadow-sm hover:shadow-md transition outline-none cursor-pointer"
                                  value={TestCaseVisibility.I_VISIBLE_O_HIDDEN.toString()}
                                  id={TestCaseVisibility.I_VISIBLE_O_HIDDEN.toString()}
                                >
                                  <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-full after:bg-blue-500" />
                                </RadioGroup.Item>
                                <label
                                  className="text-slate-600 text-sm leading-none pl-3 font-dm"
                                  htmlFor={TestCaseVisibility.I_VISIBLE_O_HIDDEN.toString()}
                                >
                                  Input visible, output hidden
                                </label>
                              </div>
                              <div className="flex items-center">
                                <RadioGroup.Item
                                  className="bg-white border w-6 h-6 rounded-full shadow-sm hover:shadow-md transition outline-none cursor-pointer"
                                  value={TestCaseVisibility.IO_HIDDEN.toString()}
                                  id={TestCaseVisibility.IO_HIDDEN.toString()}
                                >
                                  <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-full after:bg-blue-500" />
                                </RadioGroup.Item>
                                <label
                                  className="text-slate-600 text-sm leading-none pl-3 font-dm"
                                  htmlFor={TestCaseVisibility.IO_HIDDEN.toString()}
                                >
                                  Input and output hidden
                                </label>
                              </div>
                            </RadioGroup.Root>
                          </div>
                          <div className="flex flex-col space-y-2 !mt-4">
                            <p className="text-xs text-slate-600 font-dm">
                              Hint&nbsp;
                              <span className="text-slate-400">(Optional)</span>
                            </p>
                            <textarea
                              className="w-full bg-white border border-slate-300 rounded-md p-2 text-sm text-slate-600 font-dm"
                              value={testCase.hint}
                              placeholder="Add two numbers"
                              onChange={(e) => {
                                dispatch({
                                  type: "UPDATE_TEST_CASE",
                                  payload: {
                                    index,
                                    testCase: {
                                      ...testCase,
                                      hint: e.target.value,
                                    },
                                  },
                                });
                              }}
                            />
                          </div>
                          <div className="w-full bg-red-500/10 cursor-pointer rounded-sm hover:bg-red-500/20 flex items-center justify-center py-2 !mt-4 space-x-2">
                            <TrashIcon className="w-4 h-4 text-red-500" />
                            <p className="text-xs text-red-500 font-dm pointer-events-none">
                              Delete Test Case
                            </p>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </Accordion.Item>
                );
              })}
            </Accordion.Root>
          </div>
          <button
            className="text-xs text-white font-dm flex items-center space-x-2 w-full justify-center py-2 bg-slate-700 !mt-4 hover:bg-slate-600 sticky bottom-4 rounded-md"
            /* onClick={() => {
              dispatch({
                type: "ADD_TEST_CASE",
                payload: {
                  input: "",
                  expectedOutput: "",
                  hint: "",
                  visibility: TestCaseVisibility.IO_VISIBLE,
                },
              });
            }} */
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setNewTestCaseOpen(true);
            }}
          >
            <PlusIcon />
            <p>Add Test Case</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default InputOutputEditorPane;
