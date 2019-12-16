/** @jsx jsx */
import { jsx } from "@emotion/core";
import {useState} from "react";
import { actionCreators } from "../redux/actionCreators";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      marginTop: 10,
      width: 250
    }
  }
}));

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#0C52A7"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#0C52A7"
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#0C52A7"
      }
    }
  }
})(TextField); // ASK MIKE ABOUT THIS SYNTAX

export default function TargetSearch() {
  const classes = useStyles();
  const dispatch = useDispatch();

  /** SELECTOR DEFINITIONS
   * apiTokens    : Object of <targets: tokens> submitted in the current session
   * sourceTarget : Object of the current source selected
   **/
  const apiTokens = useSelector(state => state.authorization.apiTokens);
  const sourceTarget = useSelector(state => state.targets.source);

  /** STATE DEFINITIONS
   * [searchValue, updateSearch] : Search value state
   **/
  const [searchValue, setSearchValue] = useState('');

  const token = apiTokens[sourceTarget.name];

  const submitSearch = (event) => {
    event.preventDefault();
    dispatch(
      actionCreators.resources.removeFromErrorList(
        actionCreators.resources.loadFromSourceTargetSearch.toString()
      )
    );
    dispatch(
      actionCreators.resources.loadFromSourceTargetSearch(
        sourceTarget.name,
        token,
        searchValue
      )
    );
  };

  return (
    <div css={{ marginBottom: 10 }}>
      <form
        onSubmit={event => submitSearch(event)}
        className={classes.root}
        noValidate
        autoComplete="off"
      >
        <CssTextField
          size="small"
          type="text"
          id="outlined-basic"
          label={"Search " + sourceTarget.readable_name}
          variant="outlined"
          value={searchValue}
          onChange={event => setSearchValue(event.target.value)}
        />
      </form>
    </div>
  );
}
