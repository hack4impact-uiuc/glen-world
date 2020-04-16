import React, { useState } from "react";
import { Button } from "reactstrap";
import "../WordSelector/WordSelector.scss";
import "../PhonicIcon/PhonicIcon.scss";
function PhonicWordSelector(props) {
  const [selected, setSelected] = useState(false);
  function handleSelect() {
    //if previously selected, unselect it
    if (selected) {
      props.handleSelectPhonics(false, props.name, props.index);
    } else {
      props.handleSelectPhonics(true, props.name, props.index);
    }
    setSelected(!selected);
  }

  function wordDisplay(word) {
    return <div className="Words">{word}</div>;
  }
  return (
    <div className="PhonicIcon">
      <div className="PhonicIconBorder">
        <div className="PhonicGroupTitle">{props.name}</div>
        <div>{props.data.map(word => word.words.map(wordDisplay))}</div>
        <div>
          {!selected && (
            <Button onClick={() => handleSelect()} className="SelectButton">
              SELECT
            </Button>
          )}
          {selected && (
            <Button onClick={() => handleSelect()} className="SelectButton">
              UNDO
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PhonicWordSelector;
