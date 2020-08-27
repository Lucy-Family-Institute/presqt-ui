/** @jsx jsx */
import React, { useEffect, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import {useDispatch, useSelector} from "react-redux";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { jsx } from '@emotion/core';
import {actionCreators} from "../../redux/actionCreators";
import RetryUploadButton from "../widgets/buttons/RetryButtons/RetryUploadButton";
import RetryStartUploadOverButton from "../widgets/buttons/RetryButtons/RetryStartUploadOverButton";
import CancelButton from "../widgets/buttons/CancelButton";
import Spinner from "../widgets/spinners/Spinner";
import SpinnerProgress from "../widgets/spinners/SpinnerProgress";
import getError from "../../utils/getError";
import useDefault from "../../hooks/useDefault";
import SuccessListItem from "../widgets/list_items/SuccessListItem";
import WarningList from "../widgets/list_items/WarningList";

/**
 * This component watches for the upload state to change and then renders the appropriate
 * component to display the results of the upload.
 **/
export default function UploadResultsContent({setActiveStep, setSelectedFile,
                                               selectedFile, selectedDuplicate, resourceToUploadTo}) {
  const dispatch = useDispatch();

  const uploadStatus = useSelector(state => state.uploadStatus);
  const uploadMessage = useSelector(state => state.uploadMessage);
  const uploadData = useSelector(state => state.uploadData);
  const connection = useSelector(state => state.selectedTarget);
  const token = useSelector(state => state.apiTokens)[connection.name];
  const apiOperationErrors = useSelector(state => state.apiOperationErrors);

  const uploadError = getError(actionCreators.upload.uploadToTarget);
  const uploadJobError = getError(actionCreators.upload.uploadJob);

  const [stepThreeContent, setStepThreeContent] = useDefault(
    <div>
      <div css={{paddingBottom: 15, display: 'flex', justifyContent: 'center'}}>
        Upload is being processed on the server.
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

  /**
   * Watch for the upload state to change or for an upload error to occur. Once either of these
   * occur, update the state content to the new component that displays the result of the upload.
   **/
  useEffect(() => {
    console.log(uploadStatus);
    // Upload Successful! Refresh resource browser
    if (uploadStatus === 'success') {
      dispatch(actionCreators.resources.refreshTarget(connection, token));
    }
    else if (uploadStatus === 'pending') {
      setStepThreeContent(
        <div>
      <div css={{paddingBottom: 15, display: 'flex', justifyContent: 'center'}}>
        {uploadMessage ? uploadMessage : `Upload is being processed on the server.`}
      </div>
      <div css={{paddingBottom: 15, display: 'flex', justifyContent: 'center'}}>
        If you refresh or leave the page the upload will still continue.
      </div>
          <SpinnerProgress action={"UPLOAD"}/>
      <div css={{paddingTop: 15, display: 'flex', justifyContent: 'center'}}>
        <CancelButton actionType='UPLOAD' />
      </div>
    </div>
      )
    }
    // Upload successful and resource browser refreshed!
    else if (uploadStatus === 'finished') {
      setStepThreeContent(
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item md>
            <List dense={true}>
              <SuccessListItem message={uploadData.message}/>
              {uploadData.failed_fixity.length <= 0
                ? <SuccessListItem message='All files passed fixity checks'/>
                : null}
            </List>
            {uploadData.failed_fixity.length > 0
              ?  <WarningList resources={uploadData.failed_fixity}
                              header='The following files failed fixity checks:'/>
              : null}
            {uploadData.resources_ignored.length > 0
              ?  <WarningList resources={uploadData.resources_ignored}
                              header='The following duplicate resources were ignored:'/>
              : null}
            {uploadData.resources_updated.length > 0
              ?  <WarningList resources={uploadData.resources_updated}
                              header='The following duplicate resources were updated:'/>
              : null}
          </Grid>
        </Grid>
      );
    }
    // Cancel started
    else if (uploadStatus === 'cancelPending') {
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
    // Cancel successful. Refresh resource browser
    else if (uploadStatus === 'cancelSuccess') {
      dispatch(actionCreators.resources.refreshTarget(connection, token));
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
  }, [uploadStatus, uploadMessage, apiOperationErrors]);

  return(stepThreeContent)
}