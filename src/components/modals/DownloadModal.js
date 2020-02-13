/** @jsx jsx */
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "./modalHeader";
import React, { useEffect, useState } from "react";
import DialogContent from "@material-ui/core/DialogContent";
import Spinner from "../widgets/spinners/Spinner";
import FileSaver from "file-saver";
import { actionCreators } from "../../redux/actionCreators";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import {jsx} from "@emotion/core";
import RetryDownloadButton from "../widgets/buttons/RetryButtons/RetryDownloadButton";
import CancelButton from "../widgets/buttons/CancelButton";


const modalDefaultMessage = (
  <div>
    <div css={{ paddingBottom: 15 }}>
      <p>The download is being processed on the server.</p>
    </div>
    <Spinner />
    <div css={{paddingTop: 15, paddingBottom: 15, display: 'flex',  justifyContent:'center', alignItems:'center'}}>
      <CancelButton />
    </div>
  </div>);

export default function DownloadModal() {
  const dispatch = useDispatch();

  const sourceDownloadData = useSelector(state => state.resources.sourceDownloadData);
  const sourceDownloadStatus = useSelector(state => state.resources.sourceDownloadStatus);
  const downloadModalDisplay = useSelector(state => state.resources.downloadModalDisplay);
  const apiOperationErrors = useSelector(state => state.resources.apiOperationErrors);
  const downloadStatus = useSelector(state => state.resources.sourceDownloadStatus);

  const [modalContent, setModalContent] = useState(modalDefaultMessage);

  const downloadError = apiOperationErrors.find(
    element => element.action === actionCreators.resources.downloadResource.toString());

  const downloadJobError = apiOperationErrors.find(
    element => element.action === actionCreators.resources.downloadJob.toString());

  /**
   * Watch for the sourceDownloadStatus to change to 'failure' or 'success'.
   * If 'failure' then update the modal message
   * If 'success' then use FileSaver to download the file and transition the modal to close.
   **/
  useEffect(() => {
    // Download failed
    let errorMessage;
    if (sourceDownloadStatus === "failure") {
      if (downloadError) {
        errorMessage = `PresQT API returned an error with status code ${downloadError.status}: ${downloadError.data}`
      }
      else if (downloadJobError) {
        errorMessage = `PresQT API returned an error with status code ${downloadJobError.status}: ${downloadJobError.data}`
      }
      // Target error
      else {
        errorMessage = `The Target returned an error with status code ${sourceDownloadData.status_code}: ${sourceDownloadData.message}`;
      }

      setModalContent(
        <div
          css={{ paddingTop: 20, paddingBottom: 20, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <ErrorOutlineIcon color="error"/>
          <span css={{ marginLeft: 5 }}>{errorMessage}</span>
          <span css={{ marginLeft: 15 }}>
            <RetryDownloadButton
              setModalContent={setModalContent}
              modalDefaultMessage={modalDefaultMessage}
              />
          </span>
        </div>
      )
    }
    // Download successful
    else if (sourceDownloadStatus === "success") {
      FileSaver.saveAs(sourceDownloadData, "PresQT_Download.zip");
      dispatch(actionCreators.resources.hideDownloadModal());
      dispatch(actionCreators.resources.clearDownloadData());
    }
  }, [sourceDownloadStatus]);

  /**
   *  Close the modal.
   *  Dispatch clearDownloadData to clear download data from state.
   **/
  const handleClose = () => {
    dispatch(actionCreators.resources.hideDownloadModal());
    setModalContent(modalDefaultMessage);
    dispatch(actionCreators.resources.clearDownloadData());
    dispatch(
      actionCreators.resources.removeFromErrorList(
        actionCreators.resources.downloadResource.toString()
      )
    );
    dispatch(actionCreators.resources.clearActiveTicketNumber());
  };

  return downloadModalDisplay ? (
    <div css={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
      <Dialog
        maxWidth="md"
        fullWidth={true}
        open={downloadModalDisplay}
        onClose={handleClose}
        aria-labelledby={"form-dialog-title"}
        disableBackdropClick={true}
        disableEscapeKeyDown={downloadStatus === 'pending'}
      >
        <DialogTitle
          id="form-dialog-title"
          onClose={handleClose}
          disabled={downloadStatus === 'pending'}
        >
          {sourceDownloadStatus === "failure"
            ? "Download Failed!"
            : "Download In Progress"}
        </DialogTitle>
        <DialogContent style={{ padding: 20 }}>
            {modalContent}
        </DialogContent>
      </Dialog>
    </div>
  ) : null;
}
