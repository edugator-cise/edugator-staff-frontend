import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Checkbox,
} from "@mui/material";
import { useState } from "react";

export const MultipleChoiceModal = ({
  open,
  setOpen,
  insert,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  insert: (
    e: any,
    question: string,
    answers: {
      text: string;
      correct: boolean;
    }[]
  ) => void;
}) => {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([
    {
      text: "",
      correct: true,
    },
    {
      text: "",
      correct: false,
    },
    {
      text: "",
      correct: false,
    },
    {
      text: "",
      correct: false,
    },
  ]);

  const resetValues = () => {
    setQuestion("");
    setAnswers([
      {
        text: "",
        correct: true,
      },
      {
        text: "",
        correct: false,
      },
      {
        text: "",
        correct: false,
      },
      {
        text: "",
        correct: false,
      },
    ]);
  };

  return (
    <Dialog open={open} aria-labelledby="alert-dialog-title" fullWidth={true}>
      <DialogTitle id="alert-dialog-title">
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Multiple Choice</h2>
            </div>
            <div className="modal-body">
              <div className="modal-question">
                <label htmlFor="question">Question</label>
                <input
                  type="text"
                  className="modal-input"
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </div>
              <label htmlFor="answers">Answers (check correct)</label>
              <div className="modal-answers">
                {/* Input box and checkbox for each answer */}
                {Array.from(Array(4).keys()).map((i) => {
                  const answerCorrect = answers[i].correct;
                  return (
                    <div className="modal-answer">
                      <div className="modal-answer-input">
                        <Checkbox
                          checked={answerCorrect}
                          onChange={() => {
                            // Update answers array
                            const newAnswers = [...answers];
                            newAnswers[i].correct = !answerCorrect;
                            setAnswers(newAnswers);
                          }}
                        />
                        <input
                          type="text"
                          className="modal-input"
                          value={answers[i].text}
                          placeholder={`Answer ${i + 1}`}
                          onChange={(e) => {
                            // Update answers array
                            const newAnswers = [...answers];
                            newAnswers[i].text = e.target.value;
                            setAnswers(newAnswers);
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
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
            console.log("Print MC Data:", question, answers);
            insert(e, question, answers);
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

export default MultipleChoiceModal;
