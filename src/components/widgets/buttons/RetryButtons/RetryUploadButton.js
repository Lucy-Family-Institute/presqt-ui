/** @jsx jsx */
import { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { jsx } from "@emotion/core";
import textStyles from "../../../../styles/text";
import buttonStyles from "../../../../styles/buttons";
import { actionCreators } from "../../../../redux/actionCreators";
import Button from "@material-ui/core/Button/Button";
import LeftSpinner from "../../spinners/LeftSpinner";
import CancelButton from "../CancelButton";

export default function RetryUploadButton({selectedFile, selectedDuplicate,
                                           setStepThreeContent, resourceToUploadTo}) {
  const classes = buttonStyles.RetryUpload();
  const dispatch = useDispatch();

  const leftTargetToken =
    useSelector(state => state.authorization.apiTokens[state.targets.leftTarget.name]);
  const selectedTarget = useSelector(state => state.targets.leftTarget.name);

  const submitRetry = () => {
    dispatch(actionCreators.resources.clearUploadData());
    dispatch(
      actionCreators.resources.removeFromErrorList(
        actionCreators.resources.uploadToTarget.toString()
      )
    );
    dispatch(
      actionCreators.resources.uploadToTarget(
        selectedTarget,
        selectedFile,
        selectedDuplicate,
        resourceToUploadTo,
        leftTargetToken
      )
    );
    setStepThreeContent(
      <div>
        <p>The upload is being processed on the server. If you refresh or leave the page the upload will <strong>still</strong> continue.</p>
        <LeftSpinner />
        <div css={{ paddingTop: 15 }}>
          <CancelButton actionType='UPLOAD' />
        </div>
      </div>
    );
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
