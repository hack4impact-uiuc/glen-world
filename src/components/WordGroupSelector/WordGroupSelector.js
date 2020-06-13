import React, { useState, useEffect, useCallback } from "react";
import { collectedWordGroupsService } from "util/GWUtil/resource";
import "./WordGroupSelector.scss";
import { TEMPLATE_WORD_GROUPS } from "../../utils/constants";
import WordGroupIcon from "../WordGroupIcon/WordGroupIcon";
import WordSelector from "../WordSelector/WordSelector";

function WordGroupSelector(props) {
  const [wordGroups, setWordGroups] = useState({});
  const [clickedName, setClickedName] = useState("");
  const [clickedGroup, setClickedGroup] = useState([]);
  const [wordSelectorToggle, setWordSelectorToggle] = useState(false);

  const handleClick = useCallback(
    (group, groupName) => {
      setClickedGroup(group);
      setClickedName(groupName);
      setWordSelectorToggle(!wordSelectorToggle);
    },
    [wordSelectorToggle]
  );

  useEffect(() => {
    if (
      Object.keys(wordGroups).length === 0 ||
      props.assignedWordGroup === "phonics"
    ) {
      collectedWordGroupsService.all().then(function(collectedWordGroups) {
        let tempWordGroups = {};
        Object.keys(collectedWordGroups).forEach(wordGroupName => {
          tempWordGroups[TEMPLATE_WORD_GROUPS[wordGroupName]] = {
            words: collectedWordGroups[wordGroupName],
            image: "images/word-group/" + wordGroupName + ".svg"
          };
        });
        setWordGroups(tempWordGroups);
      });
    } else if (props.assignedWordGroup) {
      setClickedName(props.assignedWordGroup);
      setClickedGroup(wordGroups[props.assignedWordGroup].words);
      setWordSelectorToggle(true);
    }
  }, [wordGroups]);

  return (
    <div className="word-group-selector">
      <div className="word-groups-display">
        {Object.keys(wordGroups).map((wordGroupName, index) => (
          <div key={index} className="word-groups-margins">
            <div
              onClick={() =>
                handleClick(wordGroups[wordGroupName].words, wordGroupName)
              }
            >
              <WordGroupIcon
                name={wordGroupName}
                image={wordGroups[wordGroupName].image}
                colored={wordGroupName === props.selectedWordGroup}
                onClick={() =>
                  handleClick(wordGroups[wordGroupName].words, wordGroupName)
                }
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
            setWordSelectorToggle={setWordSelectorToggle}
            selectWords={props.setWords}
            selectWordGroup={props.setWordGroup}
            assignedWordGroup={props.assignedWordGroup}
            assignedWords={props.assignedWords}
          />
        )}
      </div>
    </div>
  );
}

export default WordGroupSelector;
