import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
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

export default function TransferModal() {
  const dispatch = useDispatch();
  const leftGridClasses = leftGrid();
  const RightGridClasses = RightGrid();

  const transferModalDisplay = useSelector(state => state.resources.transferModalDisplay);
  const selectedResource = useSelector(state => state.resources.selectedResource);
  const transferStatus = useSelector(state => state.resources.transferStatus);

  const [destinationTarget, setDestinationTarget] = useState('');
  const [destinationToken, setDestinationToken] = useState('');

  const handleClose = () => {
    dispatch(actionCreators.resources.hideTransferModal());
    dispatch(actionCreators.resources.clearTransferModalData());
    setDestinationTarget('');
    setDestinationToken('');
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
        disableEscapeKeyDown={transferStatus === 'pending' || transferStatus === 'success'}
      >
        <DialogTitle
          id="form-dialog-title"
          onClose={handleClose}
          disabled={transferStatus === 'pending' || transferStatus === 'success'}
        >
          Transfer Resource: {selectedResource.title}
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={7} className={leftGridClasses.root}>
              <TransferStepper
                  destinationTarget={destinationTarget}
                  setDestinationTarget={setDestinationTarget}
                  destinationToken={destinationToken}
                  setDestinationToken={setDestinationToken}
                />
            </Grid>
            <Grid className={RightGridClasses.root} item xs={5}>
              <TransferResourceBrowser
                destinationTarget={destinationTarget}
                destinationToken={destinationToken}
              />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  : null
}
