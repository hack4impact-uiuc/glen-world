import React from "react";
import "./LessonNameDisplay.scss";

function LessonNameDisplay(props) {

  return (
    <div className="DateIcon">
      <br style={{ fontSize: 20 }}></br>
      <p className="Name" style={{ margin: 0, padding: 0 }}>
        {props.lessonName}
      </p>
    </div>
  );
}

export default LessonNameDisplay;
