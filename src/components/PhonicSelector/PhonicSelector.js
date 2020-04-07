import React, { useState, useEffect, useRef } from "react";
import { lessonService } from "util/GWUtil/resource";
import phonics from "utils/phonics.json";
import PhonicIcon from "../PhonicIcon/PhonicIcon";
import PhonicWordSelector from "../PhonicWordSelector/PhonicWordSelector";
import ReactCardFlip from 'react-card-flip';
import "../WordGroupSelector/WordGroupSelector.scss";
function PhonicSelector(props) {
    const phonicKeys = useRef(null);
    const [phonicGroups, setPhonicGroups] = useState({});
    useEffect(() => {
          phonicKeys.current = Object.keys(phonics);
          setPhonicGroups({
            buh: [
                phonics[phonicKeys.current[0]]
              ],
            duh: [
                phonics[phonicKeys.current[1]]
              ],
            kuh: [
            phonics[phonicKeys.current[2]]
            ],
            fuh: [
                phonics[phonicKeys.current[3]]
            ],
          });
      }, []);
    const [chosenPhonics, setChosenPhonics] = useState([]);
    const [flipCard, setFlipCard] = useState(Array(phonicGroups.length)
    .fill()
    .map((_, i) => false));
    const [cardColored, setCardColored] = useState(Array(phonicGroups.length)
    .fill()
    .map((_, i) => false));
    function handleChangeFlipMode(flipMode, index) {
      let flipModeCopy = [...flipCard];
      flipModeCopy[index] = flipMode;
      setFlipCard(flipModeCopy);
    }
    function handleSelectPhonicGroup(shouldSelect, phonicName, index) {
      //all phonics lessons will be in the "phonics" word group
      props.handleGroupChange("phonics")
      let chosenPhonicsCopy = [...chosenPhonics];
      let cardColoredCopy = [...cardColored];
      if (shouldSelect) {
        chosenPhonicsCopy.push(phonicName)
        cardColoredCopy[index] = true;
        console.log("add phonics to the list")
      } 
      else {
        //why is there no build in remove method :(
        for( var i = 0; i < chosenPhonicsCopy.length; i++){ 
          if ( chosenPhonicsCopy[i] === phonicName) { 
            chosenPhonicsCopy.splice(i, 1); 
          }
        }
        cardColoredCopy[index] = false;
        console.log("remove from list")
      }
      //functions in this order bc react sets state asynchronously
      props.handlePhonicsChange(chosenPhonicsCopy)
      setChosenPhonics(chosenPhonicsCopy)
      setCardColored(cardColoredCopy);
    }

    return (
        <div className="Background">
            <div className = "WordGroups">
            {Object.keys(phonicGroups).map((key,index) => (
          <div>
              <ReactCardFlip isFlipped={flipCard[index]} flipDirection="vertical">
              <div onClick={() => handleChangeFlipMode(true, index)}>
              <PhonicIcon name = {key} colored = {cardColored[index]}/> 
              </div>
              <div onClick={() =>handleChangeFlipMode(false, index)}>
              <PhonicWordSelector
              index ={index}
              data={phonicGroups[key]}
              name={key}
              setFlipMode={handleChangeFlipMode}
              handleSelectPhonics={handleSelectPhonicGroup}
              //selectWords={props.handleChange}
            />
              </div>
              </ReactCardFlip>    
          </div>
          ))}
          {/* {Object.keys(phonicGroups).map(key => (
          <div onClick={() => handleClick(phonicGroups[key], key)}>
              <PhonicIcon name = {key}/>     
          </div>
          ))} */}
        </div>
        {/* <div>
          {selectMode && (
            <PhonicWordSelector
              data={clickedGroup}
              name={clickedName}
              setSelectMode={handleChangeSelectMode}
              selectWords={props.handleChange}
              selectGroup={props.wordGroupChange}
            />
          )}
        </div> */}
        </div>
      );
}
export default PhonicSelector;
/**
 * Todo:
 * 1. handle the select of the phonics card
 *    wordgroup = "phonics" and words = "buh, kuh or whatever"
 *    everytime it selects, it adds to the word list? unselect, it deletes from the word list?
 * 2. make it look prettier
 * 3. clear up confusion on how the word groups are gonna be
 * 3. make sure assigning phonics works
 * 
 * TODO:::
 * ** WRITE FUNCTION TO HANDLE WHEN THE USER SELECTS A PHONICS GROUP
 * **Clean up code. 
 */