/** @jsx jsx */
import { jsx } from "@emotion/core";
import {Fragment, useState, useRef} from "react";
import { actionCreators } from "../redux/actionCreators";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import SearchTextField from "./widgets/text_fields/SearchTextField";
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from '@material-ui/icons/Info';
import Grid from "@material-ui/core/Grid";
import SearchIcon from '@material-ui/icons/Search';
import buttons from "../styles/buttons";
import { InputAdornment } from "@material-ui/core";
import RefreshIcon from '@material-ui/icons/Refresh';
import Divider from "@material-ui/core/Divider";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import textStyles from "../styles/text";
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import isSpaces from "../utils/isSpaces";


const useStyles = makeStyles({
  root: {
    "& > *": {
      marginTop: 10,
      width: 250
    }
  },
  divider: {
    height: 28,
    backgroundColor: '#c4c4c4',
    marginRight: 5,
    marginLeft: 5,
    width: 1
  }
});

const parameterTranslator = {
  "title": "Title",
  "general": "No Search Filter",
  "author": "Author",
  "id": "ID"
}

export default function TargetSearch() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const anchorRef = useRef(null);

  const selectedTarget = useSelector(state => state.selectedTarget);
  const token = useSelector(state => state.apiTokens)[selectedTarget.name];
  const choices = selectedTarget.search_parameters

  const [selectedSearchParameter, setSelectedSearchParameter] = useState(choices[0]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [open, setOpen] = useState(false);

  const getLabel = () => {
    if (selectedSearchParameter === 'general') {
      return `Search ${selectedTarget.readable_name}`
    }
    else {
      return `Search ${selectedTarget.readable_name} By ${parameterTranslator[selectedSearchParameter]}`
    }
  };

  const searchKeystroke = (event) => {
    setSearchValue(event.target.value);
    if (open) {
      setOpen(false);
    }
  }
  const submitSearch = (event) => {
    event.preventDefault();

    if (searchValue && !isSpaces(searchValue)) {
      dispatch(
        actionCreators.resources.removeFromErrorList(
          actionCreators.resources.loadFromTargetSearch.toString()
        )
      );
      dispatch(
        actionCreators.resources.loadFromTargetSearch(
          selectedTarget.name, token, searchValue, selectedSearchParameter)
      );
    }
  };

  const refreshResources = (event) => {
    event.preventDefault();
    setSearchValue('');

    dispatch(
      actionCreators.resources.removeFromErrorList(
        actionCreators.resources.loadFromTargetSearch.toString()
      )
    );

    dispatch(actionCreators.resources.loadFromTargetSearch(selectedTarget.name, token, '', 'title'));
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
    setSelectedSearchParameter(choices[index]);
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
    <Grid container spacing={1} alignItems="flex-end">
      <Grid item>
        <div css={{ marginBottom: 10 }}>
          <form
            onSubmit={event => submitSearch(event)}
            className={classes.root}
            noValidate
            autoComplete="off"
          >
            <SearchTextField
              size="small"
              type="text"
              ref={anchorRef}
              id="outlined-basic"
              label={getLabel()}
              variant="outlined"
              value={searchValue}
              onChange={event => searchKeystroke(event)}
              InputProps={{
                style: {
                  paddingRight: 5
                },
                startAdornment: (
                  <InputAdornment position="start">
                    {open
                      ? < ArrowRightIcon
                        css={[buttons.inlineButton]}
                        onClick={handleToggle}
                      />
                      : <ArrowDropDownIcon
                        css={[buttons.inlineButton]}
                        onClick={handleToggle}
                      />
                    }
                    <Popper
                      open={open}
                      anchorEl={anchorRef.current}
                      role={undefined}
                      transition
                      css={{ width: 200 }}
                    >
                      {({ TransitionProps}) => (
                        <Grow
                          {...TransitionProps}
                          style={{
                            transformOrigin: "center top",
                            anchorOrigin: "center bottom"
                          }}
                        >
                          <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                              <MenuList id="split-button-menu">
                                {choices.map((choice, index) => (
                                  <MenuItem
                                    key={choice}
                                    selected={index === selectedIndex}
                                    onClick={event =>
                                      handleMenuItemClick(event, index)
                                    }
                                  >
                                    <span css={textStyles.buttonText}>
                                      {parameterTranslator[choice]}
                                    </span>
                                  </MenuItem>
                                ))}
                              </MenuList>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Popper>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment
                    position='end'
                  >
                    <SearchIcon
                      css={searchValue && !isSpaces(searchValue) ? [buttons.inlineButton] : [buttons.disabledInlineButton]}
                      onClick={event => submitSearch(event, 'search')}
                    />
                    <Divider
                      className={classes.divider}
                      orientation="vertical"
                    />
                    <Tooltip
                      title={searchValue
                        ? "Clear search and refresh user's resources"
                        : "Refresh user's resources"}
                      arrow placement="right"
                    >
                      <RefreshIcon
                        css={[buttons.inlineButton]}
                        onClick={event => refreshResources(event)}
                      />
                    </Tooltip>
                  </InputAdornment>
                )
              }}
            />
          </form>
        </div>
      </Grid>
      <Grid
        style={{marginBottom: 14}}
        item
      >
        <Tooltip
          title={
            <Fragment>
              Only the first page of paginated search results are returned.
              <br />
              If you don't see the desired project try a more specific search.
            </Fragment>
          }
          arrow placement="right">
          <InfoIcon
            style={{ color: '#757575', cursor: 'help' }}
          />
        </Tooltip>
      </Grid>
    </Grid>
  );
}
