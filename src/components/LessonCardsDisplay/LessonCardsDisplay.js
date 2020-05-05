import React from "react";
import "./LessonCardsDisplay.scss";
import { Col, Row, Container } from "reactstrap";
import LessonCard from "../LessonCards/LessonCard";

function LessonCardsDisplay(props) {
  return (
    <div className="LessonCardsDisplay">
      <Row>
      <Col>
      <div onClick={props.addCard}>
        <div className="DefaultCard">
          Click to assign students to a selected date!
        </div>
      </div>
      </Col>
      {Object.keys(props.cards).length > 0 &&
        Object.keys(props.cards)
          .reverse()
          .map(date => {
            const dateTemp = date;
            return (
              <Col>
              <LessonCard
                lessonDate={dateTemp}
                lessonStudents={props.cards[date][1]}
                deleteCard={props.removeCard}
              />
              </Col>
            );
          })}
      </Row>
    </div>
  );
}

export default LessonCardsDisplay;
