import React from "react";
import "./WordGroupIcon.css";

function WordGroupIcon(props) {
  return (
    <div className="WordGroupIcon">
      <p className="WordGroupNumber">{props.number}</p>
      <p className="WordGroupName">{props.name}</p>
    </div>
  );
}

export default WordGroupIcon;