import {
  MinusCircledIcon,
  PlusCircledIcon,
  QuestionMarkCircledIcon,
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
import * as Tooltip from "@radix-ui/react-tooltip";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { ListDetails } from "tabler-icons-react";

interface MultipleChoiceProps {
  node: NodeConfig;
  updateAttributes: (attrs: any) => void;
  editor: Editor;
}

const MultipleChoiceComponent: React.FC<MultipleChoiceProps> = ({
  node,
  updateAttributes,
  editor,
}) => {
  const [question, setQuestion] = useState(node.attrs.question);
  const [answers, setAnswers] = useState(
    node.attrs.answers || Array(4).fill("")
  );
  const [correctAnswer, setCorrectAnswer] = useState<number>(0);

  const addAnswer = () => {
    if (answers.length < 6) {
      const newAnswers = [...answers, ""];
      setAnswers(newAnswers);
      updateAttributes({ answers: newAnswers });
    }
  };

  const removeAnswer = (index: number) => {
    if (answers.length > 2) {
      const newAnswers = [...answers];
      newAnswers.splice(index, 1);
      setAnswers(newAnswers);
      updateAttributes({ answers: newAnswers });

      if (correctAnswer === index) {
        setCorrectAnswer(0);
        updateAttributes({ correctAnswer: 0 });
      } else if (index < correctAnswer) {
        setCorrectAnswer(correctAnswer - 1);
        updateAttributes({ correctAnswer: correctAnswer - 1 });
      }
    }
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuestion = e.target.value;
    setQuestion(newQuestion);
    updateAttributes({ question: newQuestion });
  };

  const handleAnswerChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newAnswers = [...answers];
    newAnswers[index] = e.target.value;
    setAnswers(newAnswers);
    updateAttributes({ answers: newAnswers });
  };

  const handleCorrectAnswerChange = (index: number) => {
    setCorrectAnswer(index);
    updateAttributes({ correctAnswer: index });
  };

  return (
    <NodeViewWrapper
      contentEditable={false}
      className="bg-slate-100 ring-1 ring-slate-300 flex flex-col p-4 pt-6 rounded-md mb-4 mt-10 relative"
    >
      <div className="flex mx-auto items-center space-x-2 text-white absolute left-1/2 -translate-x-1/2 -top-4 bg-gradient-to-b from-blue-500 to-blue-600 w-fit px-4 py-2 rounded-md border border-blue-500 ring ring-blue-500/30">
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
          <Tooltip.Provider delayDuration={100}>
            <RadioGroup.Root
              className="flex flex-col gap-2.5"
              defaultValue={"0"}
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
                      className={`w-full text-slate-800 p-2 font-dm text-base outline-none rounded-md`}
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
                      <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                          <button
                            disabled={answers.length === 2}
                            className="p-1 enabled:hover:bg-red-50 rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => removeAnswer(index)}
                          >
                            <MinusCircledIcon className="w-5 h-5 text-red-500 " />
                          </button>
                        </Tooltip.Trigger>
                        <Tooltip.Portal>
                          <Tooltip.Content
                            side="right"
                            sideOffset={5}
                            align="center"
                            className={`z-20 TooltipContent data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade bg-gray-800 text-white font-dm text-xs rounded-md p-2 ${
                              answers.length === 2 ? "hidden" : ""
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
            </RadioGroup.Root>
            <div className="flex justify-center !mt-4 items-center space-x-2">
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button
                    disabled={answers.length === 6}
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
                      answers.length === 6 ? "hidden" : ""
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
      {/* <NodeViewContent as="div" /> */}
    </NodeViewWrapper>
  );
};

export const MultipleChoice = Node.create({
  name: "multipleChoice",

  defaultOptions: {
    question: "",
    answers: ["", "", "", ""],
    correctAnswer: 0,
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
    return ReactNodeViewRenderer(MultipleChoiceComponent);
  },
});
