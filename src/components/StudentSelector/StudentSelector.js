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
            {/* {currentDeployment.deploymentAccounts[deploymentAccountId].username} */}
            <Row>
            <div>
            <input
                class = "move-down"
                id = "cbox"
                type = "checkbox"
            />
            </div>
            <div>
            <label className = "student-name-label">{currentDeployment.deploymentAccounts[deploymentAccountId].username}</label>  
            </div>
            </Row>    
        </div>
    )
}
return (
    <div className = "student-selector">
        {console.log(currentDeployment)}
        <DropdownButton id = "depoyment-ddown" title = {"Class:"}>
            {deployments.map((deployment) => (
                <Dropdown className = "option-ddown"
                onClick={() => setCurrentDeployment(deployment)}
                >
                    {deployment.deploymentId}
                </Dropdown>
            ))}
        </DropdownButton>
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
            />
            </div>
            </Row>    
        </div>
        {currentDeployment && <div className = "accounts-list">
        {Object.keys(currentDeployment.deploymentAccounts).map(deploymentAccountId => (nameSelector(deploymentAccountId)))}
        </div>}
        
    </div>
)
}
export default withFirebase(StudentSelector);