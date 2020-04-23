import React, { useState, useEffect } from "react";
import "./ConfirmationCard.scss";

function ConfirmationCard(props) {
  const [cardDate, setCardDate] = useState();

  useEffect(() => {
    if (!props.confirmation) {
      let dateComponents = props.lessonDate.split(" ");
      let dateString = dateComponents[1] + "  " + dateComponents[2];
      setCardDate(dateString);
    } else setCardDate(props.lessonDate);
  });

  return (
    <div className="ConfirmationCard">
      <div className="ConfirmationCardHeading">
        <div className="ConfirmationCardDate">{cardDate}</div>
      </div>
      <div className="ConfirmationCardContent">
        {props.lessonStudents.map((student, index) => (
          <div key={index} className="ConfirmationCardStudent">
            {student}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ConfirmationCard;
