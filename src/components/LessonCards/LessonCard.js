import React from "react";
import "./LessonCard.scss";

function LessonCard(props) {
  function toDateTime() {
    let dateComponents = props.lessonDate.toDateString().split(" ");
    return dateComponents;
  }

  return (
    <div className="LessonCard">
      <div className="LessonCardHeading">
        <div className="LessonCardMonth">{toDateTime()[1]}</div>
        <div className="LessonCardDay">{toDateTime()[2]}</div>
        <div
          className="DeleteLessonCard"
          onClick={() => props.deleteLessons(props.lessonNumber)}
        ></div>
      </div>
      <div className="LessonCardStudents">
        {props.lessonStudents.map((student, index) => (
          <div key={index}>{student}</div>
        ))}
      </div>
    </div>
  );
}

export default LessonCard;
