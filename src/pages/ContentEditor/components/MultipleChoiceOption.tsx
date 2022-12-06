import React, { useState } from "react";
import "./ExerciseStyles.css";

function MultipleChoiceOption(props: any) {
  const [expanded, setExpanded] = useState(false);
  const [question, setQuestion] = useState("");
  const [correct, setCorrect] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  const [answer4, setAnswer4] = useState("");

  //function to reset states once the question has been added to editor
  const resetValues = () => {
    setQuestion("");
    setCorrect("");
    setAnswer1("");
    setAnswer2("");
    setAnswer3("");
    setAnswer4("");
  };

  const renderModal = () => {
    return (
      <div className="rdw-exercise-modal">
        <label className="rdw-exercise-text-instruction">
          Check a radio box to mark the correct answer
        </label>
        <label className="rdw-exercise-text-label" htmlFor="question">
          Question
        </label>
        <input
          type="text"
          onClick={(e) => {
            e.stopPropagation();
          }}
          value={question}
          className="rdw-exercise-text-input"
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
        ></input>

        <label className="rdw-exercise-text-label" htmlFor="answer1">
          Answer 1
        </label>
        <div className="rdw-exercise-modal-flexbox">
          <input
            type="text"
            onClick={(e) => {
              e.stopPropagation();
            }}
            value={answer1}
            onChange={(e) => {
              setAnswer1(e.target.value);
            }}
            className="rdw-exercise-text-input"
          ></input>
          <input
            type="radio"
            name="correctAnswer"
            value="1"
            onClick={(e) => {
              e.stopPropagation();
              setCorrect((e.target as HTMLTextAreaElement).value);
            }}
          ></input>
        </div>

        <label className="rdw-exercise-text-label" htmlFor="answer2">
          Answer 2
        </label>
        <div className="rdw-exercise-modal-flexbox">
          <input
            type="text"
            onClick={(e) => {
              e.stopPropagation();
            }}
            value={answer2}
            onChange={(e) => {
              setAnswer2(e.target.value);
            }}
            className="rdw-exercise-text-input"
          ></input>
          <input
            type="radio"
            name="correctAnswer"
            value="2"
            onClick={(e) => {
              e.stopPropagation();
              setCorrect((e.target as HTMLTextAreaElement).value);
            }}
          ></input>
        </div>

        <label className="rdw-exercise-text-label" htmlFor="answer3">
          Answer 3
        </label>
        <div className="rdw-exercise-modal-flexbox">
          <input
            type="text"
            onClick={(e) => {
              e.stopPropagation();
            }}
            value={answer3}
            onChange={(e) => {
              setAnswer3(e.target.value);
            }}
            className="rdw-exercise-text-input"
          ></input>
          <input
            type="radio"
            name="correctAnswer"
            value="3"
            onClick={(e) => {
              e.stopPropagation();
              setCorrect((e.target as HTMLTextAreaElement).value);
            }}
          ></input>
        </div>

        <label className="rdw-exercise-text-label" htmlFor="answer4">
          Answer 4
        </label>
        <div className="rdw-exercise-modal-flexbox">
          <input
            type="text"
            onClick={(e) => {
              e.stopPropagation();
            }}
            value={answer4}
            onChange={(e) => {
              setAnswer4(e.target.value);
            }}
            className="rdw-exercise-text-input"
          ></input>
          <input
            type="radio"
            name="correctAnswer"
            value="4"
            onClick={(e) => {
              e.stopPropagation();
              setCorrect((e.target as HTMLTextAreaElement).value);
            }}
          ></input>
        </div>

        <span className="rdw-exercise-modal-btn-section">
          <button
            className="rdw-exercise-modal-btn"
            onClick={() => {
              console.log(
                "Print MC Data:",
                question,
                correct,
                answer1,
                answer2,
                answer3,
                answer4
              );
              props.insertMC(
                question,
                correct,
                "A) " + answer1,
                "B) " + answer2,
                "C) " + answer3,
                "D) " + answer4
              );
              resetValues();
            }}
          >
            Add
          </button>
        </span>
      </div>
    );
  };

  return (
    <div className="rdw-exercise-wrapper">
      <div
        className="rdw-option-wrapper"
        onClick={() => {
          setExpanded(!expanded);
          resetValues();
        }}
        // onBlur={() => {
        //   setExpanded(false);
        // }}
      >
        Multiple Choice Question
        {expanded && renderModal()}
      </div>
    </div>
  );
}

export default MultipleChoiceOption;
