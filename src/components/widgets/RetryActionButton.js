/** @jsx jsx */
import { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { jsx } from "@emotion/core";
import textStyles from "../../styles/text";
import { actionCreators } from "../../redux/actionCreators";
import DownloadModal from "../modals/DownloadModal";
import ActionButton from "./ActionButton";

/**
 * This component handles the download action button in the TargetActions component.
 * It is responsible for dispatching the action that will make the download API call and open
 * a modal to display the download status.
 **/
export default function RetryActionButton(props) {
  const dispatch = useDispatch();
  /** SELECTOR DEFINITIONS
   * sourceTargetToken : String user token for the source target
   * selectedInSource  : Object representing the selected resource's details
   **/
  // Download specific Selectors
  const sourceTargetToken = useSelector(
    state => state.authorization.apiTokens[state.targets.source.name]);
  const selectedInSource = useSelector(state => state.resources.selectedInSource);


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
  };

  return (
    <Fragment>
      <ActionButton elevation={0} variant="contained" onClick={submitRetry}>
        <span css={textStyles.buttonText}>Retry</span>
      </ActionButton>
    </Fragment>
  );
}
