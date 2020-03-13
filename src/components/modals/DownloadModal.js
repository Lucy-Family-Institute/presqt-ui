/** @jsx jsx */
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "./modalHeader";
import React, {Fragment, useEffect} from "react";
import DialogContent from "@material-ui/core/DialogContent";
import Spinner from "../widgets/spinners/Spinner";
import FileSaver from "file-saver";
import { actionCreators } from "../../redux/actionCreators";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import {jsx} from "@emotion/core";
import RetryDownloadButton from "../widgets/buttons/RetryButtons/RetryDownloadButton";
import CancelButton from "../widgets/buttons/CancelButton";
import getError from "../../utils/getError";
import useDefault from "../../hooks/useDefault";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import SuccessListItem from "../widgets/list_items/SuccessListItem";
import WarningList from "../widgets/list_items/WarningList";


export default function DownloadModal() {
  const dispatch = useDispatch();

  const downloadData = useSelector(state => state.downloadData);
  const downloadModalDisplay = useSelector(state => state.downloadModalDisplay);
  const downloadStatus = useSelector(state => state.downloadStatus);

  const downloadError = getError(actionCreators.download.downloadResource);
  const downloadJobError = getError(actionCreators.download.downloadJob);

  const [modalContent, setModalContent] = useDefault(
    <div>
      <div css={{ paddingBottom: 15, display: 'flex',  justifyContent:'center' }}>
        <p>The download is being processed on the server.</p>
      </div>
      <Spinner />
      <div css={{paddingTop: 15, paddingBottom: 15, display: 'flex',  justifyContent:'center'}}>
        <CancelButton actionType='DOWNLOAD' />
      </div>
    </div>
  );
  const [modalHeader, setModalHeader] = useDefault('Download In Progress');

  /**
   * Watch for the downloadStatus to change to 'failure' or 'success'.
   * If 'failure' then update the modal message
   * If 'success' then use FileSaver to download the file and transition the modal to close.
   **/
  useEffect(() => {
    let errorMessage;
    if (downloadStatus === "failure") {
      setModalHeader('Download Failed!');
      // Initial download failed
      if (downloadError) {
        errorMessage = `PresQT API returned an error with status code ${downloadError.status}: ${downloadError.data}`
      }
      // Download job failed
      else if (downloadJobError) {
        errorMessage = `PresQT API returned an error with status code ${downloadJobError.status}: ${downloadJobError.data}`
      }
      // Target error
      else {
        errorMessage = `The Target returned an error with status code ${downloadData.status_code}: ${downloadData.message}`;
      }

      setModalContent(
        <Fragment>
          <div
            css={{ paddingTop: 20, paddingBottom: 20, display: 'flex', flexDirection: 'row', alignItems: 'center',  justifyContent: 'center' }}>
            <ErrorOutlineIcon color="error"/>
              <span css={{ marginLeft: 5 }}>{errorMessage}</span>
          </div>
          <div css={{justifyContent: 'center', display: 'flex'}}>
              <RetryDownloadButton
                setModalContent={setModalContent}
                setModalHeader={setModalHeader}
              />
          </div>
        </Fragment>
      )
    }
    else if (downloadStatus === 'cancelPending') {
      setModalHeader('Download Cancelling');
      setModalContent(
        <div>
          <div css={{ paddingBottom: 15, display: 'flex',  justifyContent:'center' }}>
            <p>The download is being cancelled.</p>
          </div>
          <Spinner />
          <div css={{paddingTop: 15, paddingBottom: 15, display: 'flex',  justifyContent:'center'}}>
            <CancelButton actionType='DOWNLOAD' />
          </div>
        </div>
      );
    }
    // Cancel Failed!
    else if (downloadStatus === 'cancelFailure') {
      setModalHeader('Download In Progress');
      setModalContent(
        <div>
          <div css={{paddingBottom: 15, display: 'flex', justifyContent: 'center'}}>
            Cancel Failed! The download is continuing.
          </div>
          <Spinner />
          <div css={{paddingTop: 15, display: 'flex', justifyContent: 'center'}}>
            <CancelButton actionType='DOWNLOAD' />
          </div>
        </div>
      )
    }
    else if (downloadStatus === 'cancelled') {
      setModalHeader('Download Cancelled');
      setModalContent(
        <Fragment>
          <div
            css={{ paddingTop: 20, paddingBottom: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <ErrorOutlineIcon color="error"/>
            <span css={{ marginLeft: 5 }}>{downloadData.message}</span>
          </div>
          <div css={{justifyContent: 'center', display: 'flex'}}>
              <RetryDownloadButton
                setModalContent={setModalContent}
                setModalHeader={setModalHeader}
              />
          </div>
        </Fragment>
      )
    }

    // Download successful
    else if (downloadStatus === "finished") {
      FileSaver.saveAs(downloadData.file, "PresQT_Download.zip");
      setModalHeader("Download Successful!");
      setModalContent(
        <Grid item md={12}>
          <List dense={true}>
            <SuccessListItem message={downloadData.message}/>
            {downloadData.failedFixity.length <= 0
              ? <SuccessListItem message='All files passed fixity checks' />
              : null
            }
          </List>
          {downloadData.failedFixity.length > 0
            ? <WarningList resources={downloadData.failedFixity}
                           header='The following files failed fixity checks:'/>
            : null}
        </Grid>
      )
    }
  }, [downloadStatus]);

  /**
   *  Close the modal.
   *  Dispatch clearDownloadData to clear download data from state.
   **/
  const handleClose = () => {
    dispatch(actionCreators.download.hideDownloadModal());
    setModalContent();
    dispatch(actionCreators.download.clearDownloadData());
    dispatch(
      actionCreators.resources.removeFromErrorList(
        actionCreators.download.downloadResource.toString()
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
          {modalHeader}
        </DialogTitle>
        <DialogContent style={{ padding: 20 }}>
            {modalContent}
        </DialogContent>
      </Dialog>
    </div>
  ) : null;
}
