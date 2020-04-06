import React, { useState } from "react";
import { Button } from "reactstrap";
import "../WordSelector/WordSelector.scss";
import "../PhonicIcon/PhonicIcon.scss";
function PhonicWordSelector(props) {
    function handleSelect() {
    //   props.selectWords(checkedWords);
        props.setSelectMode(false, props.index);
        //word group is phonics and words are the phonic sounds. 
        props.selectGroup("phonics");
    }
  
    function wordDisplay(word) {
      return (
        <div className="Words">
        {word}
      </div>
      );
    }
    return (
      <div className="PhonicIcon">
        <div className="GroupTitle">{props.name}</div>
        <hr className="GroupTitleUnderline"></hr>
        <div>{props.data.map(word => (
            word.words.map(wordDisplay
            )
        ))}</div>
        <div>
          <Button
            onClick={() => handleSelect()}
            className="SelectButton">
            Select
          </Button>
        </div>
      </div>
    );
  }
  
  export default PhonicWordSelector;