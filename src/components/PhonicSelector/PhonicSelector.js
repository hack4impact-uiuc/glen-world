import React, { useState, useEffect, useRef } from "react";
import phonicGroups from "utils/phonics.json";
import PhonicIcon from "../PhonicIcon/PhonicIcon";
import PhonicWordSelector from "../PhonicWordSelector/PhonicWordSelector";
import ReactCardFlip from "react-card-flip";
import "./PhonicSelector.scss";
function PhonicSelector(props) {
  const [flipCard, setFlipCard] = useState(
    Array(phonicGroups.length).fill(false)
  );
  const [cardColored, setCardColored] = useState(
    Array(phonicGroups.length).fill(false)
  );

  useEffect(() => {
    props.handleGroupChange("phonics");

    // prepopulate phonic groups if editing existing lesson
    let cardColoredCopy = [...cardColored];
    Object.keys(phonicGroups).forEach((key, index) => {
      if (props.words.includes(key)) cardColoredCopy[index] = true;
    });
    setCardColored(cardColoredCopy);
  }, []);

  function handleChangeFlipMode(flipMode, index) {
    let flipModeCopy = [...flipCard];
    flipModeCopy[index] = flipMode;
    setFlipCard(flipModeCopy);
  }

  function handleSelectPhonicGroup(shouldSelect, phonicName, index) {
    //all phonics lessons will be in the "phonics" word group
    let chosenPhonicsCopy = [...props.words];
    let cardColoredCopy = [...cardColored];
    if (shouldSelect) {
      chosenPhonicsCopy.push(phonicName);
      cardColoredCopy[index] = true;
    } else {
      chosenPhonicsCopy.splice(chosenPhonicsCopy.indexOf(phonicName), 1);
      cardColoredCopy[index] = false;
    }
    //functions in this order bc react sets state asynchronously
    props.handlePhonicsChange(chosenPhonicsCopy);
    setCardColored(cardColoredCopy);
  }

  return (
    <div className="PhonicBackground">
      <div className="phonic-groups-display">
        {Object.keys(phonicGroups).map((key, index) => (
          <div>
            <ReactCardFlip isFlipped={flipCard[index]} flipDirection="vertical">
              <div className = "phonic-icon-margin">
              <div onClick={() => handleChangeFlipMode(true, index)}>
              <PhonicIcon name={key} colored={cardColored[index]} />
              </div>
              </div>
              <div className = "phonic-icon-margin">
              <div onClick={() => handleChangeFlipMode(false, index)}>
                <PhonicWordSelector
                  index={index}
                  data={phonicGroups[key]}
                  name={key}
                  selected={cardColored[index]}
                  handleSelectPhonics={handleSelectPhonicGroup}
                />
              </div>
              </div>
            </ReactCardFlip>
          </div>
        ))}
      </div>
    </div>
  );
}
export default PhonicSelector;
