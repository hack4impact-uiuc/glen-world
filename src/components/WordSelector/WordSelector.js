import React, { useState, useEffect } from "react";
import { Button, Row, Col } from "reactstrap";
import { useRef } from "react";
import useOutsideClick from "./useOutsideClick";
import "./WordSelector.scss";

const MIN_WORD_COUNT = 4;

function WordSelector(props) {
  const [wordCount, updateWordCount] = useState(0);
  const [checkedWords, setCheckedWords] = useState([]);
  const [wordGroup, updateWordGroup] = useState();
  const [chooseAll, setChooseAll] = useState(false);
  const [disableSelect, setDisableSelect] = useState(false);
  const ref = useRef();

  useOutsideClick(ref, () => {
    props.setWordSelectorToggle(false);
  });

  useEffect(() => {
    if (props.assignedWords) {
      setCheckedWords(props.assignedWords);
      updateWordCount(props.assignedWords.length);
      updateWordGroup(props.assignedWordGroup);
      setDisableSelect(props.assignedWordGroup !== props.name);
    }
  }, [props.assignedWords, props.assignedWordGroup, props.name]);

  function disableNext() {
    return wordCount < MIN_WORD_COUNT || disableSelect;
  }

  function handleCheck(word) {
    if (props.name !== wordGroup) {
      setCheckedWords([word]);
      updateWordCount(1);
      updateWordGroup(props.name);
      setDisableSelect(false);
    } else {
      if (checkedWords.includes(word)) {
        const index = checkedWords.indexOf(word);
        checkedWords.splice(index, 1);
        updateWordCount(wordCount - 1);
      } else {
        setCheckedWords([...checkedWords, word]);
        updateWordCount(wordCount + 1);
      }
    }
  }

  function handleSelect() {
    props.selectWords(checkedWords);
    props.setWordSelectorToggle(false);
    props.selectWordGroup(props.name);
  }

  function handleChooseAll() {
    if (props.name !== wordGroup) {
      updateWordGroup(props.name);
      setDisableSelect(false);
    }
    if (!chooseAll) {
      setCheckedWords([...props.group]);
      updateWordCount(props.group.length);
    } else {
      setCheckedWords([]);
      updateWordCount(0);
    }
    setChooseAll(!chooseAll);
  }

  function wordSelection(word, index) {
    return (
      <div className="word-checkbox" key={index}>
        <label className="container">
          <input
            className="check"
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
              <label className="container">
                <input
                  className="check"
                  checked={
                    checkedWords.length === props.group.length && !disableSelect
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
        <hr className="group-title-underline"></hr>
        <div className="select-word-display">
          {props.group.map((word, index) => wordSelection(word, index))}
        </div>
        <div className="next-button-padding">
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
