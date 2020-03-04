import React, { useState } from "react";
import {collectedWordGroupsService} from "util/GWUtil/resource";
import "./WordGroupSelection.css";
import WordGroupIcon from "./WordGroupIcon";
import WordSelection from "./WordSelection";

function WordGroupSelection(props) {
    var word_groups = null;
    var word_keys = null;
    const [peopleWords, setPeopleWords] = useState(null);
    const [actionWords, setActionWords] = useState(null);
    const [toyWords, setToyWords] = useState(null);
    const [colorWords, setColorWords] = useState(null);
    const [animalWords, setAnimalWords] = useState(null);
    const [transportWords, setTransportWords] = useState(null);
    const [bodyWords, setBodyWords] = useState(null);
    const [clothingWords, setClothingWords] = useState(null);
    const [foodWords, setFoodWords] = useState(null);
    const [foodWords2, setFoodWords2] = useState(null);
    const [furnitureWords, setFurnitureWords] = useState(null);
    const [emotionWords, setEmotionWords] = useState(null);
    const [mediaWords, setMediaWords] = useState(null);
    const [animalWords2, setAnimalWords2] = useState(null);
    const [animalWords3, setAnimalWords3] = useState(null);

    collectedWordGroupsService.all().then(function(res) {
        word_groups = res;
        word_keys = Object.keys(word_groups);
        setPeopleWords(word_groups[word_keys[0]])
        setActionWords(word_groups[word_keys[1]])
        setToyWords(word_groups[word_keys[2]])
        setColorWords(word_groups[word_keys[3]])
        setAnimalWords(word_groups[word_keys[4]])
        setTransportWords(word_groups[word_keys[5]])
        setBodyWords(word_groups[word_keys[6]])
        setClothingWords(word_groups[word_keys[7]])
        setFoodWords(word_groups[word_keys[8]])
        setFoodWords2(word_groups[word_keys[9]])
        setFurnitureWords(word_groups[word_keys[10]])
        setEmotionWords(word_groups[word_keys[11]])
        setMediaWords(word_groups[word_keys[12]])
        setAnimalWords2(word_groups[word_keys[13]])
        setAnimalWords3(word_groups[word_keys[14]])
    });

    const [clickedName, setClickedName] = useState('');
    const [clickedGroup, setClickedGroup] = useState([]);
    const [selectionMode, setSelectionMode] = useState(false);

    function handleClick(group, groupName) {
        setClickedGroup(group);
        setClickedName(groupName);
        setSelectionMode(!selectionMode);
    }

    function handleChangeSelectionMode(selectStatus) {
        setSelectionMode(selectStatus);
    }

    return(
        <div className="Background">
            <div className="WordGroups">
                <div onClick={() => handleClick(peopleWords, "People")}>
                    <WordGroupIcon number={1} name={"People"}/>
                </div>
                <div onClick={() => handleClick(actionWords, "Action")}>
                    <WordGroupIcon number={2} name={"Action"}/>
                </div>
                <div onClick={() => handleClick(toyWords, "Toy")}>
                    <WordGroupIcon number={3} name={"Toy"}/>
                </div>
                <div onClick={() => handleClick(colorWords, "Colors")}>
                    <WordGroupIcon number={4} name={"Colors"}/>
                </div>
                <div onClick={() => handleClick(animalWords, "Animals")}>
                    <WordGroupIcon number={5} name={"Animals"}/>
                </div>
                <div onClick={() => handleClick(transportWords, "Transport")}>
                    <WordGroupIcon number={6} name={"Transport"}/>
                </div>
                <div onClick={() => handleClick(bodyWords, "Body Parts")}>
                    <WordGroupIcon number={7} name={"Body Parts"}/>
                </div>
                <div onClick={() => handleClick(clothingWords, "Clothing")}>
                    <WordGroupIcon number={8} name={"Clothing"}/>
                </div>
                <div onClick={() => handleClick(foodWords, "Food")}>
                    <WordGroupIcon number={9} name={"Food"}/>
                </div>
                <div onClick={() => handleClick(foodWords2, "More Food")}>
                    <WordGroupIcon number={10} name={"More Food"}/>
                </div>
                <div onClick={() => handleClick(furnitureWords, "Furniture")}>
                    <WordGroupIcon number={11} name={"Furniture"}/>
                </div>
                <div onClick={() => handleClick(emotionWords, "Emotion")}>
                    <WordGroupIcon number={12} name={"Emotion"}/>
                </div>
                <div onClick={() => handleClick(mediaWords, "Media")}>
                    <WordGroupIcon number={13} name={"Media"}/>
                </div>
                <div onClick={() => handleClick(animalWords2, "More Animals")}>
                    <WordGroupIcon number={14} name={"More Animals"}/>
                </div>
                <div onClick={() => handleClick(animalWords3, "Even More Animals!")}>
                    <WordGroupIcon number={15} name={"Even More Animals!"}/>
                </div>
            </div>
            <div>
                {selectionMode && <WordSelection group={clickedGroup} name={clickedName} setSelectMode={handleChangeSelectionMode} selectWords={props.handleChange}/>}
            </div>
        </div>
    )
}

export default WordGroupSelection