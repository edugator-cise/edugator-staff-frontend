import React, { useState } from "react";
import "./MCOStyles.css";

function MultipleChoiceOption(props) {
  const [expanded, setExpanded] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  const [answer4, setAnswer4] = useState("");
  const [correct, setCorrect] = useState("");

  //function to reset states once the question has been added to editor
  const resetValues = () => {
    setQuestion("");
    setAnswer1("");
    setAnswer2("");
    setAnswer3("");
    setAnswer4("");
    setCorrect("");
  };

  const renderModal = () => {
    return (
      <div className="rdw-mc-modal">
        <label className="rdw-mc-text-label" htmlFor="question">
          Question
        </label>
        <input
          type="text"
          onClick={(e) => {
            e.stopPropagation();
          }}
          value={question}
          className="rdw-mc-text-input"
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
        ></input>

        <label className="rdw-mc-text-label" htmlFor="answer1">
          Answer 1
        </label>
        <input
          type="text"
          onClick={(e) => {
            e.stopPropagation();
          }}
          value={answer1}
          onChange={(e) => {
            setAnswer1(e.target.value);
          }}
          className="rdw-mc-text-input"
        ></input>
        <input
          type="radio"
          name="correctAnswer"
          htmlFor="correct"
          value="1"
          onClick={(e) => {
            e.stopPropagation();
            setCorrect(e.target.value);
          }}
        ></input>

        <label className="rdw-mc-text-label" htmlFor="answer2">
          Answer 2
        </label>
        <input
          type="text"
          onClick={(e) => {
            e.stopPropagation();
          }}
          value={answer2}
          onChange={(e) => {
            setAnswer2(e.target.value);
          }}
          className="rdw-mc-text-input"
        ></input>
        <input
          type="radio"
          name="correctAnswer"
          htmlFor="correct"
          value="2"
          onClick={(e) => {
            e.stopPropagation();
            setCorrect(e.target.value);
          }}
        ></input>

        <label className="rdw-mc-text-label" htmlFor="answer3">
          Answer 3
        </label>
        <input
          type="text"
          onClick={(e) => {
            e.stopPropagation();
          }}
          value={answer3}
          onChange={(e) => {
            setAnswer3(e.target.value);
          }}
          className="rdw-mc-text-input"
        ></input>
        <input
          type="radio"
          name="correctAnswer"
          htmlFor="correct"
          value="3"
          onClick={(e) => {
            e.stopPropagation();
            setCorrect(e.target.value);
          }}
        ></input>

        <label className="rdw-mc-text-label" htmlFor="answer4">
          Answer 4
        </label>
        <input
          type="text"
          onClick={(e) => {
            e.stopPropagation();
          }}
          value={answer4}
          onChange={(e) => {
            setAnswer4(e.target.value);
          }}
          className="rdw-mc-text-input"
        ></input>
        <input
          type="radio"
          name="correctAnswer"
          htmlFor="correct"
          value="4"
          onClick={(e) => {
            e.stopPropagation();
            setCorrect(e.target.value);
          }}
        ></input>

        <span className="rdw-mc-modal-btn-section">
          <button
            className="rdw-mc-modal-btn"
            onClick={() => {
              console.log(
                "Print MC Data:",
                question,
                answer1,
                answer2,
                answer3,
                answer4,
                correct
              );
              props.insertMC(
                question,
                "A) " + answer1,
                "B) " + answer2,
                "C) " + answer3,
                "D) " + answer4,
                correct
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
    <div className="rdw-mc-wrapper">
      <div
        className="rdw-option-wrapper"
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        Multiple Choice Question
        {expanded && renderModal()}
      </div>
    </div>
  );
}

export default MultipleChoiceOption;
