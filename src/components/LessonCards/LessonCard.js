import React, { useState, useEffect } from "react";
import {Row} from "reactstrap";
import "./LessonCard.scss";

function LessonCard(props) {
  const [cardDate, setCardDate] = useState();

  useEffect(() => {
    let dateComponents = props.lessonDate.split(" ");
    let dateString = dateComponents[1] + "  " + dateComponents[2];
    setCardDate(dateString);
  });
  return (
    <div className="student-date-card">
      <div className="purple-box">
        <Row className = "date-delete-header">
        <div className="date">{cardDate}       
        </div>
        <div
          onClick={() => props.deleteCard(props.lessonDate)}
          className="delete-lesson-card"
        >
          <img src="images/icons/remove-card.svg" alt="Close" />
        </div>
        </Row>
      </div>
      <div className="student-container">
        {props.lessonStudents.map((student, index) => (
          <div key={index} className="name">
            {student}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LessonCard;
