/** @jsx jsx */
import { jsx } from "@emotion/core";
import {Fragment, useState} from "react";
import { actionCreators } from "../redux/actionCreators";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import SearchTextField from "./widgets/text_fields/SearchTextField";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from '@material-ui/icons/Info';
import Grid from "@material-ui/core/Grid";


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

  const selectedTarget = useSelector(state => state.selectedTarget);
  const token = useSelector(state => state.apiTokens)[selectedTarget.name];

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
        selectedTarget.name,
        token,
        searchValue
      )
    );
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
              id="outlined-basic"
              label={`Search ${selectedTarget.readable_name} By Title`}
              variant="outlined"
              value={searchValue}
              onChange={event => setSearchValue(event.target.value)}
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
              style={{ color: '#757575' }}
            />
          </Tooltip>
      </Grid>
    </Grid>
  );
}
