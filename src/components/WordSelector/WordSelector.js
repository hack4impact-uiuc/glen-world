import React, { useState, useEffect } from "react";
import { Button, Row, Col } from "reactstrap";
import "./WordSelector.scss";

function WordSelector(props) {
  const [wordCount, updateWordCount] = useState(0);
  const [minWords] = useState(4);
  const [checkedWords, updateWords] = useState([]);
  const [wordGroup, updateWordGroup] = useState();
  const [chooseAll, setChooseAll] = useState(false);
  const [cantSelect, setCantSelect] = useState(false);

  useEffect(() => {
    if (props.assignedWords) {
      updateWords(props.assignedWords);
      updateWordCount(props.assignedWords.length);
      updateWordGroup(props.assignedWordGroup);
      if (props.assignedWordGroup != props.name) {
        setCantSelect(true);
      }
    }
  }, []);
  function disableNext() {
    return wordCount < minWords || cantSelect;
  }

  function handleCheck(word) {
    if (props.name !== wordGroup) {
      updateWords([word]);
      updateWordCount(1);
      updateWordGroup(props.name);
      setCantSelect(false);
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

  function handleSelect() {
    props.selectWords(checkedWords);
    props.setSelectMode(false);
    props.selectGroup(props.name);
    props.changeColor(props.index);
  }

  function handleChooseAll() {
    if (props.name !== wordGroup) {
      updateWordGroup(props.name);
      setCantSelect(false);
    }
    if (!chooseAll) {
      updateWords([...props.group]);
      updateWordCount(props.group.length);
    } else {
      updateWords([]);
      updateWordCount(0);
    }
    setChooseAll(!chooseAll);
  }
  function wordSelection(word, index) {
    return (
      <Col sm="4">
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
      </Col>
    );
  }

  return (
    <div className="WordSelector">
      <Row>
        <Col sm="8">
          <div className="GroupTitle">{props.name}</div>
        </Col>
        <Col sm="4">
          <div className="SelectCheckbox">
            <label class="container">
              <input
                class="check"
                checked={
                  checkedWords.length == props.group.length && !cantSelect
                    ? true
                    : null
                }
                type="checkbox"
                name="Select All"
                onChange={() => handleChooseAll()}
              />
              <div className="word">Choose All</div>
            </label>
          </div>
        </Col>
      </Row>
      <hr className="GroupTitleUnderline"></hr>
      <div className="WordDisplay">
        {props.group.map((word, index) => wordSelection(word, index))}
      </div>
      <div className="Padding">
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
