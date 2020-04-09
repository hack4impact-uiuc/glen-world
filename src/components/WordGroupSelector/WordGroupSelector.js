import React, { useState, useEffect, useRef } from "react";
import { collectedWordGroupsService } from "util/GWUtil/resource";
import "./WordGroupSelector.scss";
import WordGroupIcon from "../WordGroupIcon/WordGroupIcon";
import WordSelector from "../WordSelector/WordSelector";

function WordGroupSelector(props) {
  const wordKeys = useRef(null);
  const [wordGroups, setWordGroups] = useState({});
  const [clickedName, setClickedName] = useState("");
  const [clickedGroup, setClickedGroup] = useState([]);
  const [clickedIndex, setClickedIndex] = useState();
  // selectMode dictates whether WordSelector component appears and a group's words can be selected
  const [selectMode, setSelectMode] = useState(false);
  useEffect(() => {
    if (
      Object.keys(wordGroups).length == 0 ||
      props.assignedWordGroup == "phonics"
    ) {
      collectedWordGroupsService.all().then(function(collectedWordGroups) {
        wordKeys.current = Object.keys(collectedWordGroups);
        setWordGroups({
          People: [
            collectedWordGroups[wordKeys.current[0]],
            "images/word-group/person.svg"
          ],
          Action: [
            collectedWordGroups[wordKeys.current[1]],
            "images/word-group/action.svg"
          ],
          Toys: [
            collectedWordGroups[wordKeys.current[2]],
            "images/word-group/toys.svg"
          ],
          Colors: [
            collectedWordGroups[wordKeys.current[3]],
            "images/word-group/colors.svg"
          ],
          Animals: [
            collectedWordGroups[wordKeys.current[4]],
            "images/word-group/animals-1.svg"
          ],
          Transport: [
            collectedWordGroups[wordKeys.current[5]],
            "images/word-group/travel.svg"
          ],
          "Body Parts": [
            collectedWordGroups[wordKeys.current[6]],
            "images/word-group/body.svg"
          ],
          Clothing: [
            collectedWordGroups[wordKeys.current[7]],
            "images/word-group/clothes.svg"
          ],
          Food: [
            collectedWordGroups[wordKeys.current[8]],
            "images/word-group/food-1.svg"
          ],
          "More Food": [
            collectedWordGroups[wordKeys.current[9]],
            "images/word-group/food-2.svg"
          ],
          Furniture: [
            collectedWordGroups[wordKeys.current[10]],
            "images/word-group/home.svg"
          ],
          Emotion: [
            collectedWordGroups[wordKeys.current[11]],
            "images/word-group/emotions.svg"
          ],
          Media: [
            collectedWordGroups[wordKeys.current[12]],
            "images/word-group/media.svg"
          ],
          "More Animals": [
            collectedWordGroups[wordKeys.current[13]],
            "images/word-group/animals-2.svg"
          ],
          "Even More Animals!": [
            collectedWordGroups[wordKeys.current[14]],
            "images/word-group/animals-3.svg"
          ]
        });
      });
    } else if (props.assignedWordGroup) {
      setClickedName(props.assignedWordGroup);
      setClickedGroup(wordGroups[props.assignedWordGroup][0]);
      setSelectMode(!selectMode);
    }
  }, [wordGroups]);
  const [cardColored, setCardColored] = useState(
    Array(wordGroups.length)
      .fill()
      .map((_, i) => false)
  );
  /**
   * TODO:
   * have color change when editing lesson, so setCardColored above to true for that index. The index is props.assignedWordGroup
   * 
   */
  function handleClick(group, groupName, index) {
    setClickedGroup(group);
    setClickedName(groupName);
    setSelectMode(!selectMode);
    setClickedIndex(index);
  }
  function handleChangeColor(index) {
    //only one colored at a time bc you can only choose one word group
    let cardColoredCopy = Array(wordGroups.length).fill().map((_, i) => false);
    cardColoredCopy[index] = true;
    setCardColored(cardColoredCopy);
  }

  function handleChangeSelectMode(selectStatus) {
    setSelectMode(selectStatus);
  }

  return (
    <div className="Background">
      <div className="WordGroups">
        {Object.keys(wordGroups).map((key, index) => (
          <div onClick={() => handleClick(wordGroups[key][0], key, index)}>
            <WordGroupIcon name={key} image={wordGroups[key][1]} colored = {cardColored[index]} />
          </div>
        ))}
      </div>
      <div>
        {selectMode && (
          <WordSelector
            group={clickedGroup}
            name={clickedName}
            index = {clickedIndex}
            setSelectMode={handleChangeSelectMode}
            selectWords={props.handleChange}
            selectGroup={props.wordGroupChange}
            assignedWordGroup={props.assignedWordGroup}
            assignedWords={props.assignedWords}
            changeColor ={handleChangeColor}
          />
        )}
      </div>
    </div>
  );
}

export default WordGroupSelector;
