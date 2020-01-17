import { useDispatch, useSelector } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "./modalHeader";
import textStyles from "../../styles/text";
import React, { useEffect, useState } from "react";
import DialogContent from "@material-ui/core/DialogContent";
import Spinner from "../widgets/Spinner";
import FileSaver from "file-saver";
import { actionCreators } from "../../redux/actionCreators";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

export default function DownloadModal({ modalState, setModalState }) {
  const dispatch = useDispatch();

  /** SELECTOR DEFINITIONS
   * sourceDownloadContents : Object representing the blob content returned from the download call
   * sourceDownloadStatus   : String status of the status of the download/
   *                          [null, 'pending', 'successful', 'failure']
   **/
  const sourceDownloadContents = useSelector(
    state => state.resources.sourceDownloadContents
  );
  const sourceDownloadStatus = useSelector(
    state => state.resources.sourceDownloadStatus
  );

  const [modalMessage, setModalMessage] = useState(
    "" +
      "The download is being processed on the server. Please do not leave the page."
  );
  const [egg, setEgg] = useState(`${textStyles.cubsRed}`);

  /**
   * Watch for the sourceDownloadStatus to change to 'failure' or 'success'.
   * If 'failure' then update the modal message
   * If 'success' then use FileSaver to download the file and transition the modal to close.
   **/
  useEffect(() => {
    // Download failed
    if (sourceDownloadStatus === "failure") {
      setEgg(textStyles.cubsRed);
      console.log(egg);
      setModalMessage(
        "Download returned a " +
          sourceDownloadContents.status_code +
          " status code. " +
          sourceDownloadContents.message
      );
    }
    // Download successful
    else if (sourceDownloadStatus === "success") {
      FileSaver.saveAs(sourceDownloadContents, "PresQT_Download.zip");
      setModalState(false);
    }
  }, [sourceDownloadStatus]);

  /**
   *  Close the modal.
   *  Dispatch clearDownloadData to clear download data from state.
   **/
  const handleClose = () => {
    setModalState(false);
    setModalMessage(
      "The download is being processed on the server. Please do not leave the page."
    );
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
          <div>
            {sourceDownloadStatus === 'failure' ? <ErrorOutlineIcon color="error"/> : null}
            <span css={{marginLeft:5}}>{modalMessage}</span>
            {sourceDownloadStatus === "pending" ||
            sourceDownloadStatus === null ? (
              <Spinner />
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  ) : null;
}
