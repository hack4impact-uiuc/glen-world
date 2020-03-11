import React from "react";
import { withFirebase } from "utils/Firebase";
import ButtonBase from '@material-ui/core/ButtonBase';
import {Row, Col, Container} from 'react-bootstrap';
import 'SectionSelector/SectionSelector.css';
function SectionSelector(props) {
    return (
        <div>
            <Container className = 'place_middle'>
            <Row className = 'row'>
                <Col>
                <ButtonBase><img src="images/words.png" alt="my image"/></ButtonBase>
                </Col>
                <Col>
                <ButtonBase><img src="images/phonics.png" alt="my image"/></ButtonBase>
                </Col>
                <Col>
                <ButtonBase><img src="images/write.png" alt="my image"/></ButtonBase>
                </Col>
            </Row>
            </Container>
        </div>
    )
}
export default withFirebase(SectionSelector)