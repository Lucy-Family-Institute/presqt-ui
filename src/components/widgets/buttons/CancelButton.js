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
  const sourceTarget = useSelector(state => state.targets.source);
  const ticketNumber = useSelector(state => state.resources.activeTicketNumber);
  const targetToken = useSelector(state => state.authorization.apiTokens)[sourceTarget.name];
  const uploadStatus = useSelector(state => state.resources.uploadStatus);

  const submitCancel = () => {
    if (actionType === 'DOWNLOAD') {
      dispatch(actionCreators.resources.cancelDownload(ticketNumber, targetToken))
    }
    else if (actionType === 'UPLOAD') {
      dispatch(actionCreators.resources.cancelUpload(ticketNumber, targetToken))
    }
  };

  return (
    <Fragment>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={submitCancel}
        disabled={!ticketNumber || uploadStatus === 'cancelSuccess'}
      >
        <span css={textStyles.buttonText}>Cancel</span>
      </Button>
    </Fragment>
  );
}