import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, TextField, Tooltip, Button } from "@mui/material";
import styled from "@emotion/styled";
import "./ExerciseStyles.module.css";
import { blankAnswer } from "./exportStructures";

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

const BlankAnswerTextField = styled(TextField)({
});

const CorrectAnswerTextField = styled(TextField)({
  '& .MuiInputBase-root.Mui-disabled': {
    backgroundColor: 'LightGreen'
  },
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
export function MultipleSelectDisplayBlock(props: any) {
  const data = props.contentState;
  //get metadata passed in via insertBlock() function passed to MultipleChoiceOption
  const values = data.getEntity(props.block.getEntityAt(0)).getData();
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
        {values.question}
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
              values.correct.find((e: number) => e === 1) !== undefined
                ? { backgroundColor: "LightGreen" }
                : { backgroundColor: "IndianRed" }
            }
          >
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, marginLeft: 2, marginRight: 2 }}
              key={values.answer1}
            >
              {values.answer1}
            </Typography>
          </AnswerHolder>
        </Grid>
        <Grid item xs={6}>
          <AnswerHolder
            style={
              values.correct.find((e: number) => e === 2) !== undefined
                ? { backgroundColor: "LightGreen" }
                : { backgroundColor: "IndianRed" }
            }
          >
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, marginLeft: 2, marginRight: 2 }}
              key={values.answer2}
            >
              {values.answer2}
            </Typography>
          </AnswerHolder>
        </Grid>
        <Grid item xs={6}>
          <AnswerHolder
            style={
              values.correct.find((e: number) => e === 3) !== undefined
                ? { backgroundColor: "LightGreen" }
                : { backgroundColor: "IndianRed" }
            }
          >
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, marginLeft: 2, marginRight: 2 }}
              key={values.answer3}
            >
              {values.answer3}
            </Typography>
          </AnswerHolder>
        </Grid>
        <Grid item xs={6}>
          <AnswerHolder
            style={
              values.correct.find((e: number) => e === 4) !== undefined
                ? { backgroundColor: "LightGreen" }
                : { backgroundColor: "IndianRed" }
            }
          >
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, marginLeft: 2, marginRight: 2 }}
              key={values.answer4}
            >
              {values.answer4}
            </Typography>
          </AnswerHolder>
        </Grid>
      </Grid>
    </QuestionHolder>
  );
}

//displayed component when fill-in-the-blank is added
export function FillInTheBlankDisplayBlock({
  questionSegments,
  correctAnswers,
  number,
}: {
  questionSegments: string[];
  correctAnswers: blankAnswer[];
  number?: number; // Number is an optional prop that only exists for numbering the questions for student view. If it is undefined, we are in admin view.
}) {

  const [answerInputs, setAnswerInputs] = useState<string[]>([]);   // string array of question attempts/inputs
  const [results, setResults] = useState<boolean[]>([false]);   // boolean array of answer correctness
  const [correct, setCorrect] = useState(false);    // Whether all answers are correct
  const [answered, setAnswered] = useState(false);    // Whether the question was attempted yet


  useEffect(() => {
    let defaultResults = [];
    for (let i = 0; i < correctAnswers.length; i++) {
      defaultResults.push(false);
    }
    setResults(defaultResults);
    if (number === undefined) {
      setCorrect(true);
    }
  }, []);

  const getNonFirstAnswerPossibilities = (correctAnswer: blankAnswer) => {
    const possibleChoices = correctAnswer.possibleChoices;
    return possibleChoices.slice(1, possibleChoices.length).join('\n');
  };

  const shouldShowAnswerTooltip = (correctAnswer: blankAnswer) => {
    return correctAnswer.possibleChoices.length > 1;
  };

  const handleCheck = () => {
    let updatedResults = [...results];
    for (let i = 0; i < answerInputs.length; i++) {
      // TODO: whitespace, toCapital, etc
      if (correctAnswers[i].possibleChoices.includes(answerInputs[i])) {
        updatedResults[i] = true;
      } else {
        updatedResults[i] = false;
      }
    }
    console.log("updated results", updatedResults);
    setResults(updatedResults);
    if (updatedResults.every(result => result === true)) {
      setCorrect(true);
    }
  }

  const handleAnswerInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, i: number) => {
    let updatedAnswerInputs = [...answerInputs];
    updatedAnswerInputs[i] = e.target.value;
    console.log("updated answer inputs: ", updatedAnswerInputs);
    setAnswerInputs(updatedAnswerInputs);
  }

  return (
    <QuestionHolder className="exercise-content-wrapper">
      <Typography
        variant="overline"
        sx={{ fontWeight: 600, fontSize: "0.9em" }}
        fontSize="subtitle2"
        color={"#3b82f6"}
      >
        {number ? "Question " + number : "Fill-in-the-Blank Question"}
      </Typography>
      <Box sx={{ display: 'inline' }}>
        {correctAnswers.map((correctAnswer, i) => (
          <Box key={i} sx={{ display: 'inline' }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 200, fontFamily: "DM Serif Display", display: 'inline' }}
            >
              {questionSegments[i]}
            </Typography>
            {!number || results[i] // If number does not exist, we are in admin view. Otherwise in student view.
              ? <Tooltip
                // TODO: Figure out why the div in title causes tooltip to never hide.
                hidden={shouldShowAnswerTooltip(correctAnswer)}
                title={
                  <div style={{ whiteSpace: 'pre-line', textAlign: 'center' }}>
                    {/* TODO: Show student's correct answer instead? And then the tooltip would list whatever choices they didn't enter. */}
                    {getNonFirstAnswerPossibilities(correctAnswer)}
                  </div>
                }
                arrow
              >
                <CorrectAnswerTextField
                  hiddenLabel
                  style={{ backgroundColor: 'LightGreen' }}
                  inputProps={{ min: 0, style: { textAlign: 'center' } }}
                  value={correctAnswer.possibleChoices[0]}
                  variant="filled"
                  size="small"
                  disabled
                />
              </Tooltip>
              : <BlankAnswerTextField
                hiddenLabel
                inputProps={{ min: 0, style: { textAlign: 'center' } }}
                /* TODO: Show student's most recent answer or correctAnswer.possibleChoices[0]? */
                value={answerInputs[i]}
                variant="filled"
                size="small"
                helperText={answered ? "Incorrect entry." : ""}
                error={answered}
                onChange={(e) => handleAnswerInputChange(e, i)}
              />
            }
          </Box>
        ))}
        <Typography
          variant="h6"
          sx={{ fontWeight: 200, fontFamily: "DM Serif Display", display: 'inline' }}
        >
          {questionSegments[questionSegments.length - 1]}
        </Typography>
      </Box>
      <Button
        onClick={() => {
          setAnswered(true);
          handleCheck();
        }}
        variant="contained"
        color="primary"
        disabled={correct}
        style={{ maxWidth: '60px', maxHeight: '30px', minWidth: '60px', minHeight: '30px', fontSize: 12 }}
      >
        CHECK
      </Button>
    </QuestionHolder >
  );
}