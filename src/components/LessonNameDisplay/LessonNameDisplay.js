import React from "react";
import "./LessonNameDisplay.scss";

function LessonNameDisplay(props) {
  return (
    <div className="NameIcon">
        <p className="Name">{props.lessonName}</p>
    </div>
  );
}
export default LessonNameDisplay;
