import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import "./WordSelector.scss";

function WordSelector(props) {
  const [wordCount, updateWordCount] = useState(0);
  const [minWords] = useState(4);
  const [checkedWords, updateWords] = useState([]);

  useEffect(() => {
    if (props.assignedWords) {
      updateWords(props.assignedWords);
      updateWordCount(props.assignedWords.length);
    }
  }, []);

  function disableNext() {
    return wordCount < minWords;
  }

  function removePastWords() {
    // Sanitize checkedWords of any old words from another group
    if (props.assignedWords) {
      let filteredWords = checkedWords.filter(
        word => !props.assignedWords.includes(word)
      );
      updateWords(filteredWords);
    }
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
  }

  function handleSelect() {
    removePastWords();
    console.log(checkedWords);
    props.selectWords(checkedWords);
    props.setSelectMode(false);
    props.selectGroup(props.name);
  }

  function wordSelection(word, index) {
    return (
      <div className="Words" key={index}>
        <label class="container">
          <input
            class="check"
            checked={checkedWords.includes(word) ? true : null}
            type="checkbox"
            name={word}
            onChange={() => handleCheck(word)}
          />
          <div className="word">{word}</div>
        </label>
      </div>
    );
  }

  return (
    <div className="WordSelector">
      <div className="GroupTitle">{props.name}</div>
      <hr className="GroupTitleUnderline"></hr>
      <div className="WordDisplay">{props.group.map(wordSelection)}</div>
      <div>
        <Button onClick={() => handleClose()} className="CloseSelection">
          Close
        </Button>
        <Button
          disabled={disableNext()}
          onClick={() => handleSelect()}
          className="NextButton"
        >
          Select
        </Button>
      </div>
    </div>
  );
}

export default WordSelector;
