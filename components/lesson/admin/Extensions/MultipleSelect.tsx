import { useState, useEffect } from "react";
import {
  QuestionMarkCircledIcon,
  PlusCircledIcon,
  MinusCircledIcon,
  CheckIcon,
  Cross2Icon,
  ResetIcon,
  ReloadIcon,
} from "@radix-ui/react-icons";
import {
  Editor,
  Node,
  NodeConfig,
  NodeViewWrapper,
  ReactNodeViewRenderer,
  mergeAttributes,
} from "@tiptap/react";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Tooltip from "@radix-ui/react-tooltip";
import { ListCheck } from "tabler-icons-react";
import { AwesomeButton } from "react-awesome-button";
import AnimateHeight from "react-animate-height";

interface MultipleSelectProps {
  node: NodeConfig;
  updateAttributes: (attrs: MultipleSelectAttributes) => void;
  editor: Editor;
}

const MultipleSelectStudentComponent: React.FC<MultipleSelectProps> = ({
  node,
  updateAttributes,
  editor,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Array<number>>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const correctAnswers = node.attrs.correctAnswers;

  const buttonClassName = (index: number) => {
    if (submitted) {
      if (selectedAnswers.includes(index)) {
        if (correctAnswers.includes(index)) {
          // if answer is selected and correct
          return "bg-white dark:bg-slate-700 ring-2 ring-emerald-500 text-white";
        } else {
          // if answer is selected and incorrect
          return "bg-white dark:bg-slate-700 ring-2 ring-red-500 text-white";
        }
      } else {
        if (correctAnswers.includes(index)) {
          // if answer is not selected and correct
          return "bg-white dark:bg-slate-700 outline-2 outline-emerald-500/50 outline-offset-0 outline-dashed text-white";
        } else {
          // if answer is not selected and incorrect
          return "bg-white dark:bg-slate-700 ring-1 ring-slate-200 dark:ring-slate-600";
        }
      }
    } else {
      if (selectedAnswers.includes(index)) {
        return "bg-white dark:bg-slate-700 ring-2 ring-blue-500 dark:ring-blue-400";
      } else {
        return "bg-white dark:bg-slate-700 ring-1 ring-slate-200 text-slate-800 hover:ring-slate-300 dark:ring-slate-600 dark:hover:ring-slate-400";
      }
    }
  };

  const handleAnswerClick = (index: number) => {
    if (submitted) return;
    const newSelectedAnswers = [...selectedAnswers];
    const answerIndex = newSelectedAnswers.indexOf(index);

    if (answerIndex > -1) {
      newSelectedAnswers.splice(answerIndex, 1);
    } else {
      newSelectedAnswers.push(index);
    }

    setSelectedAnswers(newSelectedAnswers);
  };

  const handleCheckAnswer = () => {
    // check if all correct answers are selected, note that order does not matter
    const isCorrect =
      selectedAnswers.length === correctAnswers.length &&
      selectedAnswers.every((value, index) => correctAnswers.includes(value));

    console.log(selectedAnswers);
    console.log(
      selectedAnswers.every((value, index) => value === correctAnswers[index])
    );

    console.log(isCorrect);

    setIsCorrect(isCorrect);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setSelectedAnswers([]);
    setTimeout(() => {
      setIsCorrect(false);
    }, 200);
  };

  return (
    <NodeViewWrapper
      contentEditable={false}
      className="bg-slate-50 dark:bg-slate-800 ring-1 ring-slate-300 dark:ring-slate-500 flex flex-col p-4 pt-6 rounded-md mb-10 mt-16 relative"
    >
      <div className="w-10 h-10 p-px bg-gradient-to-b from-blue-400 to-blue-500 border border-blue-400 ring ring-blue-500/30 rounded-full absolute left-1/2 -translate-x-1/2 -top-5 flex items-center justify-center">
        <ListCheck className="w-4 h-4 text-white" />
      </div>
      {/* Question */}
      <div className="w-full text-slate-800 font-dm mb-4 mt-2 text-lg text-center dark:text-white">
        {node.attrs.question}
      </div>
      {/* Answers */}
      <div className="flex flex-col space-y-4 mb-4">
        {node.attrs.answers.map((answer: string, index: number) => (
          <button
            key={index}
            className={`w-full rounded-md p-3 text-base outline-none transition ${buttonClassName(
              index
            )}`}
            onClick={() => handleAnswerClick(index)}
          >
            <div className="w-full flex justify-between">
              <div className="flex items-center space-x-4">
                <Checkbox.Root
                  className={`bg-white  w-6 min-w-[1.5rem] h-6 rounded-sm shadow-sm hover:shadow-md transition outline-none cursor-pointer ${
                    selectedAnswers.includes(index)
                      ? "focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                      : "border border-slate-300 dark:border-slate-600"
                  } ${
                    submitted &&
                    correctAnswers.includes(index) &&
                    selectedAnswers.includes(index)
                      ? "ring-2 !ring-emerald-500/50 ring-offset-2 ring-offset-slate-700 !border-none"
                      : ""
                  } ${
                    submitted &&
                    !correctAnswers.includes(index) &&
                    selectedAnswers.includes(index)
                      ? "ring-2 !ring-red-500/50 ring-offset-2 ring-offset-slate-700 !bg-red-500 !border-none"
                      : ""
                  }`}
                  id={index.toString()}
                  onCheckedChange={() => {
                    handleAnswerClick(index);
                  }}
                  checked={selectedAnswers.includes(index)}
                >
                  {submitted &&
                  correctAnswers.includes(index) &&
                  selectedAnswers.includes(index) ? (
                    <div className="w-full h-full rounded-sm !bg-emerald-500 flex items-center justify-center">
                      <CheckIcon className="w-5 h-5 text-white" />
                    </div>
                  ) : submitted &&
                    !correctAnswers.includes(index) &&
                    selectedAnswers.includes(index) ? (
                    <div className="w-full h-full rounded-sm bg-red-500 flex items-center justify-center">
                      <Cross2Icon className="w-5 h-5 text-white" />
                    </div>
                  ) : (
                    <Checkbox.Indicator
                      asChild
                      className="flex items-center justify-center w-full h-full relative"
                    >
                      <div className="w-full h-full rounded-sm bg-blue-500 flex items-center justify-center">
                        <CheckIcon className="w-5 h-5 text-white" />
                      </div>
                    </Checkbox.Indicator>
                  )}
                </Checkbox.Root>
                <div className="text-slate-800 dark:text-white font-dm text-sm">
                  {answer}
                </div>
              </div>
              {submitted &&
              !selectedAnswers.includes(index) &&
              correctAnswers.includes(index) ? (
                <div className="flex items-center space-x-2">
                  <div className="text-emerald-500 uppercase font-bold font-dm text-xs min-w-fit whitespace-nowrap">
                    Correct Answer
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </button>
        ))}
      </div>
      <AnimateHeight
        duration={200}
        height={submitted ? "auto" : 0}
        className="w-full"
      >
        <div
          className={`w-full flex items-center justify-center space-x-2 py-2 pb-4 ${
            isCorrect ? "text-emerald-500" : "text-red-500"
          }`}
        >
          {isCorrect ? (
            <CheckIcon className="w-5 h-5" />
          ) : (
            <Cross2Icon className="w-5 h-5" />
          )}
          <div className="font-dm text-sm">
            {isCorrect ? "Nice job!" : "Incorrect. Please review your answer."}
          </div>
        </div>
      </AnimateHeight>
      <div className="flex w-full items-center justify-center space-x-4">
        {/* Submit Button */}
        <AwesomeButton
          type="primary"
          disabled={submitted || selectedAnswers.length === 0}
          onPress={handleCheckAnswer}
        >
          <div className="flex items-center px-2 uppercase">
            <div>Submit</div>
          </div>
        </AwesomeButton>
        {/* Reset Button */}
        {/* <AwesomeButton
          type="secondary"
          disabled={!submitted}
          onPress={handleReset}
        >
          <div className="flex items-center uppercase">
            <div>Reset</div>
          </div>
        </AwesomeButton> */}
      </div>
      <div
        onClick={() => {
          handleReset();
        }}
        className={`absolute !cursor-pointer right-4 bottom-4 flex space-x-2 items-center transition ${
          submitted
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="font-dm text-sm text-blue-500 uppercase font-bold">
          Reset
        </div>
        <ReloadIcon className="w-5 h-5 text-blue-500" />
      </div>
    </NodeViewWrapper>
  );
};

const MultipleSelectAdminComponent: React.FC<MultipleSelectProps> = ({
  node,
  updateAttributes,
  editor,
}) => {
  const [question, setQuestion] = useState(node.attrs.question);
  const [answers, setAnswers] = useState(
    node.attrs.answers || Array(5).fill("")
  );
  const [correctAnswers, setCorrectAnswers] = useState<Array<number>>([0, 1]);

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuestion = e.target.value;
    setQuestion(newQuestion);
    updateAttributes({ ...node.attrs, question: newQuestion });
  };

  const handleAnswerChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newAnswers = [...answers];
    newAnswers[index] = e.target.value;
    setAnswers(newAnswers);
    updateAttributes({ ...node.attrs, answers: newAnswers });
  };

  const handleCorrectAnswerChange = (index: number) => {
    const newCorrectAnswers = [...correctAnswers];
    const answerIndex = newCorrectAnswers.indexOf(index);

    if (answerIndex > -1) {
      newCorrectAnswers.splice(answerIndex, 1);
    } else {
      newCorrectAnswers.push(index);
    }

    setCorrectAnswers(newCorrectAnswers);
    updateAttributes({ ...node.attrs, correctAnswers: newCorrectAnswers });
  };

  const addAnswer = () => {
    if (answers.length < 8) {
      updateAttributes({ ...node.attrs, answers: [...answers, ""] });
      setAnswers([...answers, ""]);
    }
  };

  const removeAnswer = (index: number) => {
    if (answers.length > 3) {
      const newAnswers = [...answers];
      newAnswers.splice(index, 1);
      setAnswers(newAnswers);

      const answerIndex = correctAnswers.indexOf(index);
      if (answerIndex > -1) {
        const newCorrectAnswers = [...correctAnswers];
        newCorrectAnswers.splice(answerIndex, 1);
        setCorrectAnswers(newCorrectAnswers);
      }
    }
  };

  return (
    <NodeViewWrapper
      contentEditable={false}
      className="bg-slate-100 ring-1 ring-slate-300 flex flex-col p-4 pt-6 rounded-md mb-10 mt-16 relative"
    >
      <div className="flex mx-auto items-center space-x-2 text-white absolute left-1/2 -translate-x-1/2 -top-4 bg-gradient-to-b from-blue-400 to-blue-500 w-fit px-4 py-2 rounded-md border border-blue-400 ring ring-blue-500/30">
        <ListCheck className="w-4 h-4" />
        <div className="font-dm !text-xs uppercase tracking-wide">
          Multiple Select Question
        </div>
      </div>
      <div className="flex flex-col space-y-1 mb-4">
        <label htmlFor="question" className="font-dm text-xs tracking-wide">
          Question
        </label>

        <input
          type="text"
          className="content bg-white w-full rounded-md p-2 text-slate-800 font-dm text-base outline-none border border-slate-300"
          value={question}
          onClick={(e) => {
            // set multipleSelectNode as active
            editor.chain().setNodeSelection(node.pos).run();

            e.stopPropagation();
            e.preventDefault();
          }}
          onChange={handleQuestionChange}
          placeholder="Question"
        />
      </div>
      <div className="flex flex-col space-y-1 mb-4">
        <label htmlFor="question" className="font-dm text-xs tracking-wide">
          Answers
        </label>
        <div className="flex flex-col space-y-2">
          <Tooltip.Provider delayDuration={100}>
            {answers.map((answer: string, index: number) => (
              <div key={index} className="flex space-x-2 w-full items-center">
                <div
                  className={`rounded-md w-full bg-white flex items-center space-x-2 text-slate-800 transition font-dm text-base outline-none border px-2 ${
                    correctAnswers.includes(index)
                      ? "border-emerald-500"
                      : "border-slate-300"
                  }`}
                >
                  <Checkbox.Root
                    className={`bg-white  w-6 min-w-[1.5rem] h-6 rounded-sm shadow-sm hover:shadow-md transition outline-none cursor-pointer ${
                      correctAnswers.includes(index)
                        ? "focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1"
                        : "border border-slate-300"
                    }`}
                    id={index.toString()}
                    onCheckedChange={() => {
                      handleCorrectAnswerChange(index);
                    }}
                    checked={correctAnswers.includes(index)}
                  >
                    <Checkbox.Indicator
                      asChild
                      className="flex items-center justify-center w-full h-full relative"
                    >
                      <div className="w-full h-full rounded-sm bg-emerald-500/80 flex items-center justify-center">
                        <CheckIcon className="w-5 h-5 text-white" />
                      </div>
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <input
                    onClick={(e) => {
                      // set multipleSelectNode as active
                      editor.chain().setNodeSelection(node.pos).run();

                      e.stopPropagation();
                      e.preventDefault();
                    }}
                    type="text"
                    className={`w-full bg-white text-slate-800 p-2 font-dm text-base outline-none rounded-md`}
                    value={answer}
                    onChange={(e) => handleAnswerChange(index, e)}
                    placeholder={`Answer ${index + 1}`}
                  />
                  <div className="flex space-x-2 items-center">
                    {correctAnswers.includes(index) ? (
                      <div
                        className={`rounded-sm flex w-fit space-x-2 items-center bg-emerald-500 h-full py-1 px-2`}
                      >
                        <div className="text-white font-dm text-xs min-w-fit whitespace-nowrap">
                          Correct Answer
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                        <button
                          disabled={answers.length === 3}
                          className="p-1 enabled:hover:bg-red-50 rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={() => removeAnswer(index)}
                        >
                          <MinusCircledIcon className="w-5 h-5 text-red-500" />
                        </button>
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Content
                          side="right"
                          sideOffset={5}
                          align="center"
                          className={`z-20 TooltipContent data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade bg-gray-800 text-white font-dm text-xs rounded-md p-2 ${
                            answers.length === 3 ? "hidden" : ""
                          }`}
                        >
                          Remove Answer
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-center !mt-4 items-center space-x-2">
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button
                    disabled={answers.length === 8}
                    className="p-1 enabled:hover:bg-emerald-500/10 rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={addAnswer}
                  >
                    <PlusCircledIcon className="w-6 h-6 text-green-500" />
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    side="bottom"
                    sideOffset={5}
                    align="center"
                    className={`z-20 TooltipContent data-[side=bottom]:animate-slideDownAndFade data-[side=top]:animate-slideUpAndFade bg-gray-800 text-white font-dm text-xs rounded-md p-2 ${
                      answers.length === 8 ? "hidden" : ""
                    }`}
                  >
                    Add Answer
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </div>
          </Tooltip.Provider>
        </div>
      </div>
    </NodeViewWrapper>
  );
};

export interface MultipleSelectAttributes {
  question: string;
  answers: Array<string>;
  correctAnswers: Array<number>;
}

export const MultipleSelect = Node.create({
  name: "multipleSelect",

  addOptions() {
    return {
      isStudentView: true,
    };
  },

  addAttributes() {
    return {
      question: {
        default: "",
      },
      answers: {
        default: Array(5).fill(""),
      },
      correctAnswers: {
        default: [],
      },
    };
  },

  group: "block",

  content: "inline*",

  parseHTML() {
    return [
      {
        tag: "div.multiple-select",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { class: "multiple-select" }),
      0,
    ];
  },

  addNodeView() {
    const component = this.options.isStudentView
      ? MultipleSelectStudentComponent
      : MultipleSelectAdminComponent;
    return ReactNodeViewRenderer(component);
  },
});
