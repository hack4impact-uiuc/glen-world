import React, { useState, useEffect, useRef } from "react";
import { lessonService } from "util/GWUtil/resource";
import phonics from "utils/phonics.json";
import PhonicIcon from "../PhonicIcon/PhonicIcon";
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
    return (
        <div className="Background">
            <div className = "WordGroups">
          {Object.keys(phonicGroups).map(key => (
        // <div onClick={() => handleClick(wordGroups[key][0], key)}>
        <div>
            {console.log(key)}
            {console.log(phonicGroups[key])}
            <PhonicIcon name = {key}/>
            
        </div>
        ))}
        </div>
        </div>
      );
}
export default PhonicSelector;
/**
 * Todo:
 * make the handleclick functions and stuff
 * make it look better
 * make the phonics words card
 */