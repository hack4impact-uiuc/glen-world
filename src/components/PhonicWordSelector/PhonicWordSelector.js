import React, { useState } from "react";
import { Button } from "reactstrap";
import "../PhonicWordSelector/PhonicWordSelector.scss"
import "../PhonicIcon/PhonicIcon.scss";
function PhonicWordSelector(props) {
  function handleSelect() {
    //if previously selected, unselect it
    props.handleSelectPhonics(!props.selected, props.name, props.index);
  }
  return (
    <div className="PhonicIcon">
      <div className="PhonicIconBorder">
        <div className="PhonicGroupTitle">{props.name}</div>
        <div className = "words-list">
          {props.data.words.map(word => (
            <div className="phonics-words">{word}</div>
          ))}
        </div>
        <div>
          <Button onClick={handleSelect} className="SelectButton">
            {props.selected ? "UNDO" : "SELECT"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PhonicWordSelector;
