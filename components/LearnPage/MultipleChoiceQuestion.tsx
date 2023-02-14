import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import styled from "@emotion/styled";
import theme from "constants/theme";
import { CheckCircle, XCircle } from "phosphor-react";

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
    transform: props.answered && props.correct ? "" : "scale(1.01)",
    boxShadow:
      props.answered && props.correct
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
  backgroundColor: props.clicked
    ? props.isAnswerCorrect
      ? "#22B16E"
      : "#f76f7a"
    : theme.palette.primary.light,
  color: props.clicked ? "white" : theme.palette.primary.dark,
  borderRadius: 4,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  cursor: "pointer",
  duration: 150,
  transition: "background-color .2s ease-out, color .2s ease-out",
  ":hover": {
    backgroundColor:
      props.correct && !props.clicked
        ? theme.palette.primary.light
        : props.clicked
        ? props.isAnswerCorrect
          ? "#22B16E"
          : "#f76f7a"
        : theme.palette.primary.main,
    color:
      props.correct && !props.clicked ? theme.palette.primary.dark : "white",
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
  border: props.answered
    ? props.correct
      ? "2px solid #22B16E"
      : "2px solid #f76f7a"
    : "none",
  backgroundColor: props.correct ? "#e4fcf1" : "#ffedef",
  paddingTop: props.answered ? 10 : 0,
  paddingBottom: props.answered ? 10 : 0,
  marginTop: props.answered ? 20 : 0,
  color: "white",
  transition:
    "max-height 0.5s ease-in-out, background-color .2s ease-out, border .2s ease-out",
  maxHeight: props.answered ? 500 : 0,
  overflowY: "hidden",
}));

interface MultipleChoiceProps {
  question: string;
  correctAnswer: number;
  answers: string[];
  number: number;
  image: boolean;
  sourcePath?: string;
}

function MultipleChoiceQuestion(props: MultipleChoiceProps) {
  const [questionsClicked, setQuestionsClicked] = useState<Array<boolean>>([]);
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);

  //set initial state of all questions clicked to false on mount
  useEffect(() => {
    if (props.answers && props.answers.length > 1) {
      for (let i = 0; i < props.answers.length; i++) {
        setQuestionsClicked((prev) => [...prev, false]);
      }
    }
  }, []);

  return (
    <QuestionHolder answered={answered} correct={correct}>
      <Typography
        variant="overline"
        sx={{ fontWeight: 600, fontSize: "0.9em" }}
        fontSize="subtitle2"
        color={theme.palette.primary.main}
      >
        Question {props.number}
      </Typography>
      {props.image === true && (
        <div
          style={{
            backgroundColor: "#f0f0f0",
            borderRadius: 4,
            padding: 10,
            marginTop: 10,
            marginBottom: 10,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={props.sourcePath}
            alt={`img ${props.number}`}
            style={{ width: 300 }}
          />
        </div>
      )}
      <Typography
        variant="h6"
        sx={{ fontWeight: 200, fontFamily: "DM Serif Display" }}
      >
        {props.question}
      </Typography>

      <Grid
        container
        rowSpacing={2}
        columnSpacing={2}
        sx={{ marginTop: 1, alignSelf: "center", justifySelf: "center" }}
      >
        {props.answers.map((ans, i) => {
          return (
            <Grid
              key={i}
              sx={{ minHeight: "100" }}
              item
              xs={props.answers.length % 2 === 0 ? 6 : 12}
            >
              <AnswerHolder
                onClick={() => {
                  //set styling for question holder based on answer
                  setAnswered(true);
                  if (i === props.correctAnswer) {
                    setCorrect(true);
                  } else if (correct !== true) {
                    setCorrect(false);
                  }

                  //set the answer state to clicked
                  if (questionsClicked[i] === false && correct !== true) {
                    const currentClickState = [];
                    for (const status of questionsClicked)
                      currentClickState.push(status);
                    currentClickState[i] = true;
                    setQuestionsClicked(currentClickState);
                  }
                }}
                clicked={questionsClicked[i]}
                correct={correct}
                isAnswerCorrect={i === props.correctAnswer}
                key={i}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500, marginLeft: 2, marginRight: 2 }}
                  key={i}
                >
                  {ans}
                </Typography>
              </AnswerHolder>
            </Grid>
          );
        })}
      </Grid>
      <AnswerFeedback correct={correct} answered={answered}>
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
        <Typography
          variant="body2"
          sx={{ fontWeight: 500, marginLeft: 1, marginRight: 2 }}
          color={correct ? "#22B16E" : "#f76f7a"}
        >
          {correct ? "Correct! Nice job!" : "Oops! Please try again."}
        </Typography>
      </AnswerFeedback>
    </QuestionHolder>
  );
}

export default MultipleChoiceQuestion;
