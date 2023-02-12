import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
} from "@mui/material";
import { useState } from "react";
import "./ExerciseStyles.module.css";
import { BlankAnswer } from "lib/shared/types";

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
        correctAnswers: BlankAnswer[],
    ) => void;
}) => {
    const [questionSegments, setQuestionSegments] = useState("");
    const [correctAnswers, setCorrectAnswers] = useState<BlankAnswer>();

    const resetValues = () => {
        setQuestionSegments("");
        setCorrectAnswers((): BlankAnswer => ({ possibleChoices: [], shouldHaveExactMatch: false }));
    };

    return (
        <Dialog open={open} aria-labelledby="alert-dialog-title" fullWidth={true}>
            <DialogTitle id="alert-dialog-title">
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Fill-In-The-Blank</h2>
                        </div>
                        <div className="modal-body">
                            <div className="modal-question">
                                <label htmlFor="question">Question</label>
                                <input
                                    type="text"
                                    className="modal-input"
                                    // onChange={(e) => setQuestion(e.target.value)}
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