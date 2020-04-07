import React from "react";
import "./LessonCardsDisplay.scss";
import LessonCard from "./LessonCard";
import DefaultCard from "./DefaultCard";

function LessonCardsDisplay(props) {
  function deleteLessonCard(lessonNumber) {
    props.setCards(props.cards.splice(lessonNumber, lessonNumber));
  }

  return (
    <div className="LessonCardsDisplay">
      {props.cards.length == 0 && <DefaultCard />}
      {props.cards.length > 0 &&
        props.cards.map((card, index) => (
          <div key={index}>
            <LessonCard
              lessonDate={card[1]}
              lessonStudents={card[0]}
              deleteLessons={deleteLessonCard}
              lessonNumber={index}
            />
          </div>
        ))}
    </div>
  );
}

export default LessonCardsDisplay;
