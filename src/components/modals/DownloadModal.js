/** @jsx jsx */
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "./modalHeader";
import textStyles from "../../styles/text";
import React, { useEffect, useState } from "react";
import DialogContent from "@material-ui/core/DialogContent";
import Spinner from "../widgets/spinners/Spinner";
import FileSaver from "file-saver";
import { actionCreators } from "../../redux/actionCreators";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import {jsx} from "@emotion/core";
import RetryDownloadButton from "../widgets/buttons/RetryButtons/RetryDownloadButton";


const modalDefaultMessage = (
  <div style={textStyles.body}>
    <div css={{paddingBottom: 15}}>The download is being processed on the server. Please do not leave the page.</div>
    <Spinner />
  </div>);

export default function DownloadModal({ modalState, setModalState }) {
  const dispatch = useDispatch();

  const sourceDownloadData = useSelector(state => state.resources.sourceDownloadData);
  const sourceDownloadStatus = useSelector(state => state.resources.sourceDownloadStatus);

  const [modalContent, setModalContent] = useState(modalDefaultMessage);

  /**
   * Watch for the sourceDownloadStatus to change to 'failure' or 'success'.
   * If 'failure' then update the modal message
   * If 'success' then use FileSaver to download the file and transition the modal to close.
   **/
  useEffect(() => {
    // Download failed
    if (sourceDownloadStatus === "failure") {
      const errorMessage = (
        "Download returned a " +
        sourceDownloadData.status_code +
          " status code. " +
        sourceDownloadData.message
      );

      setModalContent(
        <div
          style={textStyles.body}
          css={{paddingTop: 20, paddingBottom: 20, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
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
      setModalState(false);
      dispatch(actionCreators.resources.clearDownloadData());
    }
  }, [sourceDownloadStatus]);

  /**
   *  Close the modal.
   *  Dispatch clearDownloadData to clear download data from state.
   **/
  const handleClose = () => {
    setModalState(false);
    setModalContent(modalDefaultMessage);
    dispatch(actionCreators.resources.clearDownloadData());
    dispatch(
      actionCreators.resources.removeFromErrorList(
        actionCreators.resources.downloadResource.toString()
      )
    );
  };

  return modalState ? (
    <div css={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
      <Dialog
        maxWidth="md"
        fullWidth={true}
        open={modalState}
        onClose={handleClose}
        aria-labelledby={"form-dialog-title"}
      >
        <DialogTitle id="form-dialog-title" onClose={handleClose}>
          {sourceDownloadStatus === "failure"
            ? "Download Failed!"
            : "Download In Progress"}
        </DialogTitle>
        <DialogContent repositionOnUpdate={false} style={{ padding: 20 }}>
            {modalContent}
        </DialogContent>
      </Dialog>
    </div>
  ) : null;
}
