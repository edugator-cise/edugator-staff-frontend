import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
} from "@mui/material";
import { useState } from "react";
import "./ExerciseStyles.module.css";
import { blankAnswer } from "./exportStructures";

// Unicode characters used to denote answer blanks when creating a FITB question.
const blankAnswerPlaceholderChars = ['Ⓐ', 'Ⓑ', 'Ⓒ', 'Ⓓ']

// Split string into string[] based on location of the placeholder characters.
const transformQuestionIntoSegments = (question: string) => {
    if(!blankAnswerPlaceholderChars.length) return [question];

    let regExpString = blankAnswerPlaceholderChars[0];
    blankAnswerPlaceholderChars.forEach((exp, i)=>{
        regExpString += '|'+ blankAnswerPlaceholderChars[i];
    })
    return question.split(new RegExp(regExpString));
};

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
    const [questionSegments, setQuestionSegments] = useState<string[]>([]);
    const [correctAnswers, setCorrectAnswers] = useState<blankAnswer[]>([]);

    const resetValues = () => {
        setQuestionSegments([]);
        setCorrectAnswers([]);
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
                            <div className="modal-question">
                                <label htmlFor="question">Question</label>
                                <input
                                    type="text"
                                    className="modal-input"
                                    onChange={(e) => {
                                        setQuestionSegments(transformQuestionIntoSegments(e.target.value));
                                        console.log("Current question segments: ", transformQuestionIntoSegments(e.target.value));
                                    }}
                                />
                            </div>
                            <div className="modal-answers">

                            </div>
                        </div>
                    </div>
                </div>
            </DialogTitle>
            <DialogActions>
                <Button
                    onClick={() => {
                        setOpen(false);
                    }}
                >
                    Close
                </Button>
                <Button
                    onClick={(e) => {
                        // console.log("Print MC Data:", question, correct, answers);
                        // insert(e, questionSegments, correctAnswers);
                        resetValues();
                        setOpen(false);
                    }}
                    variant="contained"
                    color="success"
                >
                    Add Question
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default FillInTheBlankModal;