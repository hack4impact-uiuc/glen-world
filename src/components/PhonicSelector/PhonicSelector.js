import React, { useState, useEffect, useRef } from "react";
import phonics from "utils/phonics.json";
import PhonicIcon from "../PhonicIcon/PhonicIcon";
import PhonicWordSelector from "../PhonicWordSelector/PhonicWordSelector";
import ReactCardFlip from "react-card-flip";
import "../WordGroupSelector/WordGroupSelector.scss";
import "./PhonicSelector.scss";
function PhonicSelector(props) {
  const phonicKeys = useRef(null);
  const [phonicGroups, setPhonicGroups] = useState({});
  useEffect(() => {
    phonicKeys.current = Object.keys(phonics);
    setPhonicGroups({
      buh: [phonics[phonicKeys.current[0]]],
      duh: [phonics[phonicKeys.current[1]]],
      kuh: [phonics[phonicKeys.current[2]]],
      fuh: [phonics[phonicKeys.current[3]]]
    });
  }, []);
  const [chosenPhonics, setChosenPhonics] = useState([]);
  const [flipCard, setFlipCard] = useState(
    Array(phonicGroups.length)
      .fill()
      .map((_, i) => false)
  );
  const [cardColored, setCardColored] = useState(
    Array(phonicGroups.length)
      .fill()
      .map((_, i) => false)
  );
  function handleChangeFlipMode(flipMode, index) {
    let flipModeCopy = [...flipCard];
    flipModeCopy[index] = flipMode;
    setFlipCard(flipModeCopy);
  }
  function handleSelectPhonicGroup(shouldSelect, phonicName, index) {
    //all phonics lessons will be in the "phonics" word group
    props.handleGroupChange("phonics");
    let chosenPhonicsCopy = [...chosenPhonics];
    let cardColoredCopy = [...cardColored];
    if (shouldSelect) {
      chosenPhonicsCopy.push(phonicName);
      cardColoredCopy[index] = true;
      console.log("add phonics to the list");
    } else {
      for (var i = 0; i < chosenPhonicsCopy.length; i++) {
        if (chosenPhonicsCopy[i] === phonicName) {
          chosenPhonicsCopy.splice(i, 1);
        }
      }
      cardColoredCopy[index] = false;
      console.log("remove from list");
    }
    //functions in this order bc react sets state asynchronously
    props.handlePhonicsChange(chosenPhonicsCopy);
    setChosenPhonics(chosenPhonicsCopy);
    setCardColored(cardColoredCopy);
  }

  return (
    <div className="PhonicBackground">
      <div className="WordGroups">
        {Object.keys(phonicGroups).map((key, index) => (
          <div>
            <ReactCardFlip isFlipped={flipCard[index]} flipDirection="vertical">
              <div onClick={() => handleChangeFlipMode(true, index)}>
                <PhonicIcon name={key} colored={cardColored[index]} />
              </div>
              <div onClick={() => handleChangeFlipMode(false, index)}>
                <PhonicWordSelector
                  index={index}
                  data={phonicGroups[key]}
                  name={key}
                  setFlipMode={handleChangeFlipMode}
                  handleSelectPhonics={handleSelectPhonicGroup}
                />
              </div>
            </ReactCardFlip>
          </div>
        ))}
      </div>
    </div>
  );
}
export default PhonicSelector;
