import {
  ChevronDownIcon,
  GearIcon,
  PlusIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { Gear } from "phosphor-react";
import React from "react";
import { Settings } from "tabler-icons-react";
import { ProblemAction, ProblemData, TestCaseVisibility } from "../types";
import * as RadioGroup from "@radix-ui/react-radio-group";
import * as Accordion from "@radix-ui/react-accordion";
import * as Tooltip from "@radix-ui/react-tooltip";
import { AccordionContent } from "utils/radixTypes";

const InputOutputEditorPane = ({
  problemState,
  dispatch,
}: {
  problemState: ProblemData;
  dispatch: React.Dispatch<ProblemAction>;
}) => {
  const testCasesEmpty = problemState?.testCases?.length === 0;
  return (
    <div className="w-full h-full bg-slate-100 flex flex-col overflow-auto">
      {/* <div className="w-full sticky top-0 z-10 dark:border-b-slate-700 border-b-slate-600 pb-3 border-b pt-4 pl-5 pr-3 dark:bg-nav-darkest bg-nav-dark">
        <p className="text-sm text-slate-300 font-dm dark:text-white">
          Test Editor
        </p>
      </div> */}
      {testCasesEmpty ? (
        <div
          className={`w-full h-full flex flex-col p-4 space-y-2 justify-center items-center`}
        >
          <div className={`flex w-full items-center justify-center`}>
            <h1 className="text-lg font-dm font-bold ">Test Cases</h1>
          </div>
          <p className={`text-center text-sm text-slate-600 font-dm`}>
            At least one test case is required with visible input and output.
          </p>
          <button
            className="text-xs text-white font-dm flex items-center space-x-2 w-96 justify-center py-2 bg-slate-700 !mt-4 hover:bg-slate-600 sticky bottom-4 rounded-md"
            onClick={() => {
              dispatch({
                type: "ADD_TEST_CASE",
                payload: {
                  input: "",
                  expectedOutput: "",
                  hint: "",
                  visibility: TestCaseVisibility.IO_VISIBLE,
                },
              });
            }}
          >
            <PlusIcon />
            <p>Add Test Case</p>
          </button>
        </div>
      ) : (
        <div className={`w-full h-full flex flex-col p-4 space-y-2`}>
          <div className={`flex w-full items-center justify-between`}>
            <h1 className="text-lg font-dm font-bold">Test Cases</h1>
            {/*  <div className="sticky h-8 rounded-md bg-nav-dark/10 hover:bg-nav-dark/20 group cursor-pointer flex items-center justify-center px-3 space-x-2">
              <p className="text-sm text-slate-800 font-dm group-hover:text-slate-900 transition">
                Compiler Settings
              </p>
              <Gear
                className="w-5 h-5 text-slate-800 group-hover:rotate-12 transition"
                weight="duotone"
              />
            </div> */}
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
                    className="bg-slate-50 rounded-md border group hover:border-slate-300 transition"
                  >
                    <Accordion.Trigger className="flex flex-row space-x-4 items-center justify-between  w-full px-3 py-2">
                      <p className="text-sm text-slate-800 font-dm font-semibold">
                        Test Case {index + 1}
                      </p>
                      <div className="flex space-x-2 items-center">
                        <Tooltip.Provider delayDuration={100}>
                          <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                              <div
                                className="text-sm text-red-500 font-dm hover:bg-red-500/10 rounded-sm p-2"
                                onClick={() => {
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
                                className={`z-20 TooltipContent data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade bg-gray-800 border border-slate-500 text-white font-dm text-xs font-medium rounded-md p-2`}
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
                      <div className="flex flex-col p-3 border-t border-slate-200 bg-white rounded-b-md space-y-4">
                        <div className="flex flex-col space-y-2">
                          <p className="text-xs text-slate-600 font-dm">
                            Input
                          </p>
                          <textarea
                            className="w-full bg-slate-50 dark:bg-nav-darkest border border-slate-300 dark:border-slate-700 rounded-md p-2 text-sm text-slate-600 font-dm"
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
                            className="w-full bg-slate-50 dark:bg-nav-darkest border border-slate-300 dark:border-slate-700 rounded-md p-2 text-sm text-slate-600 font-dm"
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
                              onChange={(
                                e: React.FormEvent<HTMLInputElement>
                              ) => {
                                dispatch({
                                  type: "UPDATE_TEST_CASE",
                                  payload: {
                                    index,
                                    testCase: {
                                      ...testCase,
                                      visibility: parseInt(
                                        e.currentTarget.value
                                      ),
                                    },
                                  },
                                });
                              }}
                            >
                              <div className="flex items-center">
                                <RadioGroup.Item
                                  className="bg-slate-50 border w-[25px] h-[25px] rounded-full shadow-sm hover:shadow-md transition outline-none cursor-pointer"
                                  value={TestCaseVisibility.IO_VISIBLE.toString()}
                                  id={TestCaseVisibility.IO_VISIBLE.toString()}
                                >
                                  <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-full after:bg-blue-500" />
                                </RadioGroup.Item>
                                <label
                                  className="text-slate-600 text-[15px] leading-none pl-[15px] font-dm"
                                  htmlFor={TestCaseVisibility.IO_VISIBLE.toString()}
                                >
                                  Input and output visible
                                </label>
                              </div>
                              <div className="flex items-center">
                                <RadioGroup.Item
                                  className="bg-slate-50 border w-[25px] h-[25px] rounded-full shadow-sm hover:shadow-md transition outline-none cursor-pointer"
                                  value={TestCaseVisibility.I_VISIBLE_O_HIDDEN.toString()}
                                  id={TestCaseVisibility.I_VISIBLE_O_HIDDEN.toString()}
                                >
                                  <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-full after:bg-blue-500" />
                                </RadioGroup.Item>
                                <label
                                  className="text-slate-600 text-[15px] leading-none pl-[15px] font-dm"
                                  htmlFor={TestCaseVisibility.I_VISIBLE_O_HIDDEN.toString()}
                                >
                                  Input visible, output hidden
                                </label>
                              </div>
                              <div className="flex items-center">
                                <RadioGroup.Item
                                  className="bg-slate-50 border w-[25px] h-[25px] rounded-full shadow-sm hover:shadow-md transition outline-none cursor-pointer"
                                  value={TestCaseVisibility.IO_HIDDEN.toString()}
                                  id={TestCaseVisibility.IO_HIDDEN.toString()}
                                >
                                  <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-full after:bg-blue-500" />
                                </RadioGroup.Item>
                                <label
                                  className="text-slate-600 text-[15px] leading-none pl-[15px] font-dm"
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
                              className="w-full bg-slate-50 dark:bg-nav-darkest border border-slate-300 dark:border-slate-700 rounded-md p-2 text-sm text-slate-600 font-dm"
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
            onClick={() => {
              dispatch({
                type: "ADD_TEST_CASE",
                payload: {
                  input: "",
                  expectedOutput: "",
                  hint: "",
                  visibility: TestCaseVisibility.IO_VISIBLE,
                },
              });
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
