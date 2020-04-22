import React from "react";
import "./CardsDisplay.scss";
import LessonCard from "../LessonCards/LessonCard";

function CardsDisplay(props) {
  return (
    <div className="CardsDisplay">
      {Object.keys(props.cards).length > 0 &&
        Object.keys(props.cards)
          .reverse()
          .map(date => {
            const dateTemp = date;
            return (
              <LessonCard
                lessonDate={dateTemp}
                lessonStudents={props.cards[date][1]}
              />
            );
          })}
    </div>
  );
}

export default CardsDisplay;
