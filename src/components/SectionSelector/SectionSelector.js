import React from "react";
import { withFirebase } from "utils/Firebase";
import {ButtonBase, Button, Typography, Box} from '@material-ui/core/';
import {Row, Col, Container} from 'react-bootstrap';
import useStyles from 'SectionSelector/SectionSelectorStyle.js';
function SectionSelector(props) {
    const classes = useStyles();
    //should I map it in case they add other categories too?
    const lessonTypes = ['PHONICS', 'WORDS', 'WRITING']
    return (
        <div>
            <Container >
            <Box alignItems="flex-end">
            <h1 className = {classes.header}>LESSON TYPE</h1>
            <Row className = {classes.row}>
                <Col>
                <Button
                    classes={{
                        root: classes.button_root,
                        label: classes.button_label,
                    }}>
                        <Row>
                    <img src="images/icon.svg" alt="phonics"/>
                    </Row>
                    <Row>
                    PHONICS
                    </Row>
                </Button>
                </Col>
                <Col>
                <Button
                    classes={{
                        root: classes.button_root,
                        label: classes.button_label,
                    }}>
                        <Row>
                    <img src="images/icon.svg" alt="words"/>
                    </Row>
                    <Row>
                    WORDS
                    </Row>
                </Button>
                </Col>
                <Col>
                <Button
                    classes={{
                        root: classes.button_root,
                        label: classes.button_label,
                    }}>
                        <Row>
                    <img src="images/icon.svg" alt="phonics"/>
                    </Row>
                    <Row>
                    WRITING
                    </Row>
                </Button>
                </Col>
            </Row>
            </Box>
            </Container>
        </div>
    )
}
export default withFirebase(SectionSelector)