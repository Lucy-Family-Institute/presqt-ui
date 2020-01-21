/** @jsx jsx */
import { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { jsx } from "@emotion/core";
import textStyles from "../../styles/text";
import { actionCreators } from "../../redux/actionCreators";
import DownloadModal from "../modals/DownloadModal";
import ActionButton from "./ActionButton";
import LeftSpinner from "./LeftSpinner";

/**
 * This component handles the download action button in the TargetActions component.
 * It is responsible for dispatching the action that will make the download API call and open
 * a modal to display the download status.
 **/
export default function RetryActionButton(props) {
  const dispatch = useDispatch();
  let retryText;
  // Maybe lets set the Button text
  if (props.action === 'DOWNLOAD') {
    retryText = 'Retry Download';
  }
  else if (props.action === 'UPLOAD_START_OVER') {
    retryText = 'Start Over';
  }
  else if (props.action === 'UPLOAD') {
    retryText = 'Retry Upload';
  }
  /** SELECTOR DEFINITIONS
   * sourceTargetToken : String user token for the source target
   * selectedInSource  : Object representing the selected resource's details
   **/
  // Download specific Selectors
  const sourceTargetToken = useSelector(
    state => state.authorization.apiTokens[state.targets.source.name]);
  const selectedInSource = useSelector(state => state.resources.selectedInSource);

  // Upload specific Selectors
  const selectedTarget = useSelector(state => state.targets.source.name);


  /**
   * Open the modal.
   * Dispatch the downloadResource action
   *   -> Saga call to Resource Download occurs here
   *     -> On complete saga dispatches the ResourceDownloadSuccess action
   **/
  const submitRetry = () => {
    if (props.action === 'DOWNLOAD') {
      dispatch(actionCreators.resources.clearDownloadData());
      dispatch(actionCreators.resources.removeFromErrorList(
        actionCreators.resources.downloadResource.toString()));
      dispatch(actionCreators.resources.downloadResource(
        selectedInSource, sourceTargetToken));
      props.setModalContent(props.modalDefaultMessage);
    }
    else if (props.action === 'UPLOAD_START_OVER') {
      dispatch(actionCreators.resources.clearUploadData());
      dispatch(actionCreators.resources.removeFromErrorList(
        actionCreators.resources.uploadToSourceTarget.toString()));
      props.setSelectedFile(null);
      props.setActiveStep(0);
    }
    else if (props.action === 'UPLOAD') {
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
    }
  };

  return (
    <Fragment>
      <ActionButton elevation={0} variant="contained" onClick={submitRetry}>
        <span css={textStyles.buttonText}>{retryText}</span>
      </ActionButton>
    </Fragment>
  );
}
