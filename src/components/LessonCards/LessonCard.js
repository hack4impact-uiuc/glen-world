import React, { useState } from "react";
import "./LessonCard.scss";

function LessonCard(props) {
  function getCardDate() {
    var dateComponents = props.lessonDate.split(" ");
    var dateString = dateComponents[1] + "  " + dateComponents[2];
    return dateString;
  }

  return (
    <div className="LessonCard">
      <div className="LessonCardHeading">
        <div className="LessonCardDate">{getCardDate()}</div>
        <div
          onClick={() => props.deleteCard(props.lessonDate)}
          className="DeleteLessonCard"
        >
          <img src="images/icons/remove-card.svg" alt="Close" />
        </div>
      </div>
      <div className="LessonCardContent">
        {props.lessonStudents.map((student, index) => (
          <div key={index} className="LessonCardStudent">
            {student}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LessonCard;
