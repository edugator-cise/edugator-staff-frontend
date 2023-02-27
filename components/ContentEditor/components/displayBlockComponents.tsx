import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, TextField, Tooltip, Button } from "@mui/material";
import styled from "@emotion/styled";
import { blankAnswer } from "./exportStructures";
import theme from "constants/theme";
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

const BlankAnswerTextField = styled(TextField)((props: any) => ({
  "& .MuiFilledInput-root": {
    backgroundColor: theme.palette.primary.light,
  },
  "& .MuiFilledInput-root:hover": { // TODO: Figure out how to stop input from going back to its default color on hover/focus - might leave it
    backgroundColor: theme.palette.primary.light,
  },
  "& .MuiFilledInput-root.Mui-focused": {
    backgroundColor: theme.palette.primary.light,
  },
  marginBottom: props.answered ? 0 : 24,
}));

const CorrectAnswerTextField = styled(TextField)({
  '& .MuiInputBase-root.Mui-disabled': {
    backgroundColor: 'LightGreen'
  },
  marginBottom: 24
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
  number,
}: {
  questionSegments: string[];
  correctAnswers: blankAnswer[];
  number?: number; // Number is an optional prop that only exists for numbering the questions for student view. If it is undefined, we are in admin view.
}) {

  const [answerInputs, setAnswerInputs] = useState<string[]>([]);   // string array of question attempts/inputs
  const [results, setResults] = useState<boolean[]>([]);   // boolean array of answer correctness
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

      if (results[i] === false && answerInputs[i]) {

        let currentAnswerInput = answerInputs[i].trim(); // Remove whitespace

        if (correctAnswers[i].shouldHaveExactMatch) {
          if (correctAnswers[i].possibleChoices.some(correctAnswer => correctAnswer === currentAnswerInput)) {
            updatedResults[i] = true;
          }
        }
        else if (!isNaN(+currentAnswerInput)) { // If true, currentAnswerInput is a number.
          if (correctAnswers[i].possibleChoices.some(correctAnswer => parseFloat(correctAnswer) === parseFloat(currentAnswerInput))) {
            updatedResults[i] = true;
          }
        } else if (correctAnswers[i].possibleChoices.some(correctAnswer => correctAnswer.toLowerCase() === currentAnswerInput.toLowerCase())) {
          updatedResults[i] = true;
        } else {
          updatedResults[i] = false;
        }
      }
    }

    setResults(updatedResults);
    if (updatedResults.every(result => result === true)) {
      setCorrect(true);
    }
  }

  const handleAnswerInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, i: number) => {
    let updatedAnswerInputs = [...answerInputs];
    updatedAnswerInputs[i] = e.target.value;
    console.log("Updated answer inputs: ", updatedAnswerInputs);
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
                  inputProps={{ min: 0, style: { textAlign: 'center' } }}
                  value={correctAnswer.possibleChoices[0]}
                  variant="filled"
                  size="small"
                  disabled
                />
              </Tooltip>
              // AnswerInput is incorrect or has not been answered
              : <BlankAnswerTextField
                answered={answered}
                hiddenLabel
                inputProps={{ min: 0, style: { textAlign: 'center' } }}
                /* TODO: Show student's most recent answer or correctAnswer.possibleChoices[0]? */
                value={answerInputs[i]}
                variant="filled"
                size="small"
                helperText={answered ? "Incorrect answer." : ""}
                error={answered}
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleAnswerInputChange(e, i)}
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