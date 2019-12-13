/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useState } from "react";
import { actionCreators } from "../redux/actionCreators";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      marginTop: 10,
      width: 250
    }
  }
}));

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
  const [searchValue, setSearchValue] = useState("");

  const token = apiTokens[sourceTarget.name];

  const submitSearch = () => {
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
  })(TextField);

  return (
    <div css={{ marginBottom: 10 }}>
      <form className={classes.root} noValidate autoComplete="off">
        <CssTextField
          color="success"
          size="small"
          type="text"
          id="outlined-basic"
          label={"Search " + sourceTarget.readable_name}
          variant="outlined"
          value={searchValue}
          onChange={event => setSearchValue(event.target.value)}
        />
      </form>
      <Button
        variant="contained"
        color="secondary"
        type="submit"
        onClick={submitSearch}
      >
        Search
      </Button>
      {/* <TextField
        type="text"
        placeholder={"Search all " + sourceTarget.readable_name + " resources"}
        value={searchValue}
        onChange={event => setSearchValue(event.target.value)}
      />*/}
    </div>
  );
}
