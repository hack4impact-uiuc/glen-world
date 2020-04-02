import React from "react";
import "./WordGroupIcon.scss";

function WordGroupIcon(props) {
  return (
    <div className="WordGroupIcon">
      <img src={props.image} />
      <p className="WordGroupName">{props.name}</p>
    </div>
  );
}

export default WordGroupIcon;
