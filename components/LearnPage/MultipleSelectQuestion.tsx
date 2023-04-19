import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import styled from "@emotion/styled";
import theme from "constants/theme";
import { CheckCircle, XCircle } from "phosphor-react";
import { ModalAnswer } from "components/ContentEditor/components/MultipleSelectModal";

const QuestionHolder = styled.div((props: any) => ({
  width: "70%",
  marginTop: 50,
  height: "auto",
  borderRadius: 4,
  display: "flex",
  flexDirection: "column",
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 0px 8px 0px",
  transition: "box-shadow 0.3s ease-in-out, transform 0.2s ease-in-out",
  alignSelf: "center",
  ":hover": {
    transform: props.checked ? "" : "scale(1.01)",
    boxShadow: props.checked
      ? "rgba(99, 99, 99, 0.2) 0px 0px 8px 0px"
      : "rgba(99, 99, 99, 0.1) 0px 0px 20px 0px",
  },
  padding: 20,
}));

const AnswerHolder = styled.div((props: any) => ({
  width: "100%",
  height: "fit-content",
  paddingTop: 10,
  paddingBottom: 10,
  backgroundColor: props.checked
    ? props.isAnswerCorrect
      ? props.clicked
        ? "#22B16E"
        : "#e4fcf1"
      : props.clicked
      ? "#f76f7a"
      : theme.palette.primary.light
    : props.clicked
    ? theme.palette.primary.main
    : theme.palette.primary.light,
  color: props.clicked ? "white" : theme.palette.primary.dark,
  borderRadius: 4,
  border: props.checked
    ? props.isAnswerCorrect
      ? props.clicked
        ? "none"
        : "2px dashed #22B16E"
      : "none"
    : "none",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  cursor: "pointer",
  duration: 150,
  transition: "background-color .2s ease-out, color .2s ease-out",
  ":hover": {
    backgroundColor: props.checked
      ? props.isAnswerCorrect
        ? props.clicked
          ? "#22B16E"
          : "#e4fcf1"
        : props.clicked
        ? "#f76f7a"
        : theme.palette.primary.light
      : theme.palette.primary.main,
    color: props.checked
      ? props.isAnswerCorrect
        ? props.clicked
          ? "white"
          : theme.palette.primary.dark
        : props.clicked
        ? "white"
        : theme.palette.primary.dark
      : "white",
  },
}));

const AnswerFeedback = styled.div((props: any) => ({
  width: "98%",
  justifySelf: "center",
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  borderRadius: 4,
  border: props.checked
    ? props.correct
      ? "2px solid #22B16E"
      : "2px solid #f76f7a"
    : "none",
  backgroundColor: props.correct ? "#e4fcf1" : "#ffedef",
  paddingTop: props.checked ? 10 : 0,
  paddingBottom: props.checked ? 10 : 0,
  marginTop: props.checked ? 20 : 0,
  marginLeft: props.checked ? 10 : 0,
  color: "white",
  transition:
    "max-height 0.5s ease-in-out, background-color .2s ease-out, border .2s ease-out",
  maxHeight: props.checked ? 500 : 0,
  overflowY: "hidden",
}));

const CheckButton = styled.div((props: any) => ({
  width: "98%",
  justifySelf: "center",
  display: props.checked ? "none" : "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 4,
  backgroundColor: props.checked ? "lightgrey" : theme.palette.primary.dark,
  paddingTop: 5,
  paddingBottom: 5,
  marginTop: 15,
  marginLeft: 10,
  color: "white",
  cursor: "pointer",
  transition: "background-color .2s ease-out",
}));

interface MultipleSelectProps {
  question: string;
  answers: ModalAnswer[];
  number: number;
}

