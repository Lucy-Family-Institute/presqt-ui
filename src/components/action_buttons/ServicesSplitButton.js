/** @jsx jsx */
import Button from "@material-ui/core/Button/Button";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import React, { Fragment, useRef, useState } from "react";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import withStyles from "@material-ui/core/styles/withStyles";
import colors from "../../styles/colors";
import { useSelector } from "react-redux";
import { actionCreators } from "../../redux/actionCreators";
import { useDispatch } from "react-redux";
import textStyles from "../../styles/text";
import { jsx } from "@emotion/core";

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
      backgroundColor: "#c96d02",
    },
  },
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
      backgroundColor: "#c96d02",
    },
  },
})(Button);

const ServicesButtonGroup = withStyles({
  root: {
    boxShadow: "none",
  },
  groupedContainedPrimary: {
    "&:not(:last-child)": {
      borderRight: "1px solid white",
      borderColor: colors.presqtOrange
    },
  },
})(ButtonGroup);

export default function ServicesSplitButton() {
  const dispatch = useDispatch();

  const services = useSelector(state => state.availableServices);
  const targetToken = useSelector(state => state.selectedTarget
    ? state.apiTokens[state.selectedTarget.name]
    : null);
  const resource = useSelector(state => state.selectedResource);
  const selectedTarget = useSelector(state => state.selectedTarget);
  const searchValue = useSelector(state => state.searchValue);

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [label, setLabel] = useState("Services");

  const handleClick = () => {
    if (selectedIndex !== null) {
      dispatch(actionCreators.services.selectService(services[selectedIndex]));

      if (services[selectedIndex].name === "eaasi") {
        dispatch(actionCreators.eaasi.displayEaasiModal());
      }
      else if (services[selectedIndex].name === "keyword_enhancement") {
        dispatch(actionCreators.keywords.displayKeywordModal());
        dispatch(actionCreators.keywords.getKeywords(resource, targetToken));
      }
      else if (services[selectedIndex].name === "fairshare") {
        dispatch(actionCreators.fairshare.displayFairshareModal());
      }
      else if (services[selectedIndex].name === "fairshake") {
        console.log("HIyaaa");
        dispatch(actionCreators.fairshake.displayFairshakeModal());
      }
    }
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
    setLabel(services[index].readable_name);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <Fragment>
      <ServicesButtonGroup
        variant="contained"
        color="primary"
        ref={anchorRef}
        aria-label="split button"
      >
        <SplitActionButton onClick={handleClick}>
          <span css={textStyles.buttonText}>{label}</span>
        </SplitActionButton>
        <SplitArrowButton
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="services"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </SplitArrowButton>
      </ServicesButtonGroup>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu">
                  {services.map((service, index) => (
                    <MenuItem
                      key={service.readable_name}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                      disabled={
                        (service.name === 'keyword_enhancement' && !selectedTarget.supported_actions.keywords) ||
                        (service.name === 'keyword_enhancement' && !selectedTarget.supported_actions.keywords_upload) ||
                        (service.name === 'keyword_enhancement' && searchValue && searchValue.length > 0) ||
                        (service.name === 'fairshare' && !resource.identifier)
                      }
                    >
                      <span css={textStyles.buttonText}>
                        {service.readable_name}
                      </span>
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
