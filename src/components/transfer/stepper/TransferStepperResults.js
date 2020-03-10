/** @jsx jsx */
import React, { useEffect, useState, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {useDispatch, useSelector} from "react-redux";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { jsx } from '@emotion/core';
import {actionCreators} from "../../../redux/actionCreators";
import colors from "../../../styles/colors";
import CancelButton from "../../widgets/buttons/CancelButton";
import Spinner from "../../widgets/spinners/Spinner";
import TransferStartOverButton from "../TransferStartOverButton";
import TransferRetryButton from "../TransferRetryButton";
import ListSubheader from "@material-ui/core/ListSubheader";
import getError from "../../../utils/getError";


export default function TransferStepperResults({setActiveStep, selectedDuplicate}) {
  const dispatch = useDispatch();

  const transferStatus = useSelector(state => state.transferStatus);
  const transferData = useSelector(state => state.transferData);
  const transferDestinationToken = useSelector(state => state.transferDestinationToken);
  const transferDestinationTarget = useSelector(state => state.transferDestinationTarget);
  const apiOperationErrors = useSelector(state => state.apiOperationErrors);

  const transferError = getError(actionCreators.transfer.transferResource);
  const transferJobError = getError(actionCreators.transfer.transferJob);
  const transferCancelError = getError(actionCreators.transfer.cancelTransfer);

  const [stepThreeContent, setStepThreeContent] = useState(
    <div>
      <div css={{paddingBottom: 15, display: 'flex', justifyContent: 'center'}}>
        The transfer is being processed on the server. If you refresh or leave the page the transfer will still continue.
      </div>
      <Spinner />
      <div css={{paddingTop: 15, display: 'flex', justifyContent: 'center'}}>
        <CancelButton actionType='TRANSFER' />
      </div>
    </div>
  );

  /** Build a list to display warning results **/
  const buildList = (resources, header) => {
    return (
      <List
        dense={true}
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            {header}
          </ListSubheader>
        }
      >
        {
          resources.map(resource => (
            <ListItem>
              <ListItemIcon>
                <ErrorOutlineIcon style={{ color: colors.warningYellow }}/>
              </ListItemIcon>
              <ListItemText
                primary={resource}
              />
            </ListItem>
          ))
        }
      </List>
    )
  };

  /** Build a list item for successful transfer results **/
  const buildListItem = (message) => {
    return (
      <ListItem>
        <ListItemIcon>
          <CheckCircleOutlineIcon
            style={{ color: colors.successGreen }}
          />
        </ListItemIcon>
        <ListItemText
          primary={message}
        />
      </ListItem>
    )
  };

  useEffect(() => {
    // Transfer Successful! Refresh transfer resource browser
    if (transferStatus === 'success') {
      dispatch(actionCreators.transfer.refreshTransferTarget(transferDestinationTarget, transferDestinationToken))
    }
    // Transfer cancelled. Refresh transfer resource browser
    else if (transferStatus === 'cancelSuccess') {
      dispatch(actionCreators.transfer.refreshTransferTarget(transferDestinationTarget, transferDestinationToken));
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
    // Transfer successful and transfer resource browser refreshed!
    else if (transferStatus === 'finished') {
      setStepThreeContent(
        <Grid item md={12}>
            <List dense={true}>
              {buildListItem(transferData.message)}
              {transferData.failed_fixity.length <= 0 ? buildListItem('All files passed fixity checks') : null}
            </List>
            {transferData.failed_fixity.length > 0 ? buildList(transferData.failed_fixity, 'The following files failed fixity checks:') : null}
            {transferData.resources_ignored.length > 0 ? buildList(transferData.resources_ignored, 'The following duplicate resources were ignored:') : null}
            {transferData.resources_updated.length > 0 ? buildList(transferData.resources_updated, 'The following duplicate resources were updated:') : null}
        </Grid>
      );
    }
    // Transfer Failed or cancel finished
    else if (transferStatus === 'failure' || transferStatus === 'cancelled') {
      let errorMessage;
      if (transferStatus === 'cancelled') {
        errorMessage = `${transferData.message}. Some resources may have still be transferred.`
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
            <ErrorOutlineIcon color="error" />
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
              />
            </span>
          </div>
        </Fragment>
      );
    }
  }, [transferStatus, apiOperationErrors]);

  return (stepThreeContent);
}