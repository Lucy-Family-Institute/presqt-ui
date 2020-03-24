import Button from "@material-ui/core/Button";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import React, {Fragment, useRef, useState,} from "react";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import withStyles from "@material-ui/core/styles/withStyles";
import colors from "../../../styles/colors";

const options = ['EaaSI', 'IIIF'];

const SplitActionButton = withStyles({
  root: {
    height: 35,
    backgroundColor: colors.presqtOrange,
    border: `1px solid ${colors.presqtOrange}`,
    color: "white",
    transition: "none",
    boxShadow: "none",
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "#c96d02"
    }
  }
})(Button);

const SplitArrowButton = withStyles({
  root: {
    height: 35,
    backgroundColor: colors.presqtOrange,
    width: 30,
    minWidth: 30,
    border: `1px solid ${colors.presqtOrange}`,
    color: "white",
    transition: "none",
    boxShadow: "none",
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "#c96d02"
    }
  }
})(Button);

const ServicesButtonGroup = withStyles({
  root: {
    boxShadow: "none"
  },
  groupedContainedPrimary: {
    "&:not(:last-child)": {
      borderRight: "1px solid white"
    }
  }
})(ButtonGroup);

export default function ServicesSplitButton() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [label, setLabel] = useState('Services');

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
    setLabel(options[index])
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <Fragment>
        <ServicesButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">
          <SplitActionButton
            onClick={handleClick}
          >{
            label}
          </SplitActionButton>
          <SplitArrowButton
            size="small"
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-label="services"
            aria-haspopup="menu"
            onClick={handleToggle}
          >
            <ArrowDropDownIcon />
          </SplitArrowButton>
        </ServicesButtonGroup>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
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
    </Fragment>
  );
}