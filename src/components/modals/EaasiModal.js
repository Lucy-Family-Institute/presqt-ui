/** @jsx jsx */
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "./modalHeader";
import DialogContent from "@material-ui/core/DialogContent";
import {jsx} from "@emotion/core";
import {useDispatch, useSelector} from "react-redux";
import React from "react";
import {actionCreators} from "../../redux/actionCreators";

export default function EaasiModal() {
  const dispatch = useDispatch();

  const eaasiModalDisplay = useSelector(state => state.eaasiModalDisplay);

  /**
   *  Close the modal.
   **/
  const handleClose = () => {
    dispatch(actionCreators.eaasi.hideEaasiModal());
  };

  return eaasiModalDisplay ? (
    <div css={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
      <Dialog
        maxWidth="md"
        fullWidth={true}
        open={eaasiModalDisplay}
        onClose={handleClose}
        aria-labelledby={"form-dialog-title"}
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
      >
        <DialogTitle
          id="form-dialog-title"
          onClose={handleClose}
          // disabled={downloadStatus === 'pending' || downloadStatus === 'cancelPending'}
        >
          EaaSI Time, Baby!
        </DialogTitle>
        <DialogContent style={{ padding: 20 }}>
          Eaasi Stuff!
        </DialogContent>
      </Dialog>
    </div>
  ) : null;
}