/** @jsx jsx */
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "./modalHeader";
import React, {Fragment, useEffect, useState} from "react";
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
    <div css={{ paddingBottom: 15, display: 'flex',  justifyContent:'center' }}>
      <p>The download is being processed on the server.</p>
    </div>
    <Spinner />
    <div css={{paddingTop: 15, paddingBottom: 15, display: 'flex',  justifyContent:'center'}}>
      <CancelButton actionType='DOWNLOAD' />
    </div>
  </div>);

export default function DownloadModal() {
  const dispatch = useDispatch();

  const downloadData = useSelector(state => state.resources.downloadData);
  const downloadModalDisplay = useSelector(state => state.resources.downloadModalDisplay);
  const apiOperationErrors = useSelector(state => state.resources.apiOperationErrors);
  const downloadStatus = useSelector(state => state.resources.downloadStatus);

  const [modalContent, setModalContent] = useState(modalDefaultMessage);

  const downloadError = apiOperationErrors.find(
    element => element.action === actionCreators.resources.downloadResource.toString());

  const downloadJobError = apiOperationErrors.find(
    element => element.action === actionCreators.resources.downloadJob.toString());

  /**
   * Watch for the downloadStatus to change to 'failure' or 'success'.
   * If 'failure' then update the modal message
   * If 'success' then use FileSaver to download the file and transition the modal to close.
   **/
  useEffect(() => {
    // Download failed
    let errorMessage;
    if (downloadStatus === "failure") {
      if (downloadError) {
        errorMessage = `PresQT API returned an error with status code ${downloadError.status}: ${downloadError.data}`
      } else if (downloadJobError) {
        errorMessage = `PresQT API returned an error with status code ${downloadJobError.status}: ${downloadJobError.data}`
      }
      // Target error
      else {
        errorMessage = `The Target returned an error with status code ${downloadData.status_code}: ${downloadData.message}`;
      }

      setModalContent(
        <Fragment>
          <div
            css={{ paddingTop: 20, paddingBottom: 20, display: 'flex', flexDirection: 'row', alignItems: 'center',  justifyContent: 'center' }}>              <ErrorOutlineIcon color="error"/>
              <span css={{ marginLeft: 5 }}>{errorMessage}</span>
          </div>
          <div css={{justifyContent: 'center', display: 'flex'}}>
              <RetryDownloadButton
                setModalContent={setModalContent}
                modalDefaultMessage={modalDefaultMessage}
              />
          </div>
        </Fragment>

      )
    }
    else if (downloadStatus === 'cancelled') {
      setModalContent(
        <Fragment>
          <div
            css={{ paddingTop: 20, paddingBottom: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>              <ErrorOutlineIcon color="error"/>
              <span css={{ marginLeft: 5 }}>{downloadData.message}</span>
          </div>
          <div css={{justifyContent: 'center', display: 'flex'}}>
              <RetryDownloadButton
                setModalContent={setModalContent}
                modalDefaultMessage={modalDefaultMessage}
              />
          </div>
        </Fragment>
      )
    }

    // Download successful
    else if (downloadStatus === "success") {
      FileSaver.saveAs(downloadData, "PresQT_Download.zip");
      dispatch(actionCreators.resources.hideDownloadModal());
      dispatch(actionCreators.resources.clearDownloadData());
    }
  }, [downloadStatus]);

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
          {downloadStatus === "failure"
            ? "Download Failed!"
            : downloadStatus === "cancelled"
            ? "Download Cancelled"
            : "Download In Progress"}
        </DialogTitle>
        <DialogContent style={{ padding: 20 }}>
            {modalContent}
        </DialogContent>
      </Dialog>
    </div>
  ) : null;
}
