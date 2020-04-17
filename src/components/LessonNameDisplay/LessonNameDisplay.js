import React from "react";
import "./LessonNameDisplay.scss";

function LessonNameDisplay(props) {
  return (
    <div className="NameIcon">
      <label className = "InnerBorder">
      <br />
      <p className="Name">{props.lessonName}</p>
      </label>
    </div>
  );
}
export default LessonNameDisplay;
