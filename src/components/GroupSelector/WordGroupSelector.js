import React, { useState, useEffect, useRef } from "react";
import { collectedWordGroupsService } from "util/GWUtil/resource";
import "./WordGroupSelector.css";
import WordGroupIcon from "../WordGroupIcon/WordGroupIcon";
import WordSelector from "../WordSelector/WordSelector";

function WordGroupSelector(props) {
  const wordKeys = useRef(null);
  const [wordGroups, setWordGroups] = useState({});

  useEffect(() => {
    collectedWordGroupsService.all().then(function(collectedWordGroups) {
      wordKeys.current = Object.keys(collectedWordGroups);
      setWordGroups({
        People: collectedWordGroups[wordKeys.current[0]],
        Action: collectedWordGroups[wordKeys.current[1]],
        Toys: collectedWordGroups[wordKeys.current[2]],
        Colors: collectedWordGroups[wordKeys.current[3]],
        Animals: collectedWordGroups[wordKeys.current[4]],
        Transport: collectedWordGroups[wordKeys.current[5]],
        "Body Parts": collectedWordGroups[wordKeys.current[6]],
        Clothing: collectedWordGroups[wordKeys.current[7]],
        Food: collectedWordGroups[wordKeys.current[8]],
        "More Food": collectedWordGroups[wordKeys.current[9]],
        Furniture: collectedWordGroups[wordKeys.current[10]],
        Emotion: collectedWordGroups[wordKeys.current[11]],
        Media: collectedWordGroups[wordKeys.current[12]],
        "More Animals": collectedWordGroups[wordKeys.current[13]],
        "Even More Animals!": collectedWordGroups[wordKeys.current[14]]
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
        {Object.keys(wordGroups).map((key, index) => (
          <div onClick={() => handleClick(wordGroups[key], key)}>
            <WordGroupIcon number={index} name={key} />
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
