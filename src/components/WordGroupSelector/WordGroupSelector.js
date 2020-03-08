import React, { useState, useEffect } from "react";
import { collectedWordGroupsService } from "util/GWUtil/resource";
import "./WordGroupSelector.css";
import WordGroupIcon from "./WordGroupIcon";
import WordSelector from "./WordSelector";

function WordGroupSelector(props) {
  var collectedWordGroups = null;
  var wordKeys = null;
  const [wordGroups, setWordGroups] = useState({});

  useEffect(() => {
    collectedWordGroupsService.all().then(function(res) {
      collectedWordGroups = res;
      wordKeys = Object.keys(collectedWordGroups);
      setWordGroups({
        People: collectedWordGroups[wordKeys[0]],
        Action: collectedWordGroups[wordKeys[1]],
        Toys: collectedWordGroups[wordKeys[2]],
        Colors: collectedWordGroups[wordKeys[3]],
        Animals: collectedWordGroups[wordKeys[4]],
        Transport: collectedWordGroups[wordKeys[5]],
        "Body Parts": collectedWordGroups[wordKeys[6]],
        Clothing: collectedWordGroups[wordKeys[7]],
        Food: collectedWordGroups[wordKeys[8]],
        "More Food": collectedWordGroups[wordKeys[9]],
        Furniture: collectedWordGroups[wordKeys[10]],
        Emotion: collectedWordGroups[wordKeys[11]],
        Media: collectedWordGroups[wordKeys[12]],
        "More Animals": collectedWordGroups[wordKeys[13]],
        "Even More Animals!": collectedWordGroups[wordKeys[14]]
      });
    });
  }, []);

  const [clickedName, setClickedName] = useState("");
  const [clickedGroup, setClickedGroup] = useState([]);
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
          />
        )}
      </div>
    </div>
  );
}

export default WordGroupSelector;