function MultipleSelectQuestion({
  question,
  answers,
  number,
}: MultipleSelectProps) {
  const [questionsClicked, setQuestionsClicked] = useState<Array<boolean>>([]);
  const [correct, setCorrect] = useState(false);
  const [checked, setChecked] = useState(false); // fire when "Check answer" is clicked

  const answerText = (correct: boolean, clicked: boolean) => {
    if (correct) {
      if (clicked) {
        return "CORRECT";
      } else {
        return "CORRECT ANSWER";
      }
    } else {
      if (clicked) {
        return "INCORRECT";
      } else {
        return "";
      }
    }
  };

  const checkCorrect = () => {
    for (let i = 0; i < questionsClicked.length; i++) {
      if (questionsClicked[i] === true) {
        if (answers[i].correct) {
          //do nothing
        } else {
          return false;
        }
      } else {
        if (answers[i].correct) {
          return false;
        }
      }
    }
    return true;
  };

  //set initial state of all questions clicked to false on mount
  useEffect(() => {
    if (answers && answers.length > 1) {
      for (let i = 0; i < answers.length; i++) {
        setQuestionsClicked((prev) => [...prev, false]);
      }
    }
  }, []);

  return (
    <div
      className={`w-[70%] rounded-md transition-transform flex flex-col border p-5 self-center dark:border-emerald-500 ${
        checked ? "" : "hover:scale-[101%]"
      }`}
    >
      <h1 className="uppercase font-dm font-bold !text-sm !text-blue-500 dark:!text-emerald-500">
        Question {number}
      </h1>
      <h1 className="font-dm !text-lg !font-normal !text-slate-900 dark:!text-slate-100">
        {question}
      </h1>

      <div className="grid grid-cols-2 gap-2 mt-2 self-center w-full">
        {answers.map((ans, i) => {
          return (
            <div
              onClick={() => {
                if (checked) return;
                //set the answer state to clicked
                const currentClickState = [];
                for (const status of questionsClicked)
                  currentClickState.push(status);
                currentClickState[i] = !currentClickState[i];
                setQuestionsClicked(currentClickState);
              }}
              className={`w-full flex !text-slate-900 justify-between items-center px-4 py-3 rounded-sm transition cursor-pointer ${
                checked
                  ? ans.correct
                    ? questionsClicked[i]
                      ? "bg-emerald-500 hover:bg-emerald-500 hover:text-white"
                      : "bg-green-100 hover:bg-green-100 hover:text-slate-900"
                    : questionsClicked[i]
                    ? "bg-rose-400 hover:bg-rose-400 hover:text-white"
                    : "bg-blue-200 hover:bg-blue-200 hover:text-slate-900"
                  : questionsClicked[i]
                  ? "bg-blue-400 hover:bg-blue-400 hover:text-white"
                  : "bg-blue-200 hover:bg-blue-400 hover:text-white"
              } ${questionsClicked[i] ? "text-white" : "text-slate-900"} ${
                checked
                  ? ans.correct
                    ? questionsClicked[i]
                      ? "none"
                      : "border-2 border-dashed border-emerald-500"
                    : ""
                  : ""
              }`}
              key={number * i}
            >
              <p className="font-dm !text-sm !font-normal !text-slate-900">
                {ans.text}
              </p>
              <p className="font-dm uppercase !text-xs !font-bold !text-slate-900 tracking-wide">
                {checked && answerText(ans.correct, questionsClicked[i])}
              </p>
            </div>
          );
        })}
      </div>
      <button
        onClick={() => {
          //check if all answers are correct
          const isCorrect = checkCorrect();
          setCorrect(isCorrect);
          setChecked(true);
        }}
        className={`mt-4 cursor-pointer rounded-sm bg-blue-600 hover:bg-blue-700 transition-colors text-white items-center justify-center py-4 ${
          checked ? "hidden" : "flex"
        }`}
      >
        <p className="font-dm uppercase !text-xs !font-bold !text-white !tracking-wide">
          Check Answer
        </p>
      </button>

      <div
        className={`flex transition-all overflow-y-hidden items-center justify-start mt-4 rounded-sm ${
          checked
            ? correct
              ? "border-2 border-emerald-500 text-emerald-700 bg-emerald-100"
              : "border-2 border-rose-400 text-rose-700 bg-rose-100"
            : ""
        } ${checked ? "max-h-44 py-4" : "max-h-0"}`}
      >
        {correct ? (
          <CheckCircle
            weight="duotone"
            size={24}
            style={{ marginLeft: 15 }}
            color={"#22B16E"}
          />
        ) : (
          <XCircle
            weight="duotone"
            size={24}
            style={{ marginLeft: 15 }}
            color={"#f76f7a"}
          />
        )}
        <p className="font-dm !text-sm !font-normal !text-slate-900 ml-2">
          {correct
            ? "Correct! Nice job!"
            : "That's incorrect. Review your answer."}
        </p>
      </div>
    </div>
  );
}

export default MultipleSelectQuestion;
