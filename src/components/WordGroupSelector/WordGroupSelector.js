import React, { useState, useEffect, useRef } from "react";
import { collectedWordGroupsService } from "util/GWUtil/resource";
import "./WordGroupSelector.scss";
import { Button, Row, Col } from "react-bootstrap";
import WordGroupIcon from "../WordGroupIcon/WordGroupIcon";
import WordSelector from "../WordSelector/WordSelector";

function WordGroupSelector(props) {
  const wordKeys = useRef(null);
  const [wordGroups, setWordGroups] = useState({});
  const [clickedName, setClickedName] = useState("");
  const [clickedGroup, setClickedGroup] = useState([]);
  // selectMode dictates whether WordSelector component appears and a group's words can be selected
  const [selectMode, setSelectMode] = useState(false);
  useEffect(() => {
    if (
      Object.keys(wordGroups).length == 0 ||
      props.assignedWordGroup == "phonics"
    ) {
      collectedWordGroupsService.all().then(function(collectedWordGroups) {
        wordKeys.current = Object.keys(collectedWordGroups);
        /*
        key is the word group name
        0th index is the list of words in this word group
        1st index is the image corresponding with the word group
        2nd index is the index of this word group among the list of all word groups (used to keep track of color changes)
        */
        setWordGroups({
          People: [
            collectedWordGroups[wordKeys.current[0]],
            "images/word-group/person.svg",
            0
          ],
          Action: [
            collectedWordGroups[wordKeys.current[1]],
            "images/word-group/action.svg",
            1
          ],
          Toys: [
            collectedWordGroups[wordKeys.current[2]],
            "images/word-group/toys.svg",
            2
          ],
          Colors: [
            collectedWordGroups[wordKeys.current[3]],
            "images/word-group/colors.svg",
            3
          ],
          Animals: [
            collectedWordGroups[wordKeys.current[4]],
            "images/word-group/animals-1.svg",
            4
          ],
          Transport: [
            collectedWordGroups[wordKeys.current[5]],
            "images/word-group/travel.svg",
            5
          ],
          "Body Parts": [
            collectedWordGroups[wordKeys.current[6]],
            "images/word-group/body.svg",
            6
          ],
          Clothing: [
            collectedWordGroups[wordKeys.current[7]],
            "images/word-group/clothes.svg",
            7
          ],
          Food: [
            collectedWordGroups[wordKeys.current[8]],
            "images/word-group/food-1.svg",
            8
          ],
          "More Food": [
            collectedWordGroups[wordKeys.current[9]],
            "images/word-group/food-2.svg",
            9
          ],
          Furniture: [
            collectedWordGroups[wordKeys.current[10]],
            "images/word-group/home.svg",
            10
          ],
          Emotion: [
            collectedWordGroups[wordKeys.current[11]],
            "images/word-group/emotions.svg",
            11
          ],
          Media: [
            collectedWordGroups[wordKeys.current[12]],
            "images/word-group/media.svg",
            12
          ],
          "Animals 2": [
            collectedWordGroups[wordKeys.current[13]],
            "images/word-group/animals-2.svg",
            13
          ],
          "Animals 3": [
            collectedWordGroups[wordKeys.current[14]],
            "images/word-group/animals-3.svg",
            14
          ]
        });
      });
    } else if (props.assignedWordGroup) {
      setClickedName(props.assignedWordGroup);
      setClickedGroup(wordGroups[props.assignedWordGroup][0]);
      setSelectMode(!selectMode);
      handleChangeColor(wordGroups[props.assignedWordGroup][2]);
    }
  }, [wordGroups]);
  const [cardColored, setCardColored] = useState(
    Array(wordGroups.length)
      .fill()
      .map((_, i) => false)
  );
  function handleClick(group, groupName) {
    setClickedGroup(group);
    setClickedName(groupName);
    setSelectMode(!selectMode);
  }
  function handleChangeColor(index) {
    //only one colored at a time bc you can only choose one word group
    let cardColoredCopy = Array(wordGroups.length)
      .fill()
      .map((_, i) => false);
    cardColoredCopy[index] = true;
    setCardColored(cardColoredCopy);
  }

  function handleChangeSelectMode(selectStatus) {
    setSelectMode(selectStatus);
  }

  return (
    <div className="background">
      <div className="word-groups-display">
        {Object.keys(wordGroups).map((key, index) => (
          <div className = "word-groups-margins">
          <div onClick={() => handleClick(wordGroups[key][0], key, index)}>
            <WordGroupIcon
              name={key}
              image={wordGroups[key][1]}
              colored={cardColored[index]}
              onClick={() => handleClick(wordGroups[key][0], key, index)}
            />
          </div>
          </div>
        ))}
      </div>
      <div>
        {selectMode && (
          <WordSelector
            group={clickedGroup}
            name={clickedName}
            index={wordGroups[clickedName][2]}
            setSelectMode={handleChangeSelectMode}
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
