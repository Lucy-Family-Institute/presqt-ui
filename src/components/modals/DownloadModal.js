/** @jsx jsx */
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "./modalHeader";
import React from "react";
import DialogContent from "@material-ui/core/DialogContent";
import { actionCreators } from "../../redux/actionCreators";
import {jsx} from "@emotion/core";
import DownloadStepper from "../download_stepper/DownloadStepper";


export default function DownloadModal() {
  const dispatch = useDispatch();

  const downloadModalDisplay = useSelector(state => state.downloadModalDisplay);
  const downloadStatus = useSelector(state => state.downloadStatus);

  /**
   *  Close the modal.
   *  Dispatch clearDownloadData to clear download data from state.
   **/
  const handleClose = () => {
    dispatch(actionCreators.download.hideDownloadModal());
    dispatch(actionCreators.download.clearDownloadData());
    dispatch(
      actionCreators.resources.removeFromErrorList(
        actionCreators.download.downloadResource.toString()
      )
    );
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
        disableEscapeKeyDown={true}
      >
        <DialogTitle
          id="form-dialog-title"
          onClose={handleClose}
          disabled={downloadStatus === 'pending' || downloadStatus === 'cancelPending'}
        >
          Download Resource
        </DialogTitle>
        <DialogContent style={{ padding: 20 }}>
          <DownloadStepper />
        </DialogContent>
      </Dialog>
    </div>
  ) : null;
}
