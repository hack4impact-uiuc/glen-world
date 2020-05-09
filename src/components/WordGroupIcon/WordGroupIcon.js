import React from "react";
import "./WordGroupIcon.scss";

function WordGroupIcon(props) {
  return (
    <div className={props.colored ? "purple-word-group-icon" : "word-group-icon"}>
      <img src={props.image} />
      <div className="word-icon-name">{props.name}</div>
    </div>
  );
}

export default WordGroupIcon;
