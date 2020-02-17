/** @jsx jsx */
import { jsx } from "@emotion/core";
import {useState} from "react";
import { actionCreators } from "../redux/actionCreators";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import SearchTextField from "./widgets/text_fields/SearchTextField";

const useStyles = makeStyles({
  root: {
    "& > *": {
      marginTop: 10,
      width: 250
    }
  }
});

export default function TargetSearch() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const apiTokens = useSelector(state => state.authorization.apiTokens);
  const leftTarget = useSelector(state => state.targets.leftTarget);

  /** STATE DEFINITIONS
   * [searchValue, updateSearch] : Search value state
   **/
  const [searchValue, setSearchValue] = useState('');

  const token = apiTokens[leftTarget.name];

  const submitSearch = (event) => {
    event.preventDefault();
    dispatch(
      actionCreators.resources.removeFromErrorList(
        actionCreators.resources.loadFromTargetSearch.toString()
      )
    );
    dispatch(
      actionCreators.resources.loadFromTargetSearch(
        leftTarget.name,
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
        <SearchTextField
          size="small"
          type="text"
          id="outlined-basic"
          label={"Search " + leftTarget.readable_name}
          variant="outlined"
          value={searchValue}
          onChange={event => setSearchValue(event.target.value)}
        />
      </form>
    </div>
  );
}
