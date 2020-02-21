/** @jsx jsx */

import { jsx } from "@emotion/core";
import React, {useRef, useState} from "react";
import Grid from "@material-ui/core/Grid";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import withStyles from "@material-ui/core/styles/withStyles";
import colors from "../../styles/colors";
import Button from "@material-ui/core/Button/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const PresQTSplitButton = withStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 35,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: colors.presqtOrange,
    borderTop: `1px solid ${colors.presqtOrange}`,
    borderLeft: `1px solid ${colors.presqtOrange}`,
    borderBottom: `1px solid ${colors.presqtOrange}`,
    color: "white",
    boxShadow: "none",
    transition: "none",
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "#c96d02"
    },
    "&:disabled": {
      backgroundColor: "#D3D3D3",
      border: `1px solid ${"#D3D3D3"}`,
      color: "#696969"
    },
    fontFamily: "Roboto",
    fontWeight: 500,
    fontSize: 12,
    textTransform: "uppercase"
  },
  containedPrimary: {
    backgroundColor: colors.presqtOrange
  }
})(Button);

const PresQTArrowButton = withStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 35,
    width: 20,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: colors.presqtOrange,
    border: `1px solid ${colors.presqtOrange}`,
    color: "white",
    boxShadow: "none",
    transition: "none",
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "#c96d02"
    },
    "&:disabled": {
      backgroundColor: "#D3D3D3",
      border: `1px solid ${"#D3D3D3"}`,
      color: "#696969"
    }
  },
  containedPrimary: {
    backgroundColor: colors.presqtOrange
  }
})(Button);

const PresQTButtonGroup = withStyles({
  'groupedContained': {
    '&:not(:last-child)': {
      borderRight: '1px solid white'
    }
  }
})(ButtonGroup);

export default function TransferActionButton({ disabled }) {
  const options = ['Transfer to Existing', 'Transfer New Resource'];
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleClick = () => {
    console.log('Open da Modal')
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <Grid container direction="column">
      <Grid item xs={12}>
        <PresQTButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
          <PresQTSplitButton disabled={disabled} onClick={handleClick}>{options[selectedIndex]}</PresQTSplitButton>
          <PresQTArrowButton
            disabled={disabled}
            onClick={handleToggle}
          >
            <ArrowDropDownIcon />
          </PresQTArrowButton>
        </PresQTButtonGroup>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({TransitionProps}) => (
            <Grow {...TransitionProps}>
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu">
                    {options.map((option, index) => (
                      <MenuItem
                        key={option}
                        selected={index === selectedIndex}
                        onClick={event => handleMenuItemClick(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Grid>
    </Grid>
  );
}