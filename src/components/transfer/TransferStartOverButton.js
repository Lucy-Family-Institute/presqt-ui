/** @jsx jsx */
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { jsx } from "@emotion/core";
import buttonStyles from "../../styles/buttons";
import { actionCreators } from "../../redux/actionCreators";
import Button from "@material-ui/core/Button/Button";
import textStyles from "../../styles/text";

export default function TransferStartOverButton(
  {setActiveStep, setDestinationTarget, setDestinationToken}) {
  const classes = buttonStyles.RetryStartUploadOver();
  const dispatch = useDispatch();

  const submitRetry = () => {
    dispatch(actionCreators.resources.clearTransferModalData());
    setDestinationTarget('');
    setDestinationToken('');
    dispatch(
      actionCreators.resources.removeFromErrorList(
        actionCreators.resources.transferResource.toString()
      )
    );
    setActiveStep(0);
  };

  return (
    <Fragment>
      <Button color="primary" onClick={submitRetry} className={classes.button}>
        <span css={textStyles.buttonText}>Start Over</span>
      </Button>
    </Fragment>
  );
}
