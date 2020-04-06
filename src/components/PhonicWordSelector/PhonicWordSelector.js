import React, { useState } from "react";
import { Button } from "reactstrap";
import "../WordSelector/WordSelector.scss";
function PhonicWordSelector(props) {
    // const [data, setData] = useState(JSON.parse(props.data));
    function handleClose() {
    props.setSelectMode(false);
    }
  
    function handleSelect() {
    //   props.selectWords(checkedWords);
    //   props.setSelectMode(false);
    //   props.selectGroup(props.name);
    }
  
    function wordDisplay(word) {
      return (
        <div className="Words">
        {word}
      </div>
      );
    }
    return (
      <div className="WordSelector">
        <div className="GroupTitle">{props.name}</div>
        <hr className="GroupTitleUnderline"></hr>
        <div className="WordDisplay">{props.data.map(word => (
            word.words.map(wordDisplay
            )
        ))}</div>
        <div>
          <Button onClick={() => handleClose()} className="CloseSelection">
            Close
          </Button>
          <Button
            onClick={() => handleSelect()}
            className="NextButton"
          >
            Select
          </Button>
        </div>
      </div>
    );
  }
  
  export default PhonicWordSelector;