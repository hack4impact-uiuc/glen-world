import React from "react";
import "./LessonCardsDisplay.scss";
import LessonCard from "./LessonCard";
import DefaultCard from "./DefaultCard";

function LessonCardsDisplay(props) {
  function deleteLessonCard(lessonNumber) {
    const tempCards = [...props.cards];
    tempCards.splice(lessonNumber, 1);
    props.setCards(tempCards);
  }

  function addLessonCard() {
    props.addCard();
  }

  return (
    <div className="LessonCardsDisplay">
      <div onClick={addLessonCard}>
        <DefaultCard />
      </div>
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
