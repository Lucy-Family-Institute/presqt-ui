/** @jsx jsx */
import {Fragment} from "react";
import { useSelector, useDispatch } from "react-redux";
import { jsx } from "@emotion/core";
import textStyles from "../../styles/text";
import { actionCreators } from "../../redux/actionCreators";
import ActionButton from "../widgets/buttons/ActionButton";

/**
 * This component handles the download action button in the TargetActions component.
 * It is responsible for dispatching the action that will make the download API call and open
 * a modal to display the download status.
 **/
export default function DownloadActionButton({ disabled }) {
  const dispatch = useDispatch();

  const targetToken = useSelector(state =>
    state.apiTokens[state.selectedTarget.name]);
  const selectedResource = useSelector(state => state.selectedResource);


  /**
   * Open the modal.
   * Dispatch the downloadResource action
   **/
  const submitDownload = () => {
    dispatch(actionCreators.download.displayDownloadModal());
    dispatch(actionCreators.download.downloadResource(selectedResource, targetToken));
  };

  return (
      <ActionButton
        elevation={0}
        variant="contained"
        onClick={submitDownload}
        disabled={disabled}
      >
        <span css={textStyles.buttonText}>Download</span>
      </ActionButton>
  )
}
