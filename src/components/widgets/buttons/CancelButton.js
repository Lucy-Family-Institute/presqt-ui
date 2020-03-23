/** @jsx jsx */
import { jsx } from "@emotion/core";
import textStyles from "../../../styles/text";
import Button from "@material-ui/core/Button/Button";
import {actionCreators} from "../../../redux/actionCreators";
import {useDispatch, useSelector} from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import colors from "../../../styles/colors";

const useStyles = makeStyles(theme => ({
  button: {
    height: "100%",
    backgroundColor: colors.presqtBlue,
    "&:hover": {
      backgroundColor: colors.presqtBlueHover
    },
    "&:disabled": {
      cursor: 'not-allowed',
      pointerEvents: 'auto'
    }
  }
}));

export default function CancelButton({actionType}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const selectedTarget = useSelector(state => state.selectedTarget);
  const ticketNumber = useSelector(state => state.activeTicketNumber);
  const targetToken = useSelector(state => state.apiTokens[selectedTarget.name]);
  const uploadStatus = useSelector(state => state.uploadStatus);
  const downloadStatus = useSelector(state => state.downloadStatus);
  const transferStatus = useSelector(state => state.transferStatus);
  const transferDestinationToken = useSelector(state => state.transferDestinationToken);

  const submitCancel = () => {
    if (actionType === 'DOWNLOAD') {
      dispatch(actionCreators.download.cancelDownload(ticketNumber, targetToken))
    }
    else if (actionType === 'UPLOAD') {
      dispatch(actionCreators.upload.cancelUpload(ticketNumber, targetToken))
    }
    else if (actionType === 'TRANSFER') {
      dispatch(actionCreators.transfer.cancelTransfer(ticketNumber, targetToken, transferDestinationToken))
    }
  };

  return (
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={submitCancel}
        disabled={
          !ticketNumber ||
          uploadStatus === 'cancelPending' ||
          uploadStatus === 'cancelSuccess' ||
          transferStatus === 'cancelPending' ||
          transferStatus === 'cancelSuccess' ||
          downloadStatus === 'cancelPending'}
      >
        <span css={textStyles.buttonText}>Cancel</span>
      </Button>
  );
}