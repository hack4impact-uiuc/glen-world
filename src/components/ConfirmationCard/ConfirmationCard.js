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
  }, [props.confirmation, props.title]);

  return (
    <div className="confirmation-card">
      <div className="confirmation-card-heading">
        <div className="confirmation-card-date">{title}</div>
      </div>
      <div className="confirmation-card-content">
        {props.lessonStudents.map((student, index) => (
          <div key={index} className="confirmation-card-student">
            {student}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ConfirmationCard;
