import React, { useEffect, useState } from "react";
import { Box, Button, Grid, TextField, Tooltip, Typography } from "@mui/material";
import styled from "@emotion/styled";
import theme from "constants/theme";
import { CheckCircle, XCircle } from "phosphor-react";
import { blankAnswer } from "components/ContentEditor/components/exportStructures";

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
    marginLeft: props.answered ? 10 : 0,
    color: "white",
    transition:
        "max-height 0.5s ease-in-out, background-color .2s ease-out, border .2s ease-out",
    maxHeight: props.answered ? 500 : 0,
    overflowY: "hidden",
}));

const BlankAnswerTextField = styled(TextField)({
    '& .MuiInputBase-root.Mui-disabled': {
        backgroundColor: 'lightgreen'
    },
});


interface FillIntheBlankProps {
    questionSegments: string[];
    correctAnswers: blankAnswer[];
    number: number;
}

function FillIntheBlankQuestion(props: FillIntheBlankProps) {
    const [results, setResults] = useState([]);         // boolean array of answer correctness
    const [correct, setCorrect] = useState(false);      // Whether all answers are correct
    const [answered, setAnswered] = useState(false);    // Whether the question was attempted yet

    //set initial state of all questions clicked to false on mount
    useEffect(() => {
        // if (props.answers && props.answers.length > 1) {
        //     for (let i = 0; i < props.answers.length; i++) {
        //         setQuestionsClicked((prev) => [...prev, false]);
        //     }
        // }
    }, []);

    const getNonFirstAnswerPossibilities = (correctAnswer: blankAnswer) => {
        const possibleChoices = correctAnswer.possibleChoices;
        return possibleChoices.slice(1, possibleChoices.length).join('\n');
    };

    const shouldShowAnswerTooltip = (correctAnswer: blankAnswer) => {
        return correctAnswer.possibleChoices.length > 1;
    };

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
            <Box sx={{ display: 'inline' }}>
                {props.correctAnswers.map((correctAnswer, i) => (
                    <Box key={i} sx={{ display: 'inline' }}>
                        <Typography
                            variant="h6"
                            sx={{ fontWeight: 200, fontFamily: "DM Serif Display", display: 'inline' }}
                        >
                            {props.questionSegments[i]}
                        </Typography>
                        <Tooltip
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
                            <BlankAnswerTextField
                                hiddenLabel
                                disabled={false} // TODO: Conditionally disable this depending on the answer was correct. Use hook array?
                                inputProps={{ min: 0, style: { textAlign: 'center' } }}
                                /* TODO: Show student's most recent answer or correctAnswer.possibleChoices[0]? */
                                variant="filled"
                                size="small"
                            />
                        </Tooltip>
                    </Box>
                ))}
                <Box sx={{ display: 'inline' }}>
                    <Typography
                        variant="h6"
                        sx={{ fontWeight: 200, fontFamily: "DM Serif Display", display: 'inline' }}
                    >
                        {props.questionSegments[props.questionSegments.length - 1]}
                    </Typography>
                </Box>
            </Box>
            <Button
                onClick={() => {
                    // Set styling for question holder based on answer
                    setAnswered(true);
                    // TODO: Check button's functionality + use hooks to conditionally style of textfields (feedback).
                }}
            >
                Check
            </Button>
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
        </QuestionHolder >
    );
}

export default FillIntheBlankQuestion;
