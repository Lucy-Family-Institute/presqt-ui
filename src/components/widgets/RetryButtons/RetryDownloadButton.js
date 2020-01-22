/** @jsx jsx */
import { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { jsx } from "@emotion/core";
import colors from "../../../styles/colors";
import textStyles from "../../../styles/text";
import { actionCreators } from "../../../redux/actionCreators";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button/Button";

const useStyles = makeStyles(theme => ({
  button: {
    marginRight: theme.spacing(1),
    backgroundColor: colors.presqtBlue,
    '&:hover': {
      backgroundColor: '#0a4996',
    },
  }
}));
/**
 * This component handles the download action button in the TargetActions component.
 * It is responsible for dispatching the action that will make the download API call and open
 * a modal to display the download status.
 **/
export default function RetryDownloadButton(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  /** SELECTOR DEFINITIONS
   * sourceTargetToken : String user token for the source target
   * selectedInSource  : Object representing the selected resource's details
   **/
  // Download specific Selectors
  const sourceTargetToken = useSelector(
    state => state.authorization.apiTokens[state.targets.source.name]);
  const selectedInSource = useSelector(state => state.resources.selectedInSource);

  const submitRetry = () => {
      dispatch(actionCreators.resources.clearDownloadData());
      dispatch(actionCreators.resources.removeFromErrorList(
        actionCreators.resources.downloadResource.toString()));
      dispatch(actionCreators.resources.downloadResource(
        selectedInSource, sourceTargetToken));
      props.setModalContent(props.modalDefaultMessage);
    }

  return (
    <Fragment>
      <Button variant="contained" color="primary" className={classes.button} onClick={submitRetry}>
        <span css={textStyles.buttonText}>Retry Download</span>
      </Button>
    </Fragment>
  );
}