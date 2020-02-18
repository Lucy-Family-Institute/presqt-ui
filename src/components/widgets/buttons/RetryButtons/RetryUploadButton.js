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

  const sideSelected = useSelector(state => state.resources.sideSelected);
  const targetSelected = useSelector(state => sideSelected === 'left'
    ? state.targets.leftTarget : state.targets.rightTarget).name;
  const targetToken =
    useSelector(state => state.authorization.apiTokens[targetSelected]);

  const submitRetry = () => {
    dispatch(actionCreators.resources.clearUploadData());
    dispatch(
      actionCreators.resources.removeFromErrorList(
        actionCreators.resources.uploadToTarget.toString()
      )
    );
    dispatch(
      actionCreators.resources.uploadToTarget(
        targetSelected,
        selectedFile,
        selectedDuplicate,
        resourceToUploadTo,
        targetToken
      )
    );
    setStepThreeContent(
      <div>
        <p>The upload is being processed on the server. If you refresh or leave the page the upload will <strong>still</strong> continue.</p>
        <LeftSpinner />
        <div css={{ paddingTop: 15 }}>
          <CancelButton side={sideSelected} actionType='UPLOAD' />
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
