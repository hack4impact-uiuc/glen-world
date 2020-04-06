import React, { useState, useEffect, useRef } from "react";
import { lessonService } from "util/GWUtil/resource";
import phonics from "utils/phonics.json";
import PhonicIcon from "../PhonicIcon/PhonicIcon";
import PhonicWordSelector from "../PhonicWordSelector/PhonicWordSelector";
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
    const [clickedName, setClickedName] = useState("");
    const [clickedGroup, setClickedGroup] = useState([]);
    const [selectMode, setSelectMode] = useState(false);

    function handleClick(data, name) {
      setClickedGroup(data);
      setClickedName(name);
      setSelectMode(!selectMode);
    }
    function handleChangeSelectMode(selectStatus) {
      setSelectMode(selectStatus);
    }
    return (
        <div className="Background">
            <div className = "WordGroups">
          {Object.keys(phonicGroups).map(key => (
        <div onClick={() => handleClick(phonicGroups[key], key)}>
            <PhonicIcon name = {key}/>
            
        </div>
        ))}
        </div>
        <div>
          {selectMode && (
            <PhonicWordSelector
              data={clickedGroup}
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
export default PhonicSelector;
/**
 * Todo:
 * 1. handle the select of the phonics card
 *    wordgroup = "phonics" and words = "buh, kuh or whatever"
 *    everytime it selects, it adds to the word list? unselect, it deletes from the word list?
 * 2. make it look prettier
 * 3. clear up confusion on how the word groups are gonna be
 * 3. make sure assigning phonics works
 */