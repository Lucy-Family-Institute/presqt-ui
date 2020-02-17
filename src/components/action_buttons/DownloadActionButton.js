/** @jsx jsx */
import {Fragment, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { jsx } from "@emotion/core";
import textStyles from "../../styles/text";
import { actionCreators } from "../../redux/actionCreators";
import ActionButton from "../widgets/buttons/ActionButton";

/**
 * This component handles the download action button in the TargetActionsLeft component.
 * It is responsible for dispatching the action that will make the download API call and open
 * a modal to display the download status.
 **/
export default function DownloadActionButton({ disabled }) {
  const dispatch = useDispatch();

  const targetToken = useSelector(state =>
    state.authorization.apiTokens[state.targets.leftTarget.name]);
  const selectedLeftResource = useSelector(state => state.resources.selectedLeftResource);


  /**
   * Open the modal.
   * Dispatch the downloadResource action
   *   -> Saga call to Resource Download occurs here
   *     -> On complete saga dispatches the ResourceDownloadSuccess action
   **/
  const submitDownload = () => {
    dispatch(actionCreators.resources.displayDownloadModal());
    dispatch(actionCreators.resources.downloadResource(selectedLeftResource, targetToken));
  };

  return (
    <Fragment>
      <ActionButton
        elevation={0}
        variant="contained"
        onClick={submitDownload}
        disabled={disabled}
      >
        <span css={textStyles.buttonText}>Download</span>
      </ActionButton>
    </Fragment>
  )
}
