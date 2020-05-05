import React, { useState, useEffect } from "react";
import "./LessonCard.scss";

function LessonCard(props) {
  const [cardDate, setCardDate] = useState();

  useEffect(() => {
    let dateComponents = props.lessonDate.split(" ");
    let dateString = dateComponents[1] + "  " + dateComponents[2];
    setCardDate(dateString);
  });

  return (
    <div className="LessonCard">
      <div className="LessonCardHeading">
        <div className="LessonCardDate">{cardDate}</div>
        {props.deleteCard && (
          <div
            onClick={() => props.deleteCard(props.lessonDate)}
            className="DeleteLessonCard"
          >
            <img src="images/icons/remove-card.svg" alt="Close" />
          </div>
        )}
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
