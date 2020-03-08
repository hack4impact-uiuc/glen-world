import React, { useState, useEffect } from "react";
import "./LessonDateDisplay.css";

function LessonDateDisplay(props) {
  function toDateTime() {
    let dateComponents = props.date
      .toDate()
      .toDateString()
      .split(" ");
    let dateString = dateComponents[1].concat(" ", dateComponents[2]);
    return dateString;
  }

  return (
    <div className="DateIcon">
      <p className="Date">{toDateTime()}</p>
    </div>
  );
}

export default LessonDateDisplay;
