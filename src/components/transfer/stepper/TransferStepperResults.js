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
import RetryUploadButton from "../../widgets/buttons/RetryButtons/RetryUploadButton";
import RetryStartUploadOverButton from "../../widgets/buttons/RetryButtons/RetryStartUploadOverButton";
import CancelButton from "../../widgets/buttons/CancelButton";
import Spinner from "../../widgets/spinners/Spinner";


export default function TransferStepperResults({destinationTarget, destinationToken}) {
  console.log(destinationTarget);
  console.log(destinationToken);

  const dispatch = useDispatch();

  const transferStatus = useSelector(state => state.resources.transferStatus);
  const transferData = useSelector(state => state.resources.transferData);
  const apiOperationErrors = useSelector(state => state.resources.apiOperationErrors);

  const [stepThreeContent, setStepThreeContent] = useState(
    <div>
      <div css={{paddingBottom: 15, display: 'flex', justifyContent: 'center'}}>
        The transfer is being processed on the server. If you refresh or leave the page the transfer will still continue.
      </div>
      <Spinner />
      <div css={{paddingTop: 15, display: 'flex', justifyContent: 'center'}}>
        <CancelButton actionType='TRANSFER' destinationToken={destinationToken}/>
      </div>
    </div>
  );

  useEffect(() => {
    if (transferStatus === 'success') {
      dispatch(actionCreators.resources.refreshTransferTarget(destinationTarget, destinationToken))
    }
    else if (transferStatus === 'finished') {
      const failedFixityMessage = transferData.failed_fixity.length > 0
        ? <ListItem>
          <ListItemIcon>
            <ErrorOutlineIcon style={{ color: colors.warningYellow }}/>
          </ListItemIcon>
          <ListItemText
            primary={`The following files failed fixity checks: ${transferData.failed_fixity.join(', ')}`}
          />
        </ListItem>
        : <ListItem>
          <ListItemIcon>
            <CheckCircleOutlineIcon style={{ color: colors.successGreen }}/>
          </ListItemIcon>
          <ListItemText
            primary='All files passed fixity checks'
          />
        </ListItem>;

      const resourcesIgnoredMessage = transferData.resources_ignored.length > 0
        ? <ListItem>
          <ListItemIcon>
            <ErrorOutlineIcon style={{ color: colors.warningYellow }}/>
          </ListItemIcon>
          <ListItemText
            primary={`The following duplicate resources were ignored: ${transferData.resources_ignored.join(', ')}`}
          />
        </ListItem>
        : null;

      const resourcesUpdatedMessage = transferData.resources_updated.length > 0
        ? <ListItem>
          <ListItemIcon>
            <ErrorOutlineIcon style={{ color: colors.warningYellow }}/>
          </ListItemIcon>
          <ListItemText
            primary={`The following duplicate resources were updated: ${transferData.resources_updated.join(', ')}`}
          />
        </ListItem>
        : null;

      const successfulMessage = (
        <Grid item md={12}>
          <div>
            <List dense={true}>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon
                    style={{ color: colors.successGreen }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={transferData.message}
                />
              </ListItem>
              {failedFixityMessage}
              {resourcesIgnoredMessage}
              {resourcesUpdatedMessage}
            </List>
          </div>
        </Grid>
      );
      setStepThreeContent(successfulMessage);
    }
    else if (transferStatus === 'cancelSuccess') {
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
    else if (transferStatus === 'failure' || transferStatus === 'cancelled') {
      let errorMessage;
      if (transferStatus === 'cancelled') {
        errorMessage = `${transferData.message}. Some resources may have still be transfered.`
      }
      // PresQT transfer Post error
      else if (transferError) {
        errorMessage = `PresQT API returned an error status code ${transferError.status}: ${transferError.data}`;
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
            <RetryStartUploadOverButton
              setActiveStep={setActiveStep}
              setSelectedFile={setSelectedFile}
            />
            <span css={{ marginLeft: 5 }}>
              <RetryUploadButton
                selectedFile={selectedFile}
                selectedDuplicate={selectedDuplicate}
                setStepThreeContent={setStepThreeContent}
                resourceToUploadTo={resourceToUploadTo}
              />
            </span>
          </div>
        </Fragment>
      );
    }
  }, [transferStatus, apiOperationErrors]);

  return (stepThreeContent);
}