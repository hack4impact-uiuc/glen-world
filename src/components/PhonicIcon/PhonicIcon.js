import React from "react";
import "./PhonicIcon.scss";

function PhonicIcon(props) {
  return (
    <div className={props.colored ? "purple-phonic-icon" : "phonic-icon"}>
      <p className="phonic-name">{props.name}</p>
    </div>
  );
}

export default PhonicIcon;
