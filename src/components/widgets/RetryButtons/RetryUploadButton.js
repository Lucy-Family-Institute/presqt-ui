/** @jsx jsx */
import { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { jsx } from "@emotion/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import colors from "../../../styles/colors";
import textStyles from "../../../styles/text";
import { actionCreators } from "../../../redux/actionCreators";
import Button from "@material-ui/core/Button/Button";
import LeftSpinner from "../LeftSpinner";

const useStyles = makeStyles(theme => ({
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
      backgroundColor: colors.presqtBlue,
      '&:hover': {
        backgroundColor: '#0a4996',
      },
    }
  }));

export default function RetryUploadButton(props) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const sourceTargetToken = useSelector(
      state => state.authorization.apiTokens[state.targets.source.name]);
    const selectedInSource = useSelector(state => state.resources.selectedInSource);
    const selectedTarget = useSelector(state => state.targets.source.name);
  
    const submitRetry = () => {
        dispatch(actionCreators.resources.clearUploadData());
        dispatch(actionCreators.resources.removeFromErrorList(
          actionCreators.resources.uploadToSourceTarget.toString()));
        dispatch(actionCreators.resources.uploadToSourceTarget(
          selectedTarget,
          props.selectedFile,
          props.selectedDuplicate,
          selectedInSource,
          sourceTargetToken));
        props.setStepThreeContent(<LeftSpinner />);
    };
  
    return (
      <Fragment>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={submitRetry}>
          <span css={textStyles.buttonText}>Retry Upload</span>
        </Button>
      </Fragment>
    );
  }