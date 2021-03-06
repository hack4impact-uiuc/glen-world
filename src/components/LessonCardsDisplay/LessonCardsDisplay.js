import React from "react";
import "./LessonCardsDisplay.scss";
import LessonCard from "../LessonCards/LessonCard";

function LessonCardsDisplay(props) {
  return (
    <div className="lesson-cards-display">
      <div onClick={props.addCard}>
        <div className="default-card">
          <img
            className="plus-icon"
            src="images/icons/plus-icon.svg"
            alt="Close"
          />
        </div>
      </div>
      {Object.keys(props.cards).length > 0 &&
        Object.keys(props.cards)
          .reverse()
          .map(date => {
            const dateTemp = date;
            return (
              <div className="card-margins">
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
