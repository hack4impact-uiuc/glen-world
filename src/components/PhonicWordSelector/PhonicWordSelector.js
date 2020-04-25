import React, { useState } from "react";
import { Button } from "reactstrap";
import "../WordSelector/WordSelector.scss";
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
        <div>
          {props.data.words.map(word => (
            <div className="Words">{word}</div>
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
