import React from "react";
import "./LessonDateDisplay.scss";

function LessonDateDisplay(props) {
  function toDateTime() {
    let dateComponents = props.date
      .toDate()
      .toDateString()
      .split(" ");
    return dateComponents;
  }

  return (
    <div className="DateIcon">
      <br style={{ fontSize: 20 }}></br>
      <p className="Day" style={{ margin: 0, padding: 0 }}>
        {toDateTime()[2]}
      </p>
      <p className="Month" style={{ margin: 0, padding: 0, fontSize: 30 }}>
        {toDateTime()[1]}
      </p>
    </div>
  );
}

export default LessonDateDisplay;
