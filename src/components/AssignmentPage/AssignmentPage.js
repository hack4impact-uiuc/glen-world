import React, { useState } from "react";
import CalendarComponent from "../DatePicker/DatePicker";
import { Container, Row, Col } from "react-bootstrap";
import { withFirebase } from "utils/Firebase";
import { compose } from "recompose";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "../DatePicker/DatePicker";
import StudentList from "../StudentList/StudentList";
function AssignmentPage() {
  const [Date, setDate] = useState();
  const [DeploymentAccounts, setDeploymentAccounts] = useState([]);

  const json = [
    { "deploymentId": "potatopotatopotato",
       "deploymentAccounts": [ 
           "curly fries",
           "waffle fries",
           "home fries",
           "tator tots",
           "smiley fries",
           "crinkly fries"
       ]
     }, 
     { "deploymentId": "lamtalkssomuchohmygod",
       "deploymentAccounts": [ 
           "genedidntbringgummybears",
           "kellyisdaddy",
           "weshouldgetpatagonias",
           "roy: no minecraft server or patagonias", 
           "anisha: your design sucks"
       ]
     },
     { "deploymentId": "imsotired",
       "deploymentAccounts": [ 
           "thisshitissostupid",
           "imswitchingtobackend",
           "fuckjavascript",
           "wtfisevengoingon", 
           "idkhowtofrontend:(imjustgoodatcopyingandpasting"
       ]
     },
    ]
  function handleDatePickerChange(value) {
    setDate(value);
  }
  function handleDeploymentAccounts(value) {
    setDeploymentAccounts(value);
  }

  return (
    <div className="place_middle">
      {console.log(DeploymentAccounts)}
      {console.log(Date)}
      <Container>
        <Row>
          <h1>this is the assignment page yall</h1>
        </Row>
        <Row>
          <Col>
            <StudentList deployments = {json} handleChange = {handleDeploymentAccounts}/>
          </Col>
          <Col>
            <DatePicker handleChange={handleDatePickerChange} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default compose(withFirebase)(AssignmentPage);
