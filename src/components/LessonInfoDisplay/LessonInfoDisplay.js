import React, { useState, useEffect } from "react";
import "./LessonInfoDisplay.css";

function LessonInfoDisplay(props) {
  function handleClose() {
    props.setDisplay(false);
  }

  return (
    <div className="LessonInfo">
      <div className="ColumnsGrid">
        <div className="LessonData">
          <div className="LessonDataTitle">Student Id:</div>
          {props.students.map(studentId => (
            <div>{studentId}</div>
          ))}
        </div>
        <div className="LessonData">
          <div className="LessonDataTitle">Word Group:</div>
          <div>{props.wordGroup}</div>
          <div className="LessonDataTitle">Words:</div>
          {props.words.map(word => (
            <div>{word}</div>
          ))}
        </div>
      </div>
      <div>
        <button onClick={() => handleClose()} className="CloseButton">
          Close
        </button>
      </div>
    </div>
  );
}

export default LessonInfoDisplay;
