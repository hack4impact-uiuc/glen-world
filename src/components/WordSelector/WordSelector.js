import React, { useState } from "react";
import "./WordSelector.scss";

function WordSelector(props) {
  const [wordCount, updateWordCount] = useState(0);
  const [minWords] = useState(4);
  const [checkedWords, updateWords] = useState([]);

  function disableNext() {
    return wordCount < minWords;
  }

  function handleCheck(word) {
    if (checkedWords.includes(word)) {
      const index = checkedWords.indexOf(word);
      checkedWords.splice(index, 1);
      updateWordCount(wordCount - 1);
    } else {
      updateWords([...checkedWords, word]);
      updateWordCount(wordCount + 1);
    }
  }

  function handleClose() {
    props.setSelectMode(false);
    updateWords([]);
  }

  function handleSelect() {
    props.selectWords(checkedWords);
    props.setSelectMode(false);
    props.selectGroup(props.name);
  }

  function listWords(word) {
    return (
      <div className="Words">
        <label>
          <input
            type="checkbox"
            name={word}
            onChange={() => handleCheck(word)}
          />
          {word}
        </label>
      </div>
    );
  }

  return (
    <div className="WordSelector">
      <div className="GroupTitle">{props.name}</div>
      <hr className="GroupTitleUnderline"></hr>
      <div className="WordDisplay">{props.group.map(listWords)}</div>
      <div>
        <button onClick={() => handleClose()} className="CloseButton">
          Close
        </button>
        <button
          disabled={disableNext()}
          onClick={() => handleSelect()}
          className="NextButton"
        >
          Select
        </button>
      </div>
    </div>
  );
}

export default WordSelector;
