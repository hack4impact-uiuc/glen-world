import React from "react";
import "./PhonicIcon.scss"

function PhonicIcon(props) {
  return (
    <div className = "PhonicIcon">
      <p className = "PhonicName">{props.name}</p>
    </div>
  );
}

export default PhonicIcon;