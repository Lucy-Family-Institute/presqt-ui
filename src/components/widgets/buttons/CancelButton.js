/** @jsx jsx */
import { Fragment } from "react";
import { jsx } from "@emotion/core";
import textStyles from "../../../styles/text";
import buttonStyles from "../../../styles/buttons";
import Button from "@material-ui/core/Button/Button";
import {actionCreators} from "../../../redux/actionCreators";
import {useDispatch, useSelector} from "react-redux";

export default function CancelButton({actionType}) {
  const classes = buttonStyles.CancelButton();
  const dispatch = useDispatch();

  const selectedTarget = useSelector(state => state.selectedTarget);
  const ticketNumber = useSelector(state => state.activeTicketNumber);
  const targetToken = useSelector(state => state.apiTokens[selectedTarget.name]);
  const uploadStatus = useSelector(state => state.uploadStatus);
  const downloadStatus = useSelector(state => state.downloadStatus);
  const transferStatus = useSelector(state => state.transferStatus);
  const transferDestinationToken = useSelector(state => state.transferDestinationToken);
  const transferTargetResources = useSelector(state => state.transferTargetResources);

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
    else if (actionType === 'REMOVE_RESOURCE') {
      dispatch(actionCreators.transfer.clearTransferResource());
      dispatch(actionCreators.transfer.deselectTransferResource(transferTargetResources));
    }
  };

  return (
    <Fragment>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={submitCancel}
        disabled={!ticketNumber || uploadStatus === 'cancelSuccess' || transferStatus === 'cancelSuccess' || downloadStatus === 'cancelPending'}
      >
        <span css={textStyles.buttonText}>Cancel</span>
      </Button>
    </Fragment>
  );
}