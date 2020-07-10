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
import makeStyles from "@material-ui/core/styles/makeStyles";
import colors from "../../styles/colors";

const useStyles = makeStyles(theme => ({
  button: {
    height: "100%",
    marginRight: theme.spacing(1),
    backgroundColor: colors.presqtBlue,
    "&:hover": {
      backgroundColor: colors.presqtBlueHover
    }
  }
}));

export default function TransferRetryButton({selectedDuplicate, setStepThreeContent, selectedKeywordAction, keywordList}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const sourceToken =
    useSelector(state => state.apiTokens[state.selectedTarget.name]);
  const sourceTarget = useSelector(state => state.selectedTarget.name);
  const selectedResource = useSelector(state => state.selectedResource);
  const selectedTransferResource = useSelector(state => state.selectedTransferResource);
  const transferDestinationToken = useSelector(state => state.transferDestinationToken);
  const transferDestinationTarget = useSelector(state => state.transferDestinationTarget);

  const submitRetry = () => {
    dispatch(actionCreators.transfer.clearTransferData());

    dispatch(
      actionCreators.resources.removeFromErrorList(
        actionCreators.transfer.transferResource.toString()
      )
    );
    dispatch(
      actionCreators.transfer.transferResource(
        transferDestinationTarget,
        transferDestinationToken,
        selectedResource,
        selectedDuplicate,
        selectedKeywordAction,
        keywordList,
        selectedTransferResource,
        sourceTarget,
        sourceToken
      )
    );
    setStepThreeContent(
      <div>
        <div css={{paddingBottom: 15, display: 'flex', justifyContent: 'center'}}>
          The transfer is being processed on the server.
        </div>
        <div css={{paddingBottom: 15, display: 'flex', justifyContent: 'center'}}>
          If you refresh or leave the page the transfer will still continue.
        </div>
        <Spinner />
        <div css={{paddingTop: 15, display: 'flex', justifyContent: 'center'}}>
          <CancelButton actionType='TRANSFER' />
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
