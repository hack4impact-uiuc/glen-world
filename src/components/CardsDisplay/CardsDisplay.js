import React from "react";
import "./CardsDisplay.scss";
import ConfirmationCard from "../ConfirmationCard/ConfirmationCard";

function CardsDisplay(props) {
  return (
    <div className="cards-display">
      {Object.keys(props.cards).length > 0 &&
        Object.keys(props.cards)
          .reverse()
          .map(date => {
            const dateTemp = date;
            return (
              <ConfirmationCard
                title={dateTemp}
                lessonStudents={props.cards[date][1]}
              />
            );
          })}
    </div>
  );
}

export default CardsDisplay;
