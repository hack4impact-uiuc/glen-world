import React, { useState, useEffect } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { Button, Row, Col } from "react-bootstrap";
import { withFirebase } from "utils/Firebase";
import "./StudentSelector.scss"

function StudentSelector(props) {
    const [currentDeployment, setCurrentDeployment] = useState()
    const [studentsChecked, setStudentsChecked] = useState([]);
    let deployments = props.deployments;

function nameSelector(deploymentAccountId) {
    return (
        <div className = "select-all-margins"> 
            <Row>
            <div>
            <input
                class = "move-down"
                id = "cbox"
                type = "checkbox"
                checked={studentsChecked.indexOf(deploymentAccountId) !== -1}
                onClick = {() => handleClickStudent(deploymentAccountId)}
            />
            </div>
            <div>
            <label className = "student-name-label">{currentDeployment.deploymentAccounts[deploymentAccountId].username}</label>  
            </div>
            </Row>    
        </div>
    )
}
function handleClickStudent(deploymentAccountId) {
    const currentIndex = studentsChecked.indexOf(deploymentAccountId);
    const newChecked = [...studentsChecked];

    if (currentIndex === -1) {
      newChecked.push(deploymentAccountId);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    const setChecked = Array.from(new Set(newChecked));
    setStudentsChecked(setChecked);
    props.handleChange(setChecked);
    console.log(setChecked)
}

function handleClickSelectAll(deployment) {
    let deploymentAccounts = [];
    let selectAll = false;
    const newChecked = [...studentsChecked];
    const indexes = [];
    Object.keys(deployment.deploymentAccounts).map(deploymentAccountId => {
        deploymentAccounts.push(deploymentAccountId)
        if (studentsChecked.indexOf(deploymentAccountId) === -1) {
            selectAll = true;
        } else {
            indexes.push(studentsChecked.indexOf(deploymentAccountId))
        }
        })
    //Right now its not removing the students from the list correctly
    //also need to reset the Select Checkbox for when its colored??
    if (selectAll) {
        newChecked.push.apply(newChecked, deploymentAccounts)
        console.log(newChecked);
    } else {
        indexes.forEach(value =>{
            newChecked.splice(value, 1)
        } )
    }
    const setChecked = Array.from(new Set(newChecked));
    setStudentsChecked(setChecked);
    props.handleChange(setChecked);
    console.log(setChecked)
}

return (
    <div className = "student-selector">
        <DropdownButton id = "depoyment-ddown" title = {"Class:"}>
            {deployments.map((deployment) => (
                <Dropdown className = "option-ddown"
                onClick={() => setCurrentDeployment(deployment)}
                >
                    {deployment.deploymentId}
                </Dropdown>
            ))}
        </DropdownButton>
        {currentDeployment &&
        <div> 
        <div className = "select-all-checkbox">
            <Row>
            <div className = "select-all-margins">
            <label className = "select-all-label">Select All</label>  
            </div>
            <div>
            <input
                class = "move-down"
                id = "cbox"
                type = "checkbox"
                onClick={() => handleClickSelectAll(currentDeployment)}
            />
            </div>
            </Row>    
        </div>
        <div className = "accounts-list">
        {Object.keys(currentDeployment.deploymentAccounts).map(deploymentAccountId => (nameSelector(deploymentAccountId)))}
        </div>
        </div>
        }
        
    </div>
)
}
export default withFirebase(StudentSelector);