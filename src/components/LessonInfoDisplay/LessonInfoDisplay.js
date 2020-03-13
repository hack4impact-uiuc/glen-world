import React from "react";
import "./LessonInfoDisplay.css";

function LessonInfoDisplay(props) {
  function handleClose() {
    props.setDisplay(false);
  }

  return (
    <div className="LessonInfo">
      <div className="InfoDisplay">
        <div className="Column">
          <div className="WordGroupImage"></div>
          <div className="WordGroupName">{props.template}</div>
        </div>
        <div className="Column">
          <div className="LessonDataTitle">WORDS</div>
          <div className="LessonData">
            {props.words.map(word => (
              <div>{word}</div>
            ))}
          </div>
        </div>
        <div className="Column">
          <div className="LessonDataTitle">STUDENTS</div>
          <div className="LessonData">
            {props.studentNames.map(name => (
              <div>{name}</div>
            ))}
          </div>
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
