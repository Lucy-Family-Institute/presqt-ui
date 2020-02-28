/** @jsx jsx */
import { Fragment } from "react";
import { jsx } from "@emotion/core";
import textStyles from "../../../styles/text";
import buttonStyles from "../../../styles/buttons";
import Button from "@material-ui/core/Button/Button";
import {actionCreators} from "../../../redux/actionCreators";
import {useDispatch, useSelector} from "react-redux";

export default function CancelButton({actionType, destinationToken}) {
  const classes = buttonStyles.CancelButton();
  const dispatch = useDispatch();

  const selectedTarget = useSelector(state => state.targets.selectedTarget);
  const ticketNumber = useSelector(state => state.resources.activeTicketNumber);
  const targetToken = useSelector(state => state.authorization.apiTokens[selectedTarget.name]);
  const uploadStatus = useSelector(state => state.resources.uploadStatus);
  const transferStatus = useSelector(state => state.resources.transferStatus);
  
  const submitCancel = () => {
    if (actionType === 'DOWNLOAD') {
      dispatch(actionCreators.resources.cancelDownload(ticketNumber, targetToken))
    }
    else if (actionType === 'UPLOAD') {
      dispatch(actionCreators.resources.cancelUpload(ticketNumber, targetToken))
    }
    else if (actionType === 'TRANSFER') {
      dispatch(actionCreators.resources.cancelTransfer(ticketNumber, targetToken, destinationToken))
    }
  };

  return (
    <Fragment>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={submitCancel}
        disabled={!ticketNumber || uploadStatus === 'cancelSuccess' || transferStatus === 'cancelSuccess'}
      >
        <span css={textStyles.buttonText}>Cancel</span>
      </Button>
    </Fragment>
  );
}