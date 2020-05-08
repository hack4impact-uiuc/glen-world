import React from "react";
import "./LessonNameDisplay.scss";

function LessonNameDisplay(props) {
  return (
    <div className="NameIcon">
      {/* <div className="InnerBorder"> */}
        <p className="Name">{props.lessonName}</p>
      {/* </div> */}
    </div>
  );
}
export default LessonNameDisplay;
