/** @jsx jsx */
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { jsx } from "@emotion/core";
import textStyles from "../../styles/text";
import buttonStyles from "../../styles/buttons";
import { actionCreators } from "../../redux/actionCreators";
import Button from "@material-ui/core/Button/Button";
import Spinner from "../widgets/spinners/Spinner";
import CancelButton from "../widgets/buttons/CancelButton";

export default function TransferRetryButton(
  {destinationTarget, destinationToken, selectedDuplicate, setStepThreeContent}) {
  const classes = buttonStyles.RetryUpload();
  const dispatch = useDispatch();

  const sourceToken =
    useSelector(state => state.authorization.apiTokens[state.targets.selectedTarget.name]);
  const sourceTarget = useSelector(state => state.targets.selectedTarget.name);
  const selectedResource = useSelector(state => state.resources.selectedResource);
  const selectedTransferResource = useSelector(state =>
    state.resources.selectedTransferResource);
  const submitRetry = () => {
    dispatch(actionCreators.resources.clearTransferData());

    dispatch(
      actionCreators.resources.removeFromErrorList(
        actionCreators.resources.transferResource.toString()
      )
    );
    dispatch(
      actionCreators.resources.transferResource(
        destinationTarget,
        destinationToken,
        selectedResource,
        selectedDuplicate,
        selectedTransferResource,
        sourceTarget,
        sourceToken
      )
    );
    setStepThreeContent(
      <div>
        <div css={{paddingBottom: 15, display: 'flex', justifyContent: 'center'}}>The transfer is being processed on the server. If you refresh or leave the page the upload will still continue.</div>
        <Spinner />
        <div css={{paddingTop: 15, display: 'flex', justifyContent: 'center'}}>
          <CancelButton actionType='TRANSFER' destinationToken={destinationToken}/>
        </div>
      </div>
    );
  };

  return (
    <Fragment>
      <Button
        component="span"
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={submitRetry}
      >
        <span css={textStyles.buttonText}>Retry Transfer</span>
      </Button>
    </Fragment>
  );
}
