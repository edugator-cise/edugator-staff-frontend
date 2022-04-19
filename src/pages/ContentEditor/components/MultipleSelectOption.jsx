import React, { useState } from "react";
import "./ExerciseStyles.css";

function MultipleSelectOption(props) {
  const [expanded, setExpanded] = useState(false);
  const [question, setQuestion] = useState("");
  const [correct1, setCorrect1] = useState("");
  const [correct2, setCorrect2] = useState("");
  const [correct3, setCorrect3] = useState("");
  const [correct4, setCorrect4] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  const [answer4, setAnswer4] = useState("");

  //function to reset states once the question has been added to editor
  const resetValues = () => {
    setQuestion("");
    setCorrect1(false);
    setCorrect2(false);
    setCorrect3(false);
    setCorrect4(false);
    setAnswer1("");
    setAnswer2("");
    setAnswer3("");
    setAnswer4("");
  };

  const renderModal = () => {
    return (
      <div className="rdw-exercise-modal">
        <label className="rdw-exercise-text-instruction">Check the checkboxes to mark the correct selection</label>
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
            type="checkBox"
            name="correct1"
            htmlFor="correct1"
            onClick={(e) => {
              e.stopPropagation();
              setCorrect1(!correct1);
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
            type="checkBox"
            name="correct2"
            htmlFor="correct2"
            onClick={(e) => {
              e.stopPropagation();
              setCorrect2(!correct2);
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
            type="checkBox"
            name="correct3"
            htmlFor="correct3"
            onClick={(e) => {
              e.stopPropagation();
              setCorrect3(!correct3);
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
            type="checkBox"
            name="correct4"
            htmlFor="correct4"
            onClick={(e) => {
              e.stopPropagation();
              setCorrect4(!correct4);
            }}
          ></input>
        </div>

        <span className="rdw-exercise-modal-btn-section">
          <button
            className="rdw-exercise-modal-btn"
            onClick={() => {
              let selections = [correct1, correct2, correct3, correct4];
              let correct = [];
              selections.forEach((choice, i) => {
                if (choice === true)
                  correct.push(i+1);
              });
              console.log(
                "Print MC Data:",
                question,
                correct,
                answer1,
                answer2,
                answer3,
                answer4,
              );
              props.insertMC(
                question,
                correct,
                "A) " + answer1,
                "B) " + answer2,
                "C) " + answer3,
                "D) " + answer4,
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
        Multiple Select Question
        {expanded && renderModal()}
      </div>
    </div>
  );
}

export default MultipleSelectOption;
