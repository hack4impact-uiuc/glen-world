import React, { useState, setState, useEffect } from "react";
import { withFirebase } from "utils/Firebase";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {StylesProvider, Checkbox, ListItemIcon, Collapse, List, ListSubheader, ListItem, ListItemText} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { FixedSizeList } from 'react-window';
import 'StudentList/StudentList.css';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
  },
  listSection: {
    backgroundColor: '#00d8a4',
    color: '#e6e6e6',
  },
  ul: {
    backgroundColor: '#e7e4e4',
    padding: 0,
  },
  nested: {
    backgroundColor: '#7f7eff',
    color: '#e6e6e6',
    paddingLeft: theme.spacing(4),
  },
}));

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
            
            <ListItem button onClick={() => handleClick(index)} className= {classes.listSection}>
              {`Class: ${deployment["deploymentId"]}`} 
              {open[index] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={open[index]} timeout="auto" component = 'ListItem' node = 'ListItem' unmountOnExit>
            {deployment["deploymentAccounts"].map((student, open)=> ( 
              <ListItem 
              button onClick={handleToggle(student)}
              className= {classes.nested}
              >
                <ListItemIcon>
                  <Checkbox
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