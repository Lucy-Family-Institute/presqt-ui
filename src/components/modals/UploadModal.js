import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "./modalHeader";
import DialogContent from "@material-ui/core/DialogContent";
import React from "react";
import {actionCreators} from "../../redux/actionCreators";
import UploadStepper from "../widgets/UploadStepper/UploadStepper";
import {useDispatch} from "react-redux";

/**
 * This component is responsible for displaying the upload modal content including the stepper.
 **/
export default function UploadModal({ modalState, setModalState, selectedInSource }) {
  const dispatch = useDispatch();

  /**
   * When the 'x' is pressed on the modal clear the upload data, remove the upload error
   * from APIOperationErrors if it exists, and toggle the modal.
   **/
  const handleClose = () => {
    setModalState(false);
    dispatch(actionCreators.resources.clearUploadData());
    dispatch(actionCreators.resources.removeFromErrorList(
      actionCreators.resources.uploadToSourceTarget.toString()));
  };

  return modalState
    ? <div>
      <Dialog maxWidth="md" fullWidth={true} open={modalState} onClose={handleClose} aria-labelledby={"form-dialog-title"}>
        <DialogTitle id="form-dialog-title" onClose={handleClose}>
          Upload Resource
        </DialogTitle>
        <DialogContent>
            <UploadStepper selectedInSource={selectedInSource}/>
        </DialogContent>
      </Dialog>
    </div>
    : null
}