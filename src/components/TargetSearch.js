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

export default function TargetSearch({side}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const target = useSelector(state => side === 'left'
    ? state.targets.leftTarget : state.targets.rightTarget);
  const token = useSelector(state => state.authorization.apiTokens)[target.name];

  const [searchValue, setSearchValue] = useState('');

  const submitSearch = (event) => {
    event.preventDefault();
    dispatch(
      actionCreators.resources.removeFromErrorList(
        actionCreators.resources.loadFromTargetSearch.toString()
      )
    );
    dispatch(
      actionCreators.resources.loadFromTargetSearch(
        side,
        target.name,
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
          label={"Search " + target.readable_name}
          variant="outlined"
          value={searchValue}
          onChange={event => setSearchValue(event.target.value)}
        />
      </form>
    </div>
  );
}
