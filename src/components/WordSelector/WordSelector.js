import React, { useState, useEffect } from "react";
import { Button , Row, Col} from "reactstrap";
import "./WordSelector.scss";

function WordSelector(props) {
  const [wordCount, updateWordCount] = useState(0);
  const [minWords] = useState(4);
  const [checkedWords, updateWords] = useState([]);
  const [wordGroup, updateWordGroup] = useState();
  const [chooseAll, setChooseAll] = useState(false);

  useEffect(() => {
    if (props.assignedWords) {
      updateWords(props.assignedWords);
      updateWordCount(props.assignedWords.length);
      updateWordGroup(props.assignedWordGroup);
    }
  }, []);

  function disableNext() {
    return wordCount < minWords;
  }

  function handleCheck(word) {
    // reset words if word group changed
    if (props.name !== wordGroup) {
      updateWords([word]);
      updateWordCount(1);
      updateWordGroup(props.name);
    } else {
      if (checkedWords.includes(word)) {
        const index = checkedWords.indexOf(word);
        checkedWords.splice(index, 1);
        updateWordCount(wordCount - 1);
      } else {
        updateWords([...checkedWords, word]);
        updateWordCount(wordCount + 1);
      }
    }
  }

  function handleClose() {
    props.setSelectMode(false);
  }

  function handleSelect() {
    props.selectWords(checkedWords);
    props.setSelectMode(false);
    props.selectGroup(props.name);
    props.changeColor(props.index);

  }

  function handleChooseAll() {
    if (!chooseAll) {
      updateWords(props.group)
    } else {
      updateWords([])
    }
    setChooseAll(!chooseAll)
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
      <Row>
      <Col>
      <div className="GroupTitle">{props.name}</div>
      </Col>
      <Col>
      <input
            class="check"
            checked={checkedWords.length == props.group.length ? true : null}
            type="checkbox"
            name= "Select All"
            onChange={() => handleChooseAll()}
          />
        </Col>
      </Row>
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
