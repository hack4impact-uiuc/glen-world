import React, { useState, useEffect } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { Button, Row, Col } from "react-bootstrap";
import { withFirebase } from "utils/Firebase";
import "./StudentSelector.scss"

function StudentSelector(props) {
    const [currentDeployment, setCurrentDeployment] = useState()
    const [studentsChecked, setStudentsChecked] = useState([]);
    let deployments = props.deployments;
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
        
    </div>
)
}
export default withFirebase(StudentSelector);