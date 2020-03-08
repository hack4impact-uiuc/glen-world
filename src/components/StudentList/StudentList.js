import React, { useState, setState, useEffect } from "react";
import { withFirebase } from "utils/Firebase";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Checkbox, ListItemIcon, Collapse, List, ListSubheader, ListItem, ListItemText} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import useStyles from 'StudentList/StudentListStyles.js';

export default function StudentList(props) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);
  const [open, setOpen] = React.useState(Array(props.deployments.length).fill().map((_, i) => false));
  let deployments = props.deployments

  const handleClick = (index)  => {
    let openCopy = [...open];
    openCopy[index] = !openCopy[index]
    setOpen(openCopy)
  }

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    props.handleChange(newChecked);
  };
  return (
    <div>
      <List>
      {deployments.map((deployment, index) => (   
        <div>           
            <ListItem button onClick={() => handleClick(index)}
            className = {classes.listSection} 
            >
              
              {`${deployment["deploymentId"]}`} 
              {open[index] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={open[index]} timeout="auto" unmountOnExit>
            {deployment["deploymentAccounts"].map((student)=> ( 
              <ListItem
              className = {classes.nested} 
              button onClick={handleToggle(student)}>
                <ListItemIcon>
                  <Checkbox
                    classes={{
                      root: classes.root,
                      checked: classes.checked,
                    }}
                    edge="start"
                    tabIndex={-1}
                    checked={checked.indexOf(student) !== -1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText  primary={`${student}`} />
              </ListItem>            
            ))}
            </Collapse>
          </div>
      ))}
    </List>
    </div>
  );
}