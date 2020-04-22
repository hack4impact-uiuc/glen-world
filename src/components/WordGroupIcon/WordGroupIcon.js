import React from "react";
import "./WordGroupIcon.scss";

function WordGroupIcon(props) {
  return (
    <div className={props.colored ? "PurpleWordGroupIcon" : "WordGroupIcon"}>
      <img src={props.image} />
      <div className="WordGroupName">{props.name}</div>
    </div>
  );
}

export default WordGroupIcon;
