import React from "react";
import "./LessonNameDisplay.scss";

function LessonNameDisplay(props) {
  return (
    <div className="DateIcon">
      <br />
      <p className="Name">{props.lessonName}</p>
    </div>
  );
}
export default LessonNameDisplay;
