import React, { useState, useEffect } from "react";
import "./ConfirmationCard.scss";

function ConfirmationCard(props) {
  const [title, setTitle] = useState();

  useEffect(() => {
    if (!props.confirmation) {
      let dateComponents = props.title.split(" ");
      let dateString = dateComponents[1] + "  " + dateComponents[2];
      setTitle(dateString);
    } else setTitle(props.title);
  });

  return (
    <div className="ConfirmationCard">
      <div className="ConfirmationCardHeading">
        <div className="ConfirmationCardDate">{title}</div>
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
