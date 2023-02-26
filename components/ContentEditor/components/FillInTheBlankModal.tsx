import {
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogTitle,
    FormControlLabel,
    FormGroup,
} from "@mui/material";
import { Info } from "phosphor-react";
import React, { useState, useRef, useEffect } from "react";
import { MuiChipsInput } from "mui-chips-input";
import Tooltip from '@mui/material/Tooltip';
import { blankAnswer } from "./exportStructures";

export const FillInTheBlankModal = ({
    open,
    setOpen,
    insert,
}: {
    open: boolean;
    setOpen: (open: boolean) => void;
    insert: (
        e: any,
        questionSegments: string[],
        correctAnswers: blankAnswer[],
    ) => void;
}) => {
    const toolTipMessage = "Press Enter to add possible answer choice(s).\n“Require exact match” toggles case-sensitivity and will not approximate decimals.";
    const exactMatchText = "Require exact match";
    const placeholderChars = ['Ⓐ', 'Ⓑ', 'Ⓒ', 'Ⓓ'] // Unicode characters used to denote answer blanks when creating a FITB question.
    const placeholderRegExp = new RegExp(placeholderChars.join('|'));   // A regular expression to help deal with placeholder-related logic.

    const [question, setQuestion] = useState("");
    const [questionSegments, setQuestionSegments] = useState<string[]>([]);
    const [correctAnswers, setCorrectAnswers] = useState<blankAnswer[]>([]);
    const [placeholderCharCount, setPlaceholderCharCount] = useState(0);
    const [isAddQuestionDisabled, setIsAddQuestionDisabled] = useState(true);
    const [cursorPosition, setCursorPosition] = useState<number | null>(null);

    const modalInput = useRef<HTMLInputElement | null>(null);

    useEffect(() => console.log("Correct answers: ", correctAnswers), [correctAnswers]);
    useEffect(() => console.log("Question segments: ", questionSegments), [questionSegments]);
    useEffect(() => {
        updateAddQuestionButton(correctAnswers);
    }, [correctAnswers]);
    useEffect(() => {
        const input = modalInput.current;
        if (input) input.setSelectionRange(cursorPosition, cursorPosition); // Sets the cursor position to the value of cursorPosition when input is no longer focused.
    }, [modalInput, cursorPosition, questionSegments]);

    const resetValues = () => {
        setQuestion("");
        setQuestionSegments([]);
        setCorrectAnswers([]);
        setPlaceholderCharCount(0);
        setIsAddQuestionDisabled(true);
    };

    // Split string into string[] based on location of the placeholder characters (which are used as delimiters).
    const transformQuestionIntoSegments = (question: string) => {
        return question.split(placeholderRegExp);
    };

    // Returns a string built from current question segments wtih all placeholder characters replaced with in-order ones (for consistency).
    const questionWithInOrderPlaceholderChars = (question: string) => {
        let questionSegments = transformQuestionIntoSegments(question);
        let questionSegmentCount = questionSegments.length;
        let updatedQuestion = "";
        for (let i = 0; i < questionSegmentCount - 1; i++) {
            updatedQuestion += questionSegments[i] + placeholderChars[i];
        }
        return updatedQuestion + questionSegments[questionSegmentCount - 1];
    }

    const updateAddQuestionButton = (correctAnswers: blankAnswer[]) => {
        for (let i = 0; i < correctAnswers.length; i++) {
            if (correctAnswers[i].possibleChoices[0] === undefined) {
                setIsAddQuestionDisabled(true);
                break;
            }
            else {
                setIsAddQuestionDisabled(false);
            }
        }
    }

    const handleQuestionChange = (question: string) => {
        setQuestion(questionWithInOrderPlaceholderChars(question));
        setQuestionSegments(transformQuestionIntoSegments(question));
        setPlaceholderCharCount(transformQuestionIntoSegments(question).length - 1);
        updateBlankAnswers(question);
    }

    const handleAnswerChoicesChange = (updatedChoices: string[], i: number) => {
        let updatedCorrectAnswers = [...correctAnswers];
        updatedCorrectAnswers[i].possibleChoices = updatedChoices;
        setCorrectAnswers(updatedCorrectAnswers);
    }

    const handleExactMatchCheckboxChange = (i: number) => {
        let updatedCorrectAnswers = [...correctAnswers];
        updatedCorrectAnswers[i].shouldHaveExactMatch = !updatedCorrectAnswers[i].shouldHaveExactMatch;
        setCorrectAnswers(updatedCorrectAnswers);
    }

    // Adds a new blankAnswer object to correctAnswers[] if needed, otherwise deletes unnecessary blankAnswers.
    const updateBlankAnswers = (question: string) => {
        let questionSegments = transformQuestionIntoSegments(question);
        let updatedCorrectAnswers = [...correctAnswers];
        if (correctAnswers.length < questionSegments.length - 1) {
            let newBlankAnswer = new blankAnswer([], false);
            updatedCorrectAnswers.push(newBlankAnswer);
        }
        else if (correctAnswers.length > questionSegments.length - 1) {
            updatedCorrectAnswers.pop();
        }
        setCorrectAnswers(updatedCorrectAnswers);
    }

    const onInsertBlankClick = () => {
        if (placeholderCharCount < placeholderChars.length) {
            if (modalInput.current) {
                // Insert placeholder characters for question input at cursor position.
                let cursorPosition = modalInput.current.selectionStart;
                if ((cursorPosition !== null)) {
                    let textBeforeCursorPosition = modalInput.current.value.substring(0, cursorPosition);
                    let textAfterCursorPosition = modalInput.current.value.substring(cursorPosition, modalInput.current.value.length);
                    modalInput.current.value = textBeforeCursorPosition + placeholderChars[placeholderCharCount] + textAfterCursorPosition;
                    console.log("Current question input: ", modalInput.current.value);

                    handleQuestionChange(modalInput.current.value);
                    setCursorPosition(cursorPosition + 1); // Set cursorPosition to just after the inserted character.
                }
            }
        }
    };

    return (
        <Dialog open={open} aria-labelledby="alert-dialog-title" fullWidth={true}>
            <DialogTitle id="alert-dialog-title">
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Fill-in-the-Blank</h2>
                        </div>
                        <div className="modal-body">
                            <div className="fitb-modal-grid-container">
                                <div className="fitb-modal-title">
                                    <label htmlFor="question">Question</label>
                                </div>
                                <div className="fitb-modal-insert-blank">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        disabled={placeholderCharCount > placeholderChars.length - 1}
                                        onClick={() => {
                                            onInsertBlankClick();
                                        }}
                                    >
                                        + Insert Blank
                                    </Button>
                                </div>
                            </div>
                            <input
                                type="text"
                                className="modal-input"
                                ref={modalInput}
                                value={question}
                                onChange={(e) => {
                                    handleQuestionChange(e.target.value);
                                    setCursorPosition(e.target.selectionStart);
                                }}
                            />
                            <div className="fitb-modal-grid-container">
                                <div className="fitb-modal-title">
                                    <label htmlFor="answers">Answers</label>
                                </div>
                                <div className="fitb-modal-info-tooltip">
                                    <Tooltip
                                        title={<div style={{ whiteSpace: 'pre-line', textAlign: 'center' }}>{toolTipMessage}</div>}
                                        arrow
                                    >
                                        <Info size={32} />
                                    </Tooltip>
                                </div>
                            </div>
                            {correctAnswers.map((correctAnswer, i) => (
                                <Box key={i} sx={{ display: 'inline' }}>
                                    {placeholderChars[i]}
                                    <MuiChipsInput
                                        value={correctAnswer.possibleChoices}
                                        onChange={(e) => handleAnswerChoicesChange(e, i)}
                                    />
                                    <FormGroup>
                                        <FormControlLabel control={
                                            <Checkbox
                                                checked={correctAnswer.shouldHaveExactMatch}
                                                onChange={() => handleExactMatchCheckboxChange(i)}
                                            />
                                        }
                                            label={exactMatchText}
                                        />
                                    </FormGroup>
                                </Box>
                            ))}
                        </div>
                    </div>
                </div>
            </DialogTitle>
            <DialogActions>
                <Button
                    onClick={() => {
                        setOpen(false);
                        resetValues();
                    }}
                >
                    Close
                </Button>
                <Button
                    onClick={(e) => {
                        console.log("Print FITB Data:", questionSegments, correctAnswers);
                        insert(e, questionSegments, correctAnswers);
                        resetValues();
                        setOpen(false);
                    }}
                    variant="contained"
                    color="success"
                    disabled={isAddQuestionDisabled}
                >
                    Add Question
                </Button>
            </DialogActions>
        </Dialog >
    );
};

export default FillInTheBlankModal;