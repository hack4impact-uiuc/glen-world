import React, { useState } from "react";
import { Button } from "reactstrap";
import "../WordSelector/WordSelector.scss";
import "../PhonicIcon/PhonicIcon.scss";
function PhonicWordSelector(props) {
    const [selected, setSelected] = useState(false)
    function handleSelect() {
        //if previously selected, unselect it
        if (selected) {
            props.handleSelectPhonics(false, props.name)
        } else {
            props.handleSelectPhonics(true, props.name)
        }
        setSelected(!selected)
    }
  
    function wordDisplay(word) {
      return (
        <div className="Words">
        {word}
      </div>
      );
    }
    return (
      <div className= {selected
      ? "PurplePhonicIcon"
      : "PhonicIcon"}>
        <div className="GroupTitle">{props.name}</div>
        <hr className="GroupTitleUnderline"></hr>
        <div>{props.data.map(word => (
            word.words.map(wordDisplay
            )
        ))}</div>
        <div>
        {!selected && 
          <Button
            onClick={() => handleSelect()}
            className="SelectButton">
                SELECT
          </Button>}
        {selected && 
        <Button
        onClick={() => handleSelect()}
        className="SelectButton">
            UNDO
        </Button>}
        </div>
      </div>
    );
  }
  
  export default PhonicWordSelector;