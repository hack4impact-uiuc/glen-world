import React, { useState, useEffect } from "react";
import { Button, Row, Col } from "reactstrap";
import { useRef } from "react";
import useOutsideClick from "./useOutsideClick";
import "./WordSelector.scss";

function WordSelector(props) {
  const [wordCount, updateWordCount] = useState(0);
  const [minWords] = useState(4);
  const [checkedWords, updateWords] = useState([]);
  const [wordGroup, updateWordGroup] = useState();
  const [chooseAll, setChooseAll] = useState(false);
  const [disableSelect, setDisableSelect] = useState(false);
  const ref = useRef();

  useOutsideClick(ref, () => {
    props.setSelectMode(false);
  });

  useEffect(() => {
    if (props.assignedWords) {
      updateWords(props.assignedWords);
      updateWordCount(props.assignedWords.length);
      updateWordGroup(props.assignedWordGroup);
      setDisableSelect(props.assignedWordGroup != props.name);
    }
  }, []);
  function disableNext() {
    return wordCount < minWords || disableSelect;
  }

  function handleCheck(word) {
    if (props.name !== wordGroup) {
      updateWords([word]);
      updateWordCount(1);
      updateWordGroup(props.name);
      setDisableSelect(false);
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
      setDisableSelect(false);
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
        <div className="word-checkbox" key={index}>
          <label class="container">
            <input
              class="check"
              checked={checkedWords.includes(word)}
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
    <div className="word-selector">
      <div ref={ref}>
        <Row>
          <Col sm="8">
            <div className="group-title">{props.name}</div>
          </Col>
          <Col sm="3">
            <div className="select-checkbox">
              <label class="container">
                <input
                  class="check"
                  checked={
                    checkedWords.length == props.group.length && !disableSelect
                  }
                  type="checkbox"
                  name="Select All"
                  onChange={handleChooseAll}
                />
                <div className="word">Select All</div>
              </label>
            </div>
          </Col>
        </Row>
        <hr className="group-title-under-line"></hr>
        <div className="select-word-display">
          {props.group.map((word, index) => wordSelection(word, index))}
        </div>
        <div className="padding">
          <Button
            disabled={disableNext()}
            onClick={handleSelect}
            className="next-button"
          >
            Select
          </Button>
        </div>
      </div>
    </div>
  );
}

export default WordSelector;
