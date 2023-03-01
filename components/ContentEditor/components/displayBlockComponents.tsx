import React from "react";
import { Box, Grid, Typography, TextField, Tooltip, Button } from "@mui/material";
import styled from "@emotion/styled";
import { blankAnswer } from "./exportStructures";
import { ModalAnswer } from "./MultipleSelectModal";

const QuestionHolder = styled("div")({
  width: "70%",
  marginTop: 20,
  height: "auto",
  borderRadius: 4,
  display: "flex",
  flexDirection: "column",
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  alignSelf: "center",
  padding: 20,
});

const AnswerHolder = styled("div")({
  width: "100%",
  height: "auto",
  paddingTop: 10,
  paddingBottom: 10,
  backgroundColor: "#dbeafe",
  borderRadius: 4,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  cursor: "pointer",
  duration: 150,
  transition: "background-color .2s ease-out, color .2s ease-out",
  ":hover": {
    backgroundColor: "#3b82f6",
    color: "white",
  },
});

const CorrectAnswerTextField = styled(TextField)({
  '& fieldset': {
    border: 'none',
    display: 'inline'
  },
  '& .MuiInputBase-root.Mui-disabled': {
    backgroundColor: 'LightGreen',
  },
  "& .MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "#000000",
  },
  marginBottom: 10,
  width: 175
});

const QuestionSegments = styled(Typography)({
  fontWeight: 600,
  display: 'inline',
  whiteSpace: 'pre-wrap'
});

//displayed component when multiple choice is added
export function MultipleChoiceDisplayBlock({
  question,
  answers,
  correct,
}: {
  question: string;
  answers: string[];
  correct: number;
}) {
  return (
    <QuestionHolder className="exercise-content-wrapper">
      <Typography
        variant="overline"
        sx={{ fontWeight: 600, fontSize: "0.9em" }}
        fontSize="subtitle2"
        color={"#3b82f6"}
      >
        Multiple Choice Question
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        {question}
      </Typography>
      <Grid
        container
        rowSpacing={2}
        columnSpacing={2}
        sx={{ marginTop: 1, alignSelf: "center", justifySelf: "center" }}
      >
        <Grid item xs={6}>
          <AnswerHolder
            style={
              correct === 0
                ? { backgroundColor: "LightGreen" }
                : { backgroundColor: "IndianRed" }
            }
          >
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, marginLeft: 2, marginRight: 2 }}
              key={answers[0]}
            >
              {answers[0]}
            </Typography>
          </AnswerHolder>
        </Grid>
        <Grid item xs={6}>
          <AnswerHolder
            style={
              correct === 1
                ? { backgroundColor: "LightGreen" }
                : { backgroundColor: "IndianRed" }
            }
          >
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, marginLeft: 2, marginRight: 2 }}
              key={answers[1]}
            >
              {answers[1]}
            </Typography>
          </AnswerHolder>
        </Grid>
        <Grid item xs={6}>
          <AnswerHolder
            style={
              correct === 2
                ? { backgroundColor: "LightGreen" }
                : { backgroundColor: "IndianRed" }
            }
          >
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, marginLeft: 2, marginRight: 2 }}
              key={answers[2]}
            >
              {answers[2]}
            </Typography>
          </AnswerHolder>
        </Grid>
        <Grid item xs={6}>
          <AnswerHolder
            style={
              correct === 3
                ? { backgroundColor: "LightGreen" }
                : { backgroundColor: "IndianRed" }
            }
          >
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, marginLeft: 2, marginRight: 2 }}
              key={answers[3]}
            >
              {answers[3]}
            </Typography>
          </AnswerHolder>
        </Grid>
      </Grid>
    </QuestionHolder>
  );
}

//displayed component when multiple choice is added
export function MultipleSelectDisplayBlock({
  question,
  answers,
}: {
  question: string;
  answers: ModalAnswer[];
}) {
  //const data = props.contentState;
  //get metadata passed in via insertBlock() function passed to MultipleChoiceOption
  //const values = data.getEntity(props.block.getEntityAt(0)).getData();
  // console.log(values);

  return (
    <QuestionHolder className="exercise-content-wrapper">
      <Typography
        variant="overline"
        sx={{ fontWeight: 600, fontSize: "0.9em" }}
        fontSize="subtitle2"
        color={"#3b82f6"}
      >
        Multiple Select Question
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        {question}
      </Typography>
      <Grid
        container
        rowSpacing={2}
        columnSpacing={2}
        sx={{ marginTop: 1, alignSelf: "center", justifySelf: "center" }}
      >
        {answers.map((answer, index) => {
          return (
            <Grid item xs={12} key={index}>
              <AnswerHolder
                style={
                  answer.correct
                    ? { backgroundColor: "LightGreen" }
                    : { backgroundColor: "IndianRed" }
                }
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500, marginLeft: 2, marginRight: 2 }}
                  key={answer.text}
                >
                  {answer.text}
                </Typography>
              </AnswerHolder>
            </Grid>
          );
        })}
      </Grid>
    </QuestionHolder>
  );
}

//displayed component when fill-in-the-blank is added
export function FillInTheBlankDisplayBlock({
  questionSegments,
  correctAnswers,
}: {
  questionSegments: string[];
  correctAnswers: blankAnswer[];
}) {
  const getNonFirstAnswerPossibilities = (correctAnswer: blankAnswer) => {
    const possibleChoices = correctAnswer.possibleChoices;
    return possibleChoices.slice(1, possibleChoices.length).join('\n');
  };

  return (
    <QuestionHolder className="exercise-content-wrapper">
      <Typography
        variant="overline"
        sx={{ fontWeight: 600, fontSize: "0.9em" }}
        fontSize="subtitle2"
        color={"#3b82f6"}
      >
        Fill-in-the-Blank Question
      </Typography>
      <Box sx={{ display: 'inline' }}>
        {correctAnswers.map((correctAnswer, i) => (
          <Box key={i} sx={{ display: 'inline' }}>
            <QuestionSegments variant='h6'>
              {questionSegments[i]}
            </QuestionSegments>
            <Tooltip
              title={getNonFirstAnswerPossibilities(correctAnswer) === ''
                ? ''
                : <div style={{ whiteSpace: 'pre-line', textAlign: 'center' }}>
                  {getNonFirstAnswerPossibilities(correctAnswer)}
                </div>
              }
              arrow>
              <CorrectAnswerTextField
                hiddenLabel
                inputProps={{ min: 0, style: { textAlign: 'center', fontFamily: "Inter", fontWeight: 500, fontSize: '1.0rem', padding: '5px 12px' } }}
                value={correctAnswer.possibleChoices[0]}
                variant="outlined"
                size="small"
                disabled
              />
            </Tooltip>
          </Box>
        ))}
        <QuestionSegments variant='h6'>
          {questionSegments[questionSegments.length - 1]}
        </QuestionSegments>
      </Box>
      <div style={{ textAlign: 'right' }}>
        <Button
          onClick={() => {
          }}
          variant="contained"
          color="primary"
          disabled
          style={{ maxWidth: '60px', maxHeight: '30px', minWidth: '60px', minHeight: '30px', fontSize: 12 }}
        >
          CHECK
        </Button>
      </div>
    </QuestionHolder >
  );
}