import {
  MinusCircledIcon,
  PlusCircledIcon,
  QuestionMarkCircledIcon,
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
import { useState } from "react";
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { ListDetails } from "tabler-icons-react";
import { toast } from "react-hot-toast";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import AnimateHeight from "react-animate-height";

interface MultipleChoiceProps {
  node: NodeConfig;
  updateAttributes: (attrs: MultipleChoiceAttributes) => void;
  editor: Editor;
}

const MultipleChoiceStudentComponent: React.FC<MultipleChoiceProps> = ({
  node,
  updateAttributes,
  editor,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number>(-1);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const buttonClassName = (index: number) => {
    if (submitted) {
      if (index === node.attrs.correctAnswer) {
        return "ring-2 bg-white dark:bg-slate-700 ring-emerald-400 text-white";
      } else if (index === selectedAnswer) {
        return "ring-2 bg-white dark:bg-slate-700 ring-red-400 text-white";
      } else {
        return "bg-white dark:bg-slate-700 ring-1 ring-slate-200 dark:ring-slate-600 text-slate-800";
      }
    } else {
      if (index === selectedAnswer) {
        return "bg-white dark:bg-slate-700 ring-2 ring-blue-500 dark:ring-blue-400";
      } else {
        return "bg-white dark:bg-slate-700 ring-1 ring-slate-200 text-slate-800 hover:ring-slate-300 dark:ring-slate-600 dark:hover:ring-slate-400";
      }
    }
  };

  const handleAnswerClick = (index: number) => {
    if (!submitted) {
      setSelectedAnswer(index);
    }
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer === -1) {
      toast.error("Please select an answer");
    } else {
      setSubmitted(true);
      if (selectedAnswer === node.attrs.correctAnswer) {
        setIsCorrect(true);
      } else {
        setIsCorrect(false);
      }
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setSelectedAnswer(-1);
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
        <ListDetails className="w-4 h-4 text-white" />
      </div>
      {/* Question */}
      <div className="w-full text-slate-800 dark:text-white font-dm mb-4 mt-2 text-lg text-center">
        {node.attrs.question}
      </div>
      {/* Answers */}
      <RadioGroup.Root
        className="flex flex-col gap-2.5"
        aria-label="Answer Correct"
        value={selectedAnswer.toString()}
        onValueChange={(value) => {
          setSelectedAnswer(parseInt(value));
        }}
        disabled={submitted}
      >
        <div className="grid gap w-full grid-cols-2 gap-3 mb-4">
          {node.attrs.answers.map((answer: string, index: number) => (
            <div
              key={index}
              onClick={() => handleAnswerClick(index)}
              className={`rounded-md overflow-hidden transition w-full cursor-pointer py-3 flex justify-between items-center space-x-2 font-dm outline-none px-4 text-sm ${buttonClassName(
                index
              )}`}
            >
              <div className="text-slate-800 dark:text-white font-dm text-sm">
                {answer}
              </div>
              <RadioGroup.Item
                className={`bg-white w-6 min-w-[1.5rem] h-6 rounded-full shadow-sm hover:shadow-md transition outline-none cursor-pointer ${
                  index === selectedAnswer
                    ? ""
                    : "border border-slate-300 dark:border-slate-600"
                } ${
                  submitted && index === node.attrs.correctAnswer
                    ? "ring-2 !ring-emerald-500/50 ring-offset-2 ring-offset-white dark:ring-offset-slate-700 !border-none"
                    : ""
                } ${
                  submitted && index === selectedAnswer
                    ? "ring-2 ring-red-500/50 ring-offset-2 ring-offset-white dark:ring-offset-slate-700 !border-none"
                    : ""
                }`}
                value={index.toString()}
                id={index.toString()}
              >
                {submitted && index === node.attrs.correctAnswer ? (
                  <div className="w-full h-full rounded-full bg-emerald-500 flex items-center justify-center">
                    <CheckIcon className="w-5 h-5 text-white" />
                  </div>
                ) : submitted && index === selectedAnswer ? (
                  <div className="w-full h-full rounded-full bg-red-500 flex items-center justify-center">
                    <Cross2Icon className="w-5 h-5 text-white" />
                  </div>
                ) : (
                  <RadioGroup.Indicator
                    asChild
                    className="flex items-center justify-center w-full h-full relative"
                  >
                    <div className="w-full h-full rounded-full bg-blue-500 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </RadioGroup.Indicator>
                )}
              </RadioGroup.Item>
            </div>
          ))}
        </div>
      </RadioGroup.Root>
      {/* Feedback */}
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

      {/* Submit Button */}
      <div className="flex w-full items-center justify-center space-x-4">
        {/* Submit Button */}
        <AwesomeButton
          disabled={submitted || selectedAnswer === -1}
          className={`text-white px-4 py-3 w-fit uppercase rounded-md font-dm text-xs transition disabled:!cursor-not-allowed`}
          onPress={() => handleCheckAnswer()}
        >
          <div className="flex items-center px-2">
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

const MultipleChoiceAdminComponent: React.FC<MultipleChoiceProps> = ({
  node,
  updateAttributes,
  editor,
}) => {
  const [question, setQuestion] = useState(node.attrs.question);
  const [answers, setAnswers] = useState(
    node.attrs.answers || Array(4).fill("")
  );
  const [correctAnswer, setCorrectAnswer] = useState<number>(
    node.attrs.correctAnswer
  );

  const addAnswer = () => {
    if (answers.length < 6) {
      const newAnswers = [...answers, ""];
      setAnswers(newAnswers);
      updateAttributes({ ...node.attrs, answers: newAnswers });
    }
  };

  const removeAnswer = (index: number) => {
    if (answers.length > 2) {
      const newAnswers = [...answers];
      newAnswers.splice(index, 1);
      setAnswers(newAnswers);
      updateAttributes({ ...node.attrs, answers: newAnswers });

      if (correctAnswer === index) {
        setCorrectAnswer(0);
        updateAttributes({ ...node.attrs, correctAnswer: 0 });
      } else if (index < correctAnswer) {
        setCorrectAnswer(correctAnswer - 1);
        updateAttributes({ ...node.attrs, correctAnswer: correctAnswer - 1 });
      }
    }
  };

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
    setCorrectAnswer(index);
    updateAttributes({ ...node.attrs, correctAnswer: index });
  };

  return (
    <NodeViewWrapper
      contentEditable={false}
      className="bg-slate-100 ring-1 ring-slate-300 flex flex-col p-4 pt-6 rounded-md mb-10 mt-16 relative"
    >
      <div className="flex mx-auto items-center space-x-2 text-white absolute left-1/2 -translate-x-1/2 -top-4 bg-gradient-to-b from-blue-400 to-blue-500 w-fit px-4 py-2 rounded-md border border-blue-400 ring ring-blue-500/30">
        <ListDetails className="w-4 h-4" />
        <div className="font-dm !text-xs uppercase tracking-wide">
          Multiple Choice Question
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
            // set multipleChoiceNode as active
            editor.chain().setNodeSelection(node.po).run();

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
          <RadioGroup.Root
            className="flex flex-col gap-2.5"
            value={correctAnswer.toString()}
            aria-label="Answer Correct"
            onValueChange={(value) => {
              handleCorrectAnswerChange(parseInt(value));
            }}
          >
            {answers.map((answer: string, index: number) => (
              <div key={index} className="flex space-x-2 w-full items-center">
                <div
                  className={`rounded-md w-full bg-white flex items-center space-x-2 text-slate-800 transition font-dm text-base outline-none border px-2 ${
                    index === correctAnswer
                      ? "border-emerald-500"
                      : "border-slate-300"
                  }`}
                >
                  <RadioGroup.Item
                    className={`bg-white w-6 min-w-[1.5rem] h-6 rounded-full shadow-sm hover:shadow-md transition outline-none cursor-pointer ${
                      index === correctAnswer
                        ? "focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1"
                        : "border border-slate-300"
                    }`}
                    value={index.toString()}
                    id={index.toString()}
                  >
                    <RadioGroup.Indicator
                      asChild
                      className="flex items-center justify-center w-full h-full relative"
                    >
                      <div className="w-full h-full rounded-full bg-emerald-500/80 flex items-center justify-center">
                        <CheckIcon className="w-5 h-5 text-white" />
                      </div>
                    </RadioGroup.Indicator>
                  </RadioGroup.Item>
                  <input
                    onClick={(e) => {
                      // set multipleChoiceNode as active
                      editor.chain().setNodeSelection(node.po).run();

                      e.stopPropagation();
                      e.preventDefault();
                    }}
                    type="text"
                    className={`w-full text-slate-800 p-2 bg-white font-dm text-base outline-none rounded-md`}
                    value={answer}
                    onChange={(e) => handleAnswerChange(index, e)}
                    placeholder={`Answer ${index + 1}`}
                  />
                  <div className="flex space-x-2 items-center">
                    {correctAnswer === index ? (
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
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger asChild>
                        <button
                          disabled={answers.length === 2}
                          className="p-1 enabled:hover:bg-red-50 rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={() => removeAnswer(index)}
                        >
                          <MinusCircledIcon className="w-5 h-5 text-red-500 " />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent
                        side="right"
                        sideOffset={5}
                        align="center"
                        className={`${answers.length === 2 ? "hidden" : ""}`}
                      >
                        Remove Answer
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </div>
            ))}
          </RadioGroup.Root>
          <div className="flex justify-center !mt-4 items-center gap-2">
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <button
                  disabled={answers.length === 6}
                  className="p-1 enabled:hover:bg-emerald-500/10 rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={addAnswer}
                >
                  <PlusCircledIcon className="w-6 h-6 text-green-500" />
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                sideOffset={5}
                align="center"
                className={`${answers.length === 6 ? "hidden" : ""}`}
              >
                Add Answer
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
      {/* <NodeViewContent as="div" /> */}
    </NodeViewWrapper>
  );
};

export interface MultipleChoiceAttributes {
  question: string;
  answers: string[];
  correctAnswer: number;
}

export const MultipleChoice = Node.create({
  name: "multipleChoice",

  /* defaultOptions: {
    isStudentView: true,
    question: "",
    answers: ["", "", "", ""],
    correctAnswer: 0, 
  }, */

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
        default: ["", "", "", ""],
      },
      correctAnswer: {
        default: 0,
      },
    };
  },

  group: "block",

  content: "inline*",

  parseHTML() {
    return [
      {
        tag: "div.multiple-choice",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { class: "multiple-choice" }),
      0,
    ];
  },

  addNodeView() {
    const component = this.options.isStudentView
      ? MultipleChoiceStudentComponent
      : MultipleChoiceAdminComponent;
    return ReactNodeViewRenderer(component);
  },
});
