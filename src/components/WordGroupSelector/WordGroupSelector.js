import React, { useState, useEffect, useCallback } from "react";
import { collectedWordGroupsService } from "util/GWUtil/resource";
import "./WordGroupSelector.scss";
import { TEMPLATE_WORD_GROUPS } from "../../utils/constants";
import { Button, Row, Col } from "react-bootstrap";
import WordGroupIcon from "../WordGroupIcon/WordGroupIcon";
import WordSelector from "../WordSelector/WordSelector";

function WordGroupSelector(props) {
  const [wordGroups, setWordGroups] = useState({});
  const [clickedName, setClickedName] = useState("");
  const [clickedGroup, setClickedGroup] = useState([]);
  const [wordSelectorToggle, setWordSelectorToggle] = useState(false);
  const [cardColored, setCardColored] = useState(
    Array(wordGroups.length)
      .fill()
      .map((_, i) => false)
  );

  const handleChangeColor = useCallback(
    index => {
      //only one colored at a time bc you can only choose one word group
      let cardColoredCopy = Array(wordGroups.length)
        .fill()
        .map((_, i) => false);
      cardColoredCopy[index] = true;
      setCardColored(cardColoredCopy);
    },
    [wordGroups.length]
  );

  const handleClick = useCallback((group, groupName) => {
    setClickedGroup(group);
    setClickedName(groupName);
    setWordSelectorToggle(true);
  }, []);

  useEffect(() => {
    if (
      Object.keys(wordGroups).length === 0 ||
      props.assignedWordGroup === "phonics"
    ) {
      collectedWordGroupsService.all().then(function(collectedWordGroups) {
        var tempWordGroups = {};
        var index = 0;
        Object.keys(collectedWordGroups).forEach(wordGroupName => {
          tempWordGroups[TEMPLATE_WORD_GROUPS[wordGroupName]] = {
            words: collectedWordGroups[wordGroupName],
            image: "images/word-group/" + wordGroupName + ".svg",
            index: index
          };
        });
        setWordGroups(tempWordGroups);
      });
    } else if (props.assignedWordGroup) {
      setClickedName(props.assignedWordGroup);
      setClickedGroup(wordGroups[props.assignedWordGroup][0]);
      setWordSelectorToggle(!wordSelectorToggle);
      handleChangeColor(wordGroups[props.assignedWordGroup][2]);
    }
  }, [props.assignedWordGroup]);

  return (
    <div className="background">
      <div className="word-groups-display">
        {Object.keys(wordGroups).map((wordGroupName, index) => (
          <div className="word-groups-margins">
            <div onClick={() => handleClick(wordGroups[wordGroupName].words, wordGroupName, index)}>
              <WordGroupIcon
                name={wordGroupName}
                image={wordGroups[wordGroupName].image}
                colored={cardColored[index]}
                onClick={() => handleClick(wordGroups[wordGroupName].words, wordGroupName, index)}
              />
            </div>
          </div>
        ))}
      </div>
      <div>
        {wordSelectorToggle && (
          <WordSelector
            group={clickedGroup}
            name={clickedName}
            index={wordGroups[clickedName].index}
            setWordSelectorToggle={setWordSelectorToggle}
            selectWords={props.handleChange}
            selectGroup={props.wordGroupChange}
            assignedWordGroup={props.assignedWordGroup}
            assignedWords={props.assignedWords}
            changeColor={handleChangeColor}
          />
        )}
      </div>
    </div>
  );
}

export default WordGroupSelector;
