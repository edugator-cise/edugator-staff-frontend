import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
} from "@mui/material";
import { useState, useRef } from "react";
import { MuiChipsInput } from "mui-chips-input";
import "./ExerciseStyles.module.css";
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
    // Unicode characters used to denote answer blanks when creating a FITB question.
    const blankAnswerPlaceholderChars = ['Ⓐ', 'Ⓑ', 'Ⓒ', 'Ⓓ']
    
    const [questionSegments, setQuestionSegments] = useState<string[]>([]);
    const [correctAnswers, setCorrectAnswers] = useState<blankAnswer[]>([]);
    const [blankAnswerPlaceholderIndex, setBlankAnswerPlaceholderIndex] = useState(0);
    const [chips, setChips] = useState<string[]>([])

    // Split string into string[] based on location of the placeholder characters.
    const transformQuestionIntoSegments = (question: string) => {
        if(!blankAnswerPlaceholderChars.length) return [question];

        let regExpString = blankAnswerPlaceholderChars[0];
        blankAnswerPlaceholderChars.forEach((exp, i)=>{
            regExpString += '|'+ blankAnswerPlaceholderChars[i];
        })
        return question.split(new RegExp(regExpString));
    };

    const handleChips1Change = (newChips: string[]) => {
        setChips(newChips)
    }

    const resetValues = () => {
        setQuestionSegments([]);
        setCorrectAnswers([]);
        setBlankAnswerPlaceholderIndex(0);
    };

    const modalInput = useRef<HTMLInputElement | null>(null);

    const onInsertBlankClick = () => {
        if (blankAnswerPlaceholderIndex < blankAnswerPlaceholderChars.length) {
            if (modalInput.current) {
                // append the special character for question input view
                modalInput.current.value = modalInput.current.value + blankAnswerPlaceholderChars[blankAnswerPlaceholderIndex];
                console.log("Question Input View: ", modalInput.current.value);
                setQuestionSegments(transformQuestionIntoSegments(modalInput.current.value));
                setBlankAnswerPlaceholderIndex(blankAnswerPlaceholderIndex + 1);
            }
        }
        else {
            // TODO:  user tries to insert more than 4 blanks - Will disable and style the button differently
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
                            <div className="modal-question">
                                <label htmlFor="question">Question</label>
                                <input
                                    type="text"
                                    className="modal-input"
                                    ref={modalInput}
                                    onChange={(e) => {
                                        setQuestionSegments(transformQuestionIntoSegments(e.target.value));
                                        // TODO: Need to deal with deleting blanks
                                        console.log("Current question segments: ", transformQuestionIntoSegments(e.target.value));
                                    }}
                                />
                            </div>
                            <div>
                                <Button
                                    onClick={() => {
                                        onInsertBlankClick();
                                    }}
                                >
                                    Insert Blank
                                </Button>
                            </div>
                            <div className="modal-answers">
                                <MuiChipsInput value={chips} onChange={handleChips1Change} />
                            </div>
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
                >
                    Add Question
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default FillInTheBlankModal;