import React, { useState } from "react";
import { Button } from "reactstrap";
import "../WordSelector/WordSelector.scss";
import "../PhonicIcon/PhonicIcon.scss";
function PhonicWordSelector(props) {
  const [selected, setSelected] = useState(false);
  function handleSelect() {
    //if previously selected, unselect it
    props.handleSelectPhonics(!selected, props.name, props.index);
    setSelected(!selected);
  }
  return (
    <div className="PhonicIcon">
      <div className="PhonicIconBorder">
        <div className="PhonicGroupTitle">{props.name}</div>
        <div>
          {props.data.map(word =>
            word.words.map(word => <div className="words">{word}</div>)
          )}
        </div>
        <div>
          <Button onClick={handleSelect} className="SelectButton">
            {selected ? "UNDO" : "SELECT"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PhonicWordSelector;
