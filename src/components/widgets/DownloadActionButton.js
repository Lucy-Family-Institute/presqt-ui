/** @jsx jsx */
import {Fragment, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { jsx } from "@emotion/core";
import textStyles from "../../styles/text";
import { actionCreators } from "../../redux/actionCreators";
import DownloadModal from "../modals/DownloadModal";
import useModal from "../../hooks/useModal";
import ActionButton from "./ActionButton";

/**
 * This component handles the download action button in the TargetActions component.
 * It is responsible for dispatching the action that will make the download API call and open
 * a modal to display the download status.
 **/
export default function DownloadActionButton() {
  const dispatch = useDispatch();

  /** SELECTOR DEFINITIONS
   * sourceTargetToken : String user token for the source target
   * selectedInSource  : Object representing the selected resource's details
   **/
  const sourceTargetToken = useSelector(state =>
    state.authorization.apiTokens[state.targets.source.name]);
  const selectedInSource = useSelector(state => state.resources.selectedInSource);

  const [modalState, setModalState] = useState(false);

  /**
   * Open the modal.
   * Dispatch the downloadResource action
   *   -> Saga call to Resource Download occurs here
   *     -> On complete saga dispatches the ResourceDownloadSuccess action
   **/
  const submitDownload = () => {
    setModalState(true);
    dispatch(actionCreators.resources.downloadResource(selectedInSource, sourceTargetToken));
  };

  return (
    <Fragment>
      <DownloadModal
        modalState={modalState}
        setModalState={setModalState}
      />

      <ActionButton
        elevation={0}
        variant="contained"
        onClick={submitDownload}
      >
        <span css={textStyles.buttonText}>Download</span>
      </ActionButton>
    </Fragment>
  )
}
