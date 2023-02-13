import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
} from "@mui/material";
import { Info } from "phosphor-react";
import { useState, useRef, useEffect } from "react";
import { MuiChipsInput } from "mui-chips-input";
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
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
    const toolTipMessage = "Press Enter to add possible answer choice(s).\n“Require exact match” toggles case-sensitivity and will not approximate decimals.";
    // Unicode characters used to denote answer blanks when creating a FITB question.
    const blankAnswerPlaceholderChars = ['Ⓐ', 'Ⓑ', 'Ⓒ', 'Ⓓ']

    const [questionSegments, setQuestionSegments] = useState<string[]>([]);
    const [correctAnswers, setCorrectAnswers] = useState<blankAnswer[]>([]);
    const [blankAnswerPlaceholderIndex, setBlankAnswerPlaceholderIndex] = useState(0);

    useEffect(() => console.log("Current state of correct answers: ", correctAnswers), [correctAnswers]);

    // Split string into string[] based on location of the placeholder characters (which are used as delimiters).
    const transformQuestionIntoSegments = (question: string) => {
        if(!blankAnswerPlaceholderChars.length) return [question];

        let regExpString = blankAnswerPlaceholderChars[0];
        blankAnswerPlaceholderChars.forEach((exp, i)=>{
            regExpString += '|'+ blankAnswerPlaceholderChars[i];
        })
        return question.split(new RegExp(regExpString));
    };

    const handleAnswerChoicesChange = (updatedChoices: string[], i: number) => {
        let updatedCorrectAnswers = [...correctAnswers];
        updatedCorrectAnswers[i].possibleChoices = updatedChoices;
        setCorrectAnswers(updatedCorrectAnswers);
    }

    // Add a new blankAnswer object to correctAnswers[]
    const addNewBlankAnswer = () => {
        let updatedCorrectAnswers = [...correctAnswers];
        let newBlankAnswer = new blankAnswer([], false);
        updatedCorrectAnswers.push(newBlankAnswer);
        setCorrectAnswers(updatedCorrectAnswers);
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
                console.log("Current question input: ", modalInput.current.value);
                setQuestionSegments(transformQuestionIntoSegments(modalInput.current.value));
                setBlankAnswerPlaceholderIndex(blankAnswerPlaceholderIndex + 1);
                addNewBlankAnswer();
            }
        }
        else {
            // TODO:  user tries to insert more than 4 blanks - Will disable and style the button differently
        }
    };

    const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
        <Tooltip {...props} classes={{ popper: className }} />
      ))({
        [`& .${tooltipClasses.tooltip}`]: {
          maxWidth: 200,
        },
      });

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
                                <Button
                                    onClick={() => {
                                        onInsertBlankClick();
                                    }}
                                    variant="contained"
                                    color="primary"
                                    disabled={blankAnswerPlaceholderIndex > blankAnswerPlaceholderChars.length - 1}
                                >
                                    + Insert Blank
                                </Button>
                                <div>
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
                            </div>
                            <div className="modal-answers">
                                <label htmlFor="answers">Answers</label>
                                <CustomWidthTooltip title={toolTipMessage} arrow>
                                    <Info size={32} />
                                </CustomWidthTooltip>
                                {correctAnswers.map((correctAnswer, i) => (
                                    <div key={i}>
                                        <MuiChipsInput value={correctAnswer.possibleChoices} onChange={(e) => handleAnswerChoicesChange(e, i)} />
                                    </div>
                                ))}
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