/** @jsx jsx */
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "./modalHeader";
import DialogContent from "@material-ui/core/DialogContent";
import { jsx } from "@emotion/core";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../redux/actionCreators";
import FAIRshareResultsContent from "../fairshare_stepper/FAIRshareResultsContent";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import colors from "../../styles/colors";
import {useState} from 'react';

const useStyles = makeStyles(theme => ({
  info: {
    backgroundColor: colors.royalBlue,
    color: 'white'
  }
}));

export default function FAIRshareModal() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const apiOperationErrors = useSelector(state => state.apiOperationErrors);
    const fairshareTransferModalDisplay = useSelector(state => state.fairshareTransferModalDisplay);
    const transferData = useSelector(state => state.transferData);
    const [snackBarOpen, setSnackBarOpen] = useState(false);

    const handleClose = () => {
      dispatch(actionCreators.fairshare.hideFairshareTransferModal());
    }
  
    return fairshareTransferModalDisplay ? (
        <div css={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <Dialog
            maxWidth="md"
            fullWidth={true}
            open={fairshareTransferModalDisplay}
            onClose={handleClose}
            aria-labelledby={"form-dialog-title"}
            disableBackdropClick={true}
            disableEscapeKeyDown={true}
          >
            <DialogTitle
              id="form-dialog-title"
              onClose={handleClose}
            >
              FAIRshare Evaluator Service Results
            </DialogTitle>
            <DialogContent style={{ padding: 20 }}>
            {transferData.fairshare_evaluation_results.length > 1
                ? transferData.fairshare_evaluation_results.map((testInfo) => (
                    <FAIRshareResultsContent testInfo={testInfo} />
                ))
                : null}
            </DialogContent>
        </Dialog>
        <Snackbar
          ContentProps={{
            classes: {
              root: classes.info
            }
          }}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
          message="Some FAIRshare tests will show as failures simply because the url is too new."
          open={fairshareTransferModalDisplay ? true : snackBarOpen}
          autoHideDuration={6000}
          onClose={() => {setSnackBarOpen(false)}}
          action={
            <IconButton size="small" aria-label="close" color="inherit" onClick={() =>
            {setSnackBarOpen(false)}}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
        </Snackbar>
        </div>
      ) : null;
}