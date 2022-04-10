import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { EditorState, Modifier } from "draft-js";

function MultipleChoiceOption(props) {
  const [expanded, setExpanded] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  const [answer4, setAnswer4] = useState("");

  //function to reset states once the question has been added to editor
  const resetValues = () => {
    setQuestion("");
    setAnswer1("");
    setAnswer2("");
    setAnswer3("");
    setAnswer4("");
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
        <span className="rdw-mc-modal-btn-section">
          <button
            className="rdw-mc-modal-btn"
            onClick={() => {
              props.insertMC(question, answer1, answer2, answer3, answer4);
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
        onBlur={() => {
          setExpanded(false);
        }}
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
