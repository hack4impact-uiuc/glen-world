import React from "react";
import "./PhonicIcon.scss"

function PhonicIcon(props) {
  return (
    <div className= {props.colored
      ? "PurplePhonicIcon"
      : "PhonicIcon"}>
        <div className="PhonicIconBorder">
        <p className = "PhonicName">{props.name}</p>
      </div>
    </div>
  );
}

export default PhonicIcon;