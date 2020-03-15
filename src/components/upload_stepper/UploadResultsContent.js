/** @jsx jsx */
import React, { useEffect, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {useDispatch, useSelector} from "react-redux";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { jsx } from '@emotion/core';
import {actionCreators} from "../../redux/actionCreators";
import colors from "../../styles/colors";
import RetryUploadButton from "../widgets/buttons/RetryButtons/RetryUploadButton";
import RetryStartUploadOverButton from "../widgets/buttons/RetryButtons/RetryStartUploadOverButton";
import CancelButton from "../widgets/buttons/CancelButton";
import Spinner from "../widgets/spinners/Spinner";
import ListSubheader from "@material-ui/core/ListSubheader";
import getError from "../../utils/getError";
import useDefault from "../../hooks/useDefault";

/**
 * This component watches for the upload state to change and then renders the appropriate
 * component to display the results of the upload.
 **/
export default function UploadResultsContent({setActiveStep, setSelectedFile,
                                               selectedFile, selectedDuplicate, resourceToUploadTo}) {
  const dispatch = useDispatch();

  const uploadStatus = useSelector(state => state.uploadStatus);
  const uploadData = useSelector(state => state.uploadData);
  const connection = useSelector(state => state.selectedTarget);
  const token = useSelector(state => state.apiTokens)[connection.name];
  const apiOperationErrors = useSelector(state => state.apiOperationErrors);

  const uploadError = getError(actionCreators.upload.uploadToTarget);
  const uploadJobError = getError(actionCreators.upload.uploadJob);

  const [stepThreeContent, setStepThreeContent] = useDefault(
    <div>
      <div css={{paddingBottom: 15, display: 'flex', justifyContent: 'center'}}>
        The upload is being processed on the server.
      </div>
      <div css={{paddingBottom: 15, display: 'flex', justifyContent: 'center'}}>
        If you refresh or leave the page the upload will still continue.
      </div>
      <Spinner />
      <div css={{paddingTop: 15, display: 'flex', justifyContent: 'center'}}>
        <CancelButton actionType='UPLOAD' />
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
            <ListItem key={resource}>
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

  /** Build a list item for successful upload results **/
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

  /**
   * Watch for the upload state to change or for an upload error to occur. Once either of these
   * occur, update the state content to the new component that displays the result of the upload.
   **/
  useEffect(() => {
    // Upload Successful! Refresh resource browser
    if (uploadStatus === 'success') {
      dispatch(actionCreators.resources.refreshTarget(connection, token));
    }
    // Upload cancelled. Refresh resource browser
    else if (uploadStatus === 'cancelSuccess') {
      dispatch(actionCreators.resources.refreshTarget(connection, token));
      setStepThreeContent(
        <div>
          <div css={{paddingBottom: 15, display: 'flex', justifyContent: 'center'}}>
            Upload is being cancelled...
          </div>
          <Spinner />
          <div css={{paddingTop: 15, display: 'flex', justifyContent: 'center'}}>
            <CancelButton actionType='UPLOAD' />
          </div>
        </div>
      )
    }
    // Cancel Failed!
    else if (uploadStatus === 'cancelFailure') {
      setStepThreeContent(
        <div>
          <div css={{paddingBottom: 15, display: 'flex', justifyContent: 'center'}}>
            Cancel Failed! The upload is continuing.
          </div>
          <div css={{paddingBottom: 15, display: 'flex', justifyContent: 'center'}}>
            If you refresh or leave the page the upload will still continue.
          </div>
          <Spinner />
          <div css={{paddingTop: 15, display: 'flex', justifyContent: 'center'}}>
            <CancelButton actionType='UPLOAD' />
          </div>
        </div>
      )
    }
    // Upload successful and resource browser refreshed!
    else if (uploadStatus === 'finished') {
      setStepThreeContent(
        <Grid container>
          <Grid container md={2}></Grid>
          <Grid container md={8}>
            <List dense={true}>
              {buildListItem(uploadData.message)}
              {uploadData.failed_fixity.length <= 0 ? buildListItem('All files passed fixity checks') : null}
            </List>
            {uploadData.failed_fixity.length > 0 ? buildList(uploadData.failed_fixity, 'The following files failed fixity checks:') : null}
            {uploadData.resources_ignored.length > 0 ? buildList(uploadData.resources_ignored, 'The following duplicate resources were ignored:') : null}
            {uploadData.resources_updated.length > 0 ? buildList(uploadData.resources_updated, 'The following duplicate resources were updated:') : null}
          </Grid>
          <Grid container md={2}></Grid>
        </Grid>
      );
    }
    // Upload Failed or cancel finished
    else if (uploadStatus === 'failure' || uploadStatus === 'cancelled') {
      let errorMessage;
      if (uploadStatus === 'cancelled') {
        errorMessage = `${uploadData.message}. Some resources may have still been uploaded.`
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
          <div
            css={{ paddingTop: 20, paddingBottom: 20, display: 'flex',
                   flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
          >
            <ErrorOutlineIcon color="error" style={{ minWidth: 56 }} />
            {errorMessage}
          </div>
          <div
            css={{justifyContent: 'center', display: 'flex'}}
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
  }, [uploadStatus, apiOperationErrors]);

  return(stepThreeContent)
}