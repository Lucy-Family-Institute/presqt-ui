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
                                               selectedFile, selectedDuplicate, resourceToUploadTo}) {
  const dispatch = useDispatch();

  const uploadStatus = useSelector(state => state.resources.uploadStatus);
  const uploadData = useSelector(state => state.resources.uploadData);
  const apiOperationErrors = useSelector(state => state.resources.apiOperationErrors);
  const connection = useSelector(state => state.targets.leftTarget);
  const token = useSelector(state => state.authorization.apiTokens)[connection.name];

  const uploadError = apiOperationErrors.find(
    element => element.action === actionCreators.resources.uploadToTarget.toString());

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
    if (uploadStatus === 'success') {
      dispatch(actionCreators.resources.refreshTarget(connection, token));
    }
    else if (uploadStatus === 'cancelSuccess') {
      dispatch(actionCreators.resources.refreshTarget(connection, token));
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
    else if (uploadStatus === 'finished') {
      const failedFixityMessage = uploadData.failed_fixity.length > 0
        ? <ListItem>
          <ListItemIcon>
            <ErrorOutlineIcon style={{ color: colors.warningYellow }}/>
          </ListItemIcon>
          <ListItemText
            primary={`The following files failed fixity checks: ${uploadData.failed_fixity.join(', ')}`}
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

      const resourcesIgnoredMessage = uploadData.resources_ignored.length > 0
        ? <ListItem>
          <ListItemIcon>
            <ErrorOutlineIcon style={{ color: colors.warningYellow }}/>
          </ListItemIcon>
          <ListItemText
            primary={`The following duplicate resources were ignored: ${uploadData.resources_ignored.join(', ')}`}
          />
        </ListItem>
        : null;

      const resourcesUpdatedMessage = uploadData.resources_updated.length > 0
        ? <ListItem>
          <ListItemIcon>
            <ErrorOutlineIcon style={{ color: colors.warningYellow }}/>
          </ListItemIcon>
          <ListItemText
            primary={`The following duplicate resources were updated: ${uploadData.resources_updated.join(', ')}`}
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
                  primary={uploadData.message}
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
    else if (uploadStatus === 'failure' || uploadStatus === 'cancelled') {
      let errorMessage;
      if (uploadStatus === 'cancelled') {
        errorMessage = `${uploadData.message}. Some resources may have still be uploaded.`
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
        errorMessage = `The Target returned an error status code ${uploadData.status_code}: ${uploadData.message}`;
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
                resourceToUploadTo={resourceToUploadTo}
              />
            </span>
          </div>
        </Fragment>
      );
    }
  }, [uploadStatus, apiOperationErrors]);

  return(stepThreeContent)
}