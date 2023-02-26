import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";

const emptyAnswerState: ModalAnswer[] = [
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
  {
    text: "",
    correct: false,
  },
];

export type ModalAnswer = {
  text: string;
  correct: boolean;
};

function MultipleSelectModal({
  open,
  setOpen,
  insert,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  insert: (e: any, question: string, answers: ModalAnswer[]) => void;
}) {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState(emptyAnswerState);

  //function to reset states once the question has been added to editor
  const resetValues = () => {
    setQuestion("");
    //deep copy of emptyAnswerState
    setAnswers(JSON.parse(JSON.stringify(emptyAnswerState)));
  };

  return (
    <Dialog open={open} aria-labelledby="alert-dialog-title" fullWidth={true}>
      <DialogTitle id="alert-dialog-title">
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Multiple Select</h2>
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
              <div className="modal-question">
                <label htmlFor="answers">Answers (check correct)</label>
                <div className="modal-ms-answers">
                  {/* Input box and checkbox for each answer */}
                  {answers.map((answer, i) => {
                    return (
                      <div key={i} className="modal-ms-answer">
                        <div className="modal-answer-input">
                          <Checkbox
                            checked={answer.correct}
                            onChange={() => {
                              // Update answers array
                              const newAnswers = [...answers];
                              newAnswers[i].correct = !newAnswers[i].correct;
                              setAnswers(newAnswers);
                            }}
                          />
                          <input
                            type="text"
                            className="modal-input"
                            value={answer.text}
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
}

export default MultipleSelectModal;
