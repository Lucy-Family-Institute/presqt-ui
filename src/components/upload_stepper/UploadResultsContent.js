/** @jsx jsx */
import React, { useEffect, useState, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {useDispatch, useSelector} from "react-redux";
import LeftSpinner from "../widgets/spinners/LeftSpinner";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { jsx } from '@emotion/core';
import {actionCreators} from "../../redux/actionCreators";
import colors from "../../styles/colors";
import RetryUploadButton from "../widgets/buttons/RetryButtons/RetryUploadButton";
import RetryStartUploadOverButton from "../widgets/buttons/RetryButtons/RetryStartUploadOverButton";
import CancelButton from "../widgets/buttons/CancelButton";

/**
 * This component watches for the upload state to change and then renders the appropriate
 * component to display the results of the upload.
 **/
export default function UploadResultsContent({setActiveStep, setSelectedFile,
                                               selectedFile, selectedDuplicate}) {
  const dispatch = useDispatch();

  const sourceUploadStatus = useSelector(state => state.resources.sourceUploadStatus);
  const sourceUploadData = useSelector(state => state.resources.sourceUploadData);
  const apiOperationErrors = useSelector(state => state.resources.apiOperationErrors);
  const connection = useSelector(state => state.targets.source);
  const token = useSelector(state => state.authorization.apiTokens)[connection.name];

  const uploadError = apiOperationErrors.find(
    element => element.action === actionCreators.resources.uploadToSourceTarget.toString());

  const uploadJobError = apiOperationErrors.find(
    element => element.action === actionCreators.resources.uploadJob.toString());

  const [stepThreeContent, setStepThreeContent] = useState(
    <div>
      <p>The upload is being processed on the server. If you refresh or leave the page the upload will <strong>still</strong> continue.</p>
      <LeftSpinner />
      <div css={{ paddingTop: 15 }}>
      <CancelButton actionType='UPLOAD' />
      </div>
    </div>
  );

  /**
   * Watch for the upload state to change or for an upload error to occur. Once either of these
   * occur, update the state content to the new component that displays the result of the upload.
   **/
  useEffect(() => {
    if (sourceUploadStatus === 'success') {
      dispatch(actionCreators.resources.refreshSourceTarget(connection, token));
    }
    else if (sourceUploadStatus === 'cancelSuccess') {
      dispatch(actionCreators.resources.refreshSourceTarget(connection, token));
      setStepThreeContent(
        <div>
          <p>Upload is being cancelled...</p>
          <LeftSpinner />
          <div css={{ paddingTop: 15 }}>
            <CancelButton actionType='UPLOAD' />
          </div>
        </div>
      )
    }
    else if (sourceUploadStatus === 'finished') {
      const failedFixityMessage = sourceUploadData.failed_fixity.length > 0
        ? <ListItem>
          <ListItemIcon>
            <ErrorOutlineIcon style={{ color: colors.warningYellow }}/>
          </ListItemIcon>
          <ListItemText
            primary={`The following files failed fixity checks: ${sourceUploadData.failed_fixity.join(', ')}`}
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

      const resourcesIgnoredMessage = sourceUploadData.resources_ignored.length > 0
        ? <ListItem>
          <ListItemIcon>
            <ErrorOutlineIcon style={{ color: colors.warningYellow }}/>
          </ListItemIcon>
          <ListItemText
            primary={`The following duplicate resources were ignored: ${sourceUploadData.resources_ignored.join(', ')}`}
          />
        </ListItem>
        : null;

      const resourcesUpdatedMessage = sourceUploadData.resources_updated.length > 0
        ? <ListItem>
          <ListItemIcon>
            <ErrorOutlineIcon style={{ color: colors.warningYellow }}/>
          </ListItemIcon>
          <ListItemText
            primary={`The following duplicate resources were updated: ${sourceUploadData.resources_updated.join(', ')}`}
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
                  primary={sourceUploadData.message}
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
    // Upload Failed!
    else if (sourceUploadStatus === 'failure' || sourceUploadStatus === 'cancelled') {
      let errorMessage;
      if (sourceUploadStatus === 'cancelled') {
        errorMessage = `${sourceUploadData.message}. Some resources may have still be uploaded.`
      }
      // PresQT Upload Post error
      else if (uploadError) {
        errorMessage = `PresQT API returned an error status code ${uploadError.status}: ${uploadError.data}`;
      }
      // PresQT Upload Job error
      else if (uploadJobError) {
        errorMessage = `PresQT API returned an error status code ${uploadJobError.status}: ${uploadJobError.data}`;
      }
      // Target error
      else {
        errorMessage = `The Target returned an error status code ${sourceUploadData.status_code}: ${sourceUploadData.message}`;
      }

      setStepThreeContent(
        <Fragment>
          <Grid item md={12}>
            <div>
              <List dense={true}>
                <ListItem>
                  <ListItemIcon>
                    <ErrorOutlineIcon color="error" />
                  </ListItemIcon>
                  <ListItemText primary={errorMessage} />
                </ListItem>
              </List>
            </div>
          </Grid>
          <div css={{height: 36.5}}>
            <RetryStartUploadOverButton
              setActiveStep={setActiveStep}
              setSelectedFile={setSelectedFile}
            />
            <span css={{ marginLeft: 5 }}>
              <RetryUploadButton
                selectedFile={selectedFile}
                selectedDuplicate={selectedDuplicate}
                setStepThreeContent={setStepThreeContent}
              />
            </span>
          </div>
        </Fragment>
      );
    }
  }, [sourceUploadStatus, apiOperationErrors]);

  return(stepThreeContent)
}