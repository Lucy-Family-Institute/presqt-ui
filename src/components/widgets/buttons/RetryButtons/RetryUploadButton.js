/** @jsx jsx */
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { jsx } from "@emotion/core";
import textStyles from "../../../../styles/text";
import buttonStyles from "../../../../styles/buttons";
import { actionCreators } from "../../../../redux/actionCreators";
import Button from "@material-ui/core/Button/Button";
import CancelButton from "../CancelButton";
import Spinner from "../../spinners/Spinner";

export default function RetryUploadButton({selectedFile, selectedDuplicate,
                                           setStepThreeContent, resourceToUploadTo}) {
  const classes = buttonStyles.RetryUpload();
  const dispatch = useDispatch();

  const targetToken =
    useSelector(state => state.apiTokens[state.selectedTarget.name]);
  const selectedTarget = useSelector(state => state.selectedTarget.name);

  const submitRetry = () => {
    dispatch(actionCreators.upload.clearUploadData());
    dispatch(
      actionCreators.resources.removeFromErrorList(
        actionCreators.upload.uploadToTarget.toString()
      )
    );
    dispatch(
      actionCreators.upload.uploadToTarget(
        selectedTarget,
        selectedFile,
        selectedDuplicate,
        resourceToUploadTo,
        targetToken
      )
    );
    setStepThreeContent();
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
