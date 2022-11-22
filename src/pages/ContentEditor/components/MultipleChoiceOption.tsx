import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Checkbox,
} from "@mui/material";
import { useState } from "react";
import "./ExerciseStyles.css";

export const MultipleChoiceModal = ({
  showMultipleChoiceModal,
  setShowMultipleChoiceModal,
  setQuestion,
  question,
  setCorrect,
  correct,
  setAnswers,
  answers,
  resetValues,
  insertMC,
}: {
  showMultipleChoiceModal: boolean;
  setShowMultipleChoiceModal: (showMultipleChoiceModal: boolean) => void;
  setQuestion: (question: string) => void;
  setCorrect: (correct: number) => void;
  setAnswers: (answers: string[]) => void;
  answers: string[];
  question: string;
  correct: number;
  resetValues: () => void;
  insertMC: (
    question: string,
    correct: number,
    answer1: string,
    answer2: string,
    answer3: string,
    answer4: string
  ) => void;
}) => {
  return (
    <Dialog
      open={showMultipleChoiceModal}
      aria-labelledby="alert-dialog-title"
      fullWidth={true}
    >
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
                  const answerCorrect = correct === i;
                  return (
                    <div className="modal-answer">
                      <div className="modal-answer-input">
                        <Checkbox
                          checked={answerCorrect}
                          onChange={() => {
                            setCorrect(i);
                          }}
                        />
                        <input
                          type="text"
                          className="modal-input"
                          value={answers[i]}
                          placeholder={`Answer ${i + 1}`}
                          onChange={(e) => {
                            // Update answers array
                            const newAnswers = [...answers];
                            newAnswers[i] = e.target.value;
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
            setShowMultipleChoiceModal(false);
          }}
        >
          Close
        </Button>
        <Button
          onClick={() => {
            console.log("Print MC Data:", question, correct, answers);
            insertMC(
              question,
              correct,
              "A) " + answers[1],
              "B) " + answers[2],
              "C) " + answers[3],
              "D) " + answers[4]
            );
            resetValues();
            setShowMultipleChoiceModal(false);
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

function MultipleChoiceOption(props: any) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>("");
  const [correct, setCorrect] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>(["", "", "", ""]);
  const [answer1, setAnswer1] = useState<string>("");
  const [answer2, setAnswer2] = useState<string>("");
  const [answer3, setAnswer3] = useState<string>("");
  const [answer4, setAnswer4] = useState<string>("");

  //function to reset states once the question has been added to editor
  const resetValues = () => {
    setQuestion("");
    setCorrect(0);
    setAnswers(["", "", "", ""]);
    /* setAnswer1("");
    setAnswer2("");
    setAnswer3("");
    setAnswer4(""); */
  };

  const [showMultipleChoiceModal, setShowMultipleChoiceModal] = useState(false);

  return (
    <div className="rdw-exercise-wrapper">
      <MultipleChoiceModal
        showMultipleChoiceModal={showMultipleChoiceModal}
        setShowMultipleChoiceModal={setShowMultipleChoiceModal}
        setQuestion={setQuestion}
        setCorrect={setCorrect}
        setAnswers={setAnswers}
        answers={answers}
        insertMC={props.insertMC}
        resetValues={resetValues}
        correct={correct}
        question={question}
      />

      <div
        className="rdw-option-wrapper"
        onClick={() => {
          setShowMultipleChoiceModal(true);
          //setExpanded(!expanded);
          resetValues();
        }}
        // onBlur={() => {
        //   setExpanded(false);
        // }}
      >
        Multiple Choice Question
      </div>
    </div>
  );
}

export default MultipleChoiceOption;
