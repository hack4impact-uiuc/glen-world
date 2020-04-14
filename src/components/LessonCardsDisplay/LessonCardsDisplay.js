import React from "react";
import "./LessonCardsDisplay.scss";
import LessonCard from "../LessonCards/LessonCard";

function LessonCardsDisplay(props) {
  function addLessonCard() {
    props.addCard();
  }

  function removeLessonCard(cardDate) {
    props.removeCard(cardDate);
  }

  return (
    <div className="LessonCardsDisplay">
      <div onClick={addLessonCard}>
        <div className="DefaultCard">
          Click to assign students to a selected date!
        </div>
      </div>
      {Object.keys(props.cards).length > 0 &&
        Object.keys(props.cards)
          .reverse()
          .map((date, index) => (
            <div key={index}>
              <LessonCard
                lessonDate={date}
                lessonStudents={props.cards[date][1]}
                deleteCard={removeLessonCard}
              />
            </div>
          ))}
    </div>
  );
}

export default LessonCardsDisplay;
