import React, { useState, useEffect, useRef } from "react";
import { collectedWordGroupsService } from "util/GWUtil/resource";
import "./WordGroupSelector.scss";
import WordGroupIcon from "../WordGroupIcon/WordGroupIcon";
import WordSelector from "../WordSelector/WordSelector";

function WordGroupSelector(props) {
  const wordKeys = useRef(null);
  const [wordGroups, setWordGroups] = useState({});

  useEffect(() => {
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
  }, []);

  const [clickedName, setClickedName] = useState("");
  const [clickedGroup, setClickedGroup] = useState([]);
  // selectMode dictates whether WordSelector component appears and a group's words can be selected
  const [selectMode, setSelectMode] = useState(false);

  function handleClick(group, groupName) {
    setClickedGroup(group);
    setClickedName(groupName);
    setSelectMode(!selectMode);
  }

  function handleChangeSelectMode(selectStatus) {
    setSelectMode(selectStatus);
  }

  return (
    <div className="Background">
      <div className="WordGroups">
        {Object.keys(wordGroups).map(key => (
          <div onClick={() => handleClick(wordGroups[key][0], key)}>
            <WordGroupIcon name={key} image={wordGroups[key][1]} />
          </div>
        ))}
      </div>
      <div>
        {selectMode && (
          <WordSelector
            group={clickedGroup}
            name={clickedName}
            setSelectMode={handleChangeSelectMode}
            selectWords={props.handleChange}
            selectGroup={props.wordGroupChange}
          />
        )}
      </div>
    </div>
  );
}

export default WordGroupSelector;
