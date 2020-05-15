import React from "react";
import { Button } from "reactstrap";
import "../PhonicWordSelector/PhonicWordSelector.scss";
import "../PhonicIcon/PhonicIcon.scss";
function PhonicWordSelector(props) {
  function handleSelect() {
    //if previously selected, unselect it
    props.handleSelectPhonics(!props.selected, props.name, props.index);
  }
  return (
    <div className="phonic-icon">
      <div className="phonic-group-title">{props.name}</div>
      <div className="phonics-words-list">
        {props.data.words.map(word => (
          <div className="phonics-words">{word}</div>
        ))}
      </div>
      <Button onClick={handleSelect} className="select-button">
        {props.selected ? "UNDO" : "SELECT"}
      </Button>
    </div>
  );
}

export default PhonicWordSelector;
