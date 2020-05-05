import React from "react";
import "./LessonCardsDisplay.scss";
import { Col, Row, Container } from "reactstrap";
import LessonCard from "../LessonCards/LessonCard";

function LessonCardsDisplay(props) {
  return (
    <div className="lesson-cards-display">
      {/* <Col> */}
      <div onClick={props.addCard}>
        <div className="default-card">
          {/* Click to assign students to a selected date! */}
          <img className = "plus-icon" src="images/icons/plus-icon.svg" alt="Close" />
        </div>
      </div>
      {/* </Col > */}
      {Object.keys(props.cards).length > 0 &&
        Object.keys(props.cards)
          .reverse()
          .map(date => {
            const dateTemp = date;
            return (
              <div className = "card-margins"> 
              <LessonCard
                lessonDate={dateTemp}
                lessonStudents={props.cards[date][1]}
                deleteCard={props.removeCard}
              />
              </div>
            );
          })}
    </div>
  );
}

export default LessonCardsDisplay;
