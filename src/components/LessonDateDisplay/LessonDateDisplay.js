import React, { useState, useEffect } from "react";
import "./LessonDateDisplay.css";

function LessonDateDisplay(props) {
  return (
    <div className="DateIcon">
      <p className="Date">{props.number}</p>
    </div>
  );
}

export default LessonDateDisplay;
