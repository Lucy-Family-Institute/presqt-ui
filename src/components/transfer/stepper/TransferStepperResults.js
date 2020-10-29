/** @jsx jsx */
import React, { useEffect, useState, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import {useDispatch, useSelector} from "react-redux";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { jsx } from '@emotion/core';
import {actionCreators} from "../../../redux/actionCreators";
import CancelButton from "../../widgets/buttons/CancelButton";
import Spinner from "../../widgets/spinners/Spinner";
import SpinnerProgress from "../../widgets/spinners/SpinnerProgress";
import TransferStartOverButton from "../TransferStartOverButton";
import TransferRetryButton from "../TransferRetryButton";
import getError from "../../../utils/getError";
import SuccessListItem from "../../widgets/list_items/SuccessListItem";
import WarningList from "../../widgets/list_items/WarningList";
import KeywordTransferList from "../../widgets/list_items/KeywordTransferList";
import FakeSpinner from "../../widgets/spinners/FakeSpinner";
import FAIRshareTransferButton from "../../action_buttons/FAIRshareTransferButton";
import LinkListItem from "../../widgets/list_items/LinkListItem";


export default function TransferStepperResults(
  { setActiveStep, selectedDuplicate, selectedKeywordAction, keywordList, setTransferPageNumber, transferPageNumber, emailValue, selectedFairshareAction }) {
  const dispatch = useDispatch();

  const transferStatus = useSelector(state => state.transferStatus);
  const transferMessage = useSelector(state => state.transferMessage)
  const transferData = useSelector(state => state.transferData);
  const transferDestinationToken = useSelector(state => state.transferDestinationToken);
  const transferDestinationTarget = useSelector(state => state.transferDestinationTarget);
  const apiOperationErrors = useSelector(state => state.apiOperationErrors);
  const selectedTarget = useSelector(state => state.selectedTarget);
  const targetToken = useSelector(state => state.apiTokens[selectedTarget.name]);
  const selectedResource = useSelector(state => state.selectedResource);
  const transferError = getError(actionCreators.transfer.transferResource);
  const transferJobError = getError(actionCreators.transfer.transferJob);
  const transferCancelError = getError(actionCreators.transfer.cancelTransfer);

  const [stepThreeContent, setStepThreeContent] = useState(
    <div>
      <div css={{paddingBottom: 15, display: 'flex', justifyContent: 'center'}}>
        Transfer is being processed on the server.
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

  useEffect(() => {
    // Transfer Successful! Refresh transfer resource browser
    if (transferStatus === 'success') {
      dispatch(actionCreators.resources.selectResource(selectedResource, targetToken));
      dispatch(actionCreators.transfer.refreshTransferTarget(transferDestinationTarget, transferPageNumber, transferDestinationToken));
    }
    // Transfer successful and transfer resource browser refreshed!
    if (transferStatus === 'pending') {
      setStepThreeContent(
        <div>
      <div css={{paddingBottom: 15, display: 'flex', justifyContent: 'center'}}>
        {transferMessage}
      </div>
      <div css={{paddingBottom: 15, display: 'flex', justifyContent: 'center'}}>
        If you refresh or leave the page the transfer will still continue.
      </div>
      {
        transferMessage.includes("processed")
        ? <FakeSpinner />
        : transferMessage.includes("Running FAIRshare Evaluator Service")
          ? <Spinner />
        : <SpinnerProgress action={"TRANSFER"}/>
      }
      <div css={{paddingTop: 15, display: 'flex', justifyContent: 'center'}}>
        <CancelButton actionType='TRANSFER' />
      </div>
    </div>
  );
    }

    else if (transferStatus === 'finished') {
      setStepThreeContent(
        <Grid item md={12}>
          <List dense={true}>
              <LinkListItem message="Click Here for Transferred Resource" url={transferData.link_to_resource} />
              <SuccessListItem message={transferData.message}/>
              {transferData.failed_fixity.length <= 0
                ? <SuccessListItem message='All files passed fixity checks' /> : null}
          </List>
            {transferData.failed_fixity.length > 0
              ? <WarningList resources={transferData.failed_fixity} header='The following files failed fixity checks:' />
              : null}
            {transferData.resources_ignored.length > 0
              ? <WarningList resources={transferData.resources_ignored} header='The following duplicate resources were ignored:' />
              : null}
            {transferData.resources_updated.length > 0
              ? <WarningList resources={transferData.resources_updated} header='The following duplicate resources were updated:' />
              : null}
            {transferData.enhanced_keywords.length > 0
              ? <KeywordTransferList resources={transferData.enhanced_keywords} header="The following keywords have been added:" />
            : null}
          {transferData.fairshare_evaluation_results.length > 1
            ? <FAIRshareTransferButton disabled={false} />
        : null}
        </Grid>
      );
    }
    // Transfer cancelled started
    else if (transferStatus === 'cancelPending') {
      setStepThreeContent(
        <div>
          <div css={{paddingBottom: 15, display: 'flex', justifyContent: 'center'}}>
            Transfer is being cancelled...
          </div>
          <Spinner />
          <div css={{paddingTop: 15, display: 'flex', justifyContent: 'center'}}>
            <CancelButton actionType='TRANSFER' />
          </div>
        </div>
      )
    }
    // Cancel successful. Refresh transfer resource browser
    else if (transferStatus === 'cancelSuccess') {
      dispatch(actionCreators.transfer.refreshTransferTarget(transferDestinationTarget, transferDestinationToken));
    }
    // Cancel Failed!
    else if (transferStatus === 'cancelFailure') {
      setStepThreeContent(
        <div>
          <div css={{paddingBottom: 15, display: 'flex', justifyContent: 'center'}}>
            Cancel Failed! The transfer is continuing.
          </div>
          <div css={{paddingBottom: 15, display: 'flex', justifyContent: 'center'}}>
            If you refresh or leave the page the transfer will still continue.
          </div>
          <Spinner />
          <div css={{paddingTop: 15, display: 'flex', justifyContent: 'center'}}>
            <CancelButton actionType='TRANSFER' />
          </div>
        </div>
      )
    }
    // Transfer Failed or cancel finished
    else if (transferStatus === 'failure' || transferStatus === 'cancelled') {
      let errorMessage;
      if (transferStatus === 'cancelled') {
        errorMessage = `${transferData.message} Some resources may have still been transferred.`
      }
      // PresQT transfer Post error
      else if (transferError) {
        errorMessage = `PresQT API returned an error status code ${transferError.status}: ${transferError.data}`;
      }
      // PresQT transfer Post error
      else if (transferCancelError) {
        errorMessage = `PresQT API returned an error status code ${transferCancelError.status}: ${transferCancelError.data}`;
      }
      // PresQT transfer Job error
      else if (transferJobError) {
        errorMessage = `PresQT API returned an error status code ${transferJobError.status}: ${transferJobError.data}`;
      }
      // Target error
      else {
        errorMessage = `The Target returned an error status code ${transferData.status_code}: ${transferData.message}`;
      }

      setStepThreeContent(
        <Fragment>
          <div
            css={{ paddingTop: 20, paddingBottom: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
          >
            <ErrorOutlineIcon color="error" style={{ minWidth: 56 }} />
            <span css={{ marginLeft: 5 }}>{errorMessage}</span>
          </div>
          <div css={{justifyContent: 'center', display: 'flex'}}
          >
            <TransferStartOverButton
              setActiveStep={setActiveStep}
            />
            <span css={{ marginLeft: 5 }}>
              <TransferRetryButton
                selectedDuplicate={selectedDuplicate}
                setStepThreeContent={setStepThreeContent}
                selectedKeywordAction={selectedKeywordAction}
                keywordList={keywordList}
                emailValue={emailValue}
                selectedFairshareAction={selectedFairshareAction}
              />
            </span>
          </div>
        </Fragment>
      );
    }
  }, [transferStatus, apiOperationErrors, transferMessage]);

  return (stepThreeContent);
}