import React from "react";
import "./LessonNameDisplay.scss";

function LessonNameDisplay(props) {
  return (
    <div className="name-icon">
        <p className="name-lesson-display">{props.lessonName}</p>
    </div>
  );
}
export default LessonNameDisplay;
