import {useDispatch, useSelector} from "react-redux";
import React from "react";
import DialogTitle from "./modalHeader";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import {actionCreators} from "../../redux/actionCreators";
import TransferStepper from "../transfer/stepper/TransferStepper";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TransferResourceBrowser from "../transfer/TransferResourceBrowser";

const leftGrid = makeStyles(theme => ({
  root: {
    borderRight: 'solid 1px #979797',
  }
}));

const RightGrid = makeStyles(theme => ({
  root: {
    paddingLeft: 25,
  }
}));

const steps = [
  'Select destination target',
  'Input destination target token',
  'Select resource or select nothing to create a new project',
  'Select the action to occur when a duplicate resource is found',
  'Select the keyword action to occur',
  'Initiate transfer',
  'Transfer Results'
];

export default function TransferModal() {
  const dispatch = useDispatch();
  const leftGridClasses = leftGrid();
  const RightGridClasses = RightGrid();

  const transferModalDisplay = useSelector(state => state.transferModalDisplay);
  const selectedResource = useSelector(state => state.selectedResource);
  const transferStatus = useSelector(state => state.transferStatus);

  const handleClose = () => {
    dispatch(actionCreators.transfer.hideTransferModal());
    dispatch(actionCreators.transfer.clearTransferModalData());

    if (steps.length === 8) {
      steps.pop();
    }
  };

  return transferModalDisplay
  ?
    <div>
      <Dialog
        maxWidth="md"
        fullWidth={true}
        open={transferModalDisplay}
        onClose={handleClose}
        aria-labelledby={"form-dialog-title"}
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
      >
        <DialogTitle
          id="form-dialog-title"
          onClose={handleClose}
          disabled={
            transferStatus === 'pending' ||
            transferStatus === 'success' ||
            transferStatus === 'cancelPending' ||
            transferStatus === 'cancelSuccess'}
        >
          Transfer Resource: {selectedResource.title}
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={7} className={leftGridClasses.root}>
              <TransferStepper steps={steps}/>
            </Grid>
            <Grid className={RightGridClasses.root} item xs={5}>
              <TransferResourceBrowser/>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  : null
}
