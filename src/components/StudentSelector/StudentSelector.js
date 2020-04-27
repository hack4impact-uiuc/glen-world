import React, { useState, useEffect } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { withFirebase } from "utils/Firebase";
import "./StudentSelector.scss"

function StudentSelector(props) {
    const [currentDeployment, setCurrentDeployment] = useState()
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
        
    </div>
)
}
export default withFirebase(StudentSelector);