/** @jsx jsx */
import { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { jsx } from "@emotion/core";
import textStyles from "../../../../styles/text";
import buttonStyles from "../../../../styles/buttons";
import { actionCreators } from "../../../../redux/actionCreators";
import Button from "@material-ui/core/Button/Button";
import LeftSpinner from "../../spinners/LeftSpinner";

export default function RetryUploadButton({selectedFile, selectedDuplicate, setStepThreeContent}) {
  const classes = buttonStyles.RetryUpload();
  const dispatch = useDispatch();

  const sourceTargetToken = useSelector(
    state => state.authorization.apiTokens[state.targets.source.name]
  );
  const selectedInSource = useSelector(
    state => state.resources.selectedInSource
  );
  const selectedTarget = useSelector(state => state.targets.source.name);

  const submitRetry = () => {
    dispatch(actionCreators.resources.clearUploadData());
    dispatch(
      actionCreators.resources.removeFromErrorList(
        actionCreators.resources.uploadToSourceTarget.toString()
      )
    );
    dispatch(
      actionCreators.resources.uploadToSourceTarget(
        selectedTarget,
        selectedFile,
        selectedDuplicate,
        selectedInSource,
        sourceTargetToken
      )
    );
    setStepThreeContent(<LeftSpinner />);
  };

  return (
    <Fragment>
      <Button
        component="span"
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={submitRetry}
      >
        <span css={textStyles.buttonText}>Retry Upload</span>
      </Button>
    </Fragment>
  );
}
