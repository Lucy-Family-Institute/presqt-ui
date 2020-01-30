import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import UploadStepper from "./widgets/UploadStepper/UploadStepper";
import DialogTitle from "./modals/modalHeader";
import {actionCreators} from "../redux/actionCreators";

/**
 * This component is responsible for displaying the upload modal content including the stepper.
 **/
export default function UploadModal()  {
  const dispatch = useDispatch();

  /** SELECTOR DEFINITIONS
   * uploadModalDisplay :
   **/
  const uploadModalDisplay = useSelector(state => state.resources.uploadModalDisplay);
  const uploadType = useSelector(state => state.resources.uploadType);

  /**
   * When the 'x' is pressed on the modal clear the upload data, remove the upload error
   * from APIOperationErrors if it exists, and toggle the modal.
   **/
  const handleClose = () => {
    dispatch(actionCreators.resources.hideUploadModal());
    dispatch(actionCreators.resources.clearUploadData());
    dispatch(actionCreators.resources.removeFromErrorList(
      actionCreators.resources.uploadToSourceTarget.toString())
    )
  };

  let selectedInSource;
  // We want to pass along the resource if the upload is to an existing project
  // or null if the user has pressed the `Create New Project Button`.
  if (uploadType === 'NEW') {
    selectedInSource = null;
  }
  else {
    selectedInSource = useSelector(state => state.resources.selectedInSource);
  }

  console.log(uploadType);
  console.log(selectedInSource);

  return uploadModalDisplay
    ? <div>
      <Dialog maxWidth="md" fullWidth={true} open={uploadModalDisplay} onClose={handleClose} aria-labelledby={"form-dialog-title"}>
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