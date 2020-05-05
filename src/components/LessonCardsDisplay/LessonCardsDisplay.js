import React from "react";
import "./LessonCardsDisplay.scss";
import LessonCard from "../LessonCards/LessonCard";

function LessonCardsDisplay(props) {
  return (
    <div className="LessonCardsDisplay">
      <div onClick={props.addCard}>
        <div className="DefaultCard">
          Click to assign students to a selected start date!
        </div>
      </div>
      {Object.keys(props.cards).length > 0 &&
        Object.keys(props.cards)
          .reverse()
          .map(date => {
            const dateTemp = date;
            return (
              <LessonCard
                lessonDate={dateTemp}
                lessonStudents={props.cards[date][1]}
                deleteCard={props.removeCard}
              />
            );
          })}
    </div>
  );
}

export default LessonCardsDisplay;
