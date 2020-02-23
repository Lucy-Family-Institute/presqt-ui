import {useDispatch, useSelector} from "react-redux";
import React from "react";
import DialogTitle from "./modalHeader";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import {actionCreators} from "../../redux/actionCreators";
import TransferStepper from "../transfer_stepper/TransferStepper";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
  root: {
    borderRight: 'solid 1px #979797',
  }
}));

export default function TransferModal() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const transferModalDisplay = useSelector(state => state.resources.transferModalDisplay);
  const selectedResource = useSelector(state => state.resources.selectedResource);

  const handleClose = () => {
    dispatch(actionCreators.resources.hideTransferModal());
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
        // disableEscapeKeyDown={uploadStatus === 'pending' || uploadStatus === 'success'}
      >
        <DialogTitle
          id="form-dialog-title"
          onClose={handleClose}
          // disabled={uploadStatus === 'pending' || uploadStatus === 'success'}
        >
          Transfer Resource: {selectedResource.title}
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={6} className={classes.root}>
                <TransferStepper />
            </Grid>
            <Grid item xs={6}>
              Resources Go Here
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  : null
}
