import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Tooltip, Button } from "@mui/material";
import styled from "@emotion/styled";
import { blankAnswer } from "components/ContentEditor/components/exportStructures";
import theme from "constants/theme";

interface FillIntheBlankProps {
    questionSegments: string[];
    correctAnswers: blankAnswer[];
    number: number;
}

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

const BlankAnswerTextField = styled(TextField)((props: any) => ({
    "& .MuiFilledInput-root": {
        backgroundColor: theme.palette.primary.light
    },
    "& .MuiFilledInput-root:hover": {
        backgroundColor: theme.palette.primary.light
    },
    "& .MuiFilledInput-root.Mui-focused": {
        backgroundColor: theme.palette.primary.light
    },
    marginBottom: props.answered ? 6 : 10,
    width: 175
}));

const CorrectAnswerTextField = styled(TextField)({
    '& fieldset': {
        border: 'none',
        display: 'inline'
    },
    '& .MuiInputBase-root.Mui-disabled': {
        backgroundColor: '#22B16E',
    },
    "& .MuiInputBase-input.Mui-disabled": {
        WebkitTextFillColor: "white",
    },
    marginBottom: 10,
    width: 175
});

const QuestionSegments = styled(Typography)({
    fontWeight: 200,
    fontFamily: "DM Serif Display",
    display: 'inline',
    whiteSpace: 'pre-wrap'
});

function FillIntheBlankQuestion(props: FillIntheBlankProps) {
    const [answerInputs, setAnswerInputs] = useState<string[]>([]);   // string array of question attempts/inputs
    const [results, setResults] = useState<boolean[]>([]);   // boolean array of answer correctness
    const [correct, setCorrect] = useState(false);    // Whether all answers are correct
    const [answered, setAnswered] = useState(false);    // Whether the question was attempted yet

    useEffect(() => {
        let defaultResults = [];
        for (let i = 0; i < props.correctAnswers.length; i++) {
            defaultResults.push(false);
        }
        setResults(defaultResults);
    }, []);

    const getNonFirstAnswerPossibilities = (correctAnswer: blankAnswer) => {
        const possibleChoices = correctAnswer.possibleChoices;
        return possibleChoices.slice(1, possibleChoices.length).join('\n');
    };

    const handleCheck = () => {
        let updatedResults = [...results];
        for (let i = 0; i < answerInputs.length; i++) {

            if (results[i] === false && answerInputs[i]) {

                let currentAnswerInput = answerInputs[i].trim(); // Removes whitespace

                if (props.correctAnswers[i].shouldHaveExactMatch) {
                    updatedResults[i] = props.correctAnswers[i].possibleChoices.some(correctAnswer => correctAnswer === currentAnswerInput);
                    console.log("updatedResults[", i, "]", updatedResults[i]);
                }
                // If true, currentAnswerInput is a number.
                else if (!isNaN(+currentAnswerInput)) {
                    updatedResults[i] = props.correctAnswers[i].possibleChoices.some(correctAnswer => parseFloat(correctAnswer) === parseFloat(currentAnswerInput));
                    console.log("updatedResults[", i, "]", updatedResults[i]);
                }
                else {
                    updatedResults[i] = props.correctAnswers[i].possibleChoices.some(correctAnswer => correctAnswer.toLowerCase() === currentAnswerInput.toLowerCase());
                    console.log("updatedResults[", i, "]", updatedResults[i]);
                }
            }
        }

        setResults(updatedResults);
        console.log(updatedResults);
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
                {"Question " + props.number}
            </Typography>
            <Box sx={{ display: 'inline' }}>
                {props.correctAnswers.map((correctAnswer, i) => (
                    <Box key={i + " " + correctAnswer.possibleChoices[0]} sx={{ display: 'inline' }}>
                        <QuestionSegments variant='h6'>
                            {props.questionSegments[i]}
                        </QuestionSegments>
                        {results[i]
                            ? <Tooltip
                                title={getNonFirstAnswerPossibilities(correctAnswer) === ''
                                    ? ''
                                    : <div style={{ whiteSpace: 'pre-line', textAlign: 'center' }}>
                                        {getNonFirstAnswerPossibilities(correctAnswer)}
                                    </div>
                                }
                                arrow>
                                <CorrectAnswerTextField
                                    hiddenLabel
                                    inputProps={{ min: 0, style: { textAlign: 'center', fontWeight: 500, fontSize: '1.0rem', padding: '5px 12px' } }}
                                    value={correctAnswer.possibleChoices[0]}
                                    variant="outlined"
                                    size="small"
                                    disabled
                                />
                            </Tooltip>
                            // AnswerInput is incorrect or has not been answered
                            : <BlankAnswerTextField
                                answered={answered}
                                hiddenLabel
                                inputProps={{ min: 0, style: { textAlign: 'center', padding: '4px 12px' } }}
                                value={answerInputs[i]}
                                variant="filled"
                                size="small"
                                helperText={answered && "Incorrect answer."}
                                error={answered}
                                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleAnswerInputChange(e, i)}
                            />
                        }
                    </Box>
                ))}
                <QuestionSegments variant='h6'>
                    {props.questionSegments[props.questionSegments.length - 1]}
                </QuestionSegments>
            </Box>
            <div style={{ textAlign: 'right' }}>
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
            </div>
        </QuestionHolder >
    );
}
export default FillIntheBlankQuestion;
