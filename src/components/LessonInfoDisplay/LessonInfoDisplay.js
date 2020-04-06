import React, { useState } from "react";
import { compose } from "recompose";
import { withRouter, Redirect } from "react-router-dom";
import "./LessonInfoDisplay.scss";

function LessonInfoDisplay(props) {
  const [editLessonRedirect, setEditLessonRedirect] = useState(false);

  function handleClose() {
    props.setDisplay(false);
  }

  if (editLessonRedirect) {
    return (
      <Redirect
        to={{
          pathname: "/createlesson",
          state: { existingAssignment: props.lesson }
        }}
      />
    );
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
            {props.words.map((word, index) => (
              <div key={index}>{word}</div>
            ))}
          </div>
        </div>
        <div className="Column">
          <div className="LessonDataTitle">STUDENTS</div>
          <div className="LessonData">
            {props.studentNames.map((name, index) => (
              <div key={index}>{name}</div>
            ))}
          </div>
        </div>
      </div>
      <div className="ButtonContainer">
        <button onClick={handleClose} className="LessonButton">
          Close
        </button>
        <button
          onClick={() => setEditLessonRedirect(true)}
          className="LessonButton"
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default compose(withRouter)(LessonInfoDisplay);
