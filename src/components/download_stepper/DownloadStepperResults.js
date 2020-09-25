/** @jsx jsx */
import {Fragment, useEffect, useState} from "react";
import {jsx} from "@emotion/core";
import Spinner from "../widgets/spinners/Spinner";
import SpinnerProgress from "../widgets/spinners/SpinnerProgress";
import FakeSpinner from "../widgets/spinners/FakeSpinner";
import CancelButton from "../widgets/buttons/CancelButton";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import RetryDownloadButton from "../widgets/buttons/RetryButtons/RetryDownloadButton";
import FileSaver from "file-saver";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import SuccessListItem from "../widgets/list_items/SuccessListItem";
import WarningList from "../widgets/list_items/WarningList";
import {useSelector} from "react-redux";
import getError from "../../utils/getError";
import {actionCreators} from "../../redux/actionCreators";

export default function DownloadStepperResults({emailValue}) {
  const downloadData = useSelector(state => state.downloadData);
  const downloadStatus = useSelector(state => state.downloadStatus);
  const downloadMessage = useSelector(state => state.downloadMessage);

  const downloadError = getError(actionCreators.download.downloadResource);
  const downloadJobError = getError(actionCreators.download.downloadJob);

  const [modalContent, setModalContent] = useState(
    <div>
      <div css={{ paddingBottom: 15, display: 'flex',  justifyContent:'center' }}>
        <p>Download is being processed on the server</p>
      </div>
      <Spinner/>
      <div css={{paddingTop: 15, paddingBottom: 15, display: 'flex',  justifyContent:'center'}}>
        <CancelButton actionType='DOWNLOAD' />
      </div>
    </div>
  );

  /**
   * Watch for the downloadStatus to change to 'failure' or 'success'.
   * If 'failure' then update the modal message
   * If 'success' then use FileSaver to download the file and transition the modal to close.
   **/
  useEffect(() => {
    let errorMessage;
    if (downloadStatus === "failure") {
      // Initial download failed
      if (downloadError) {
        errorMessage = `PresQT API returned an error with status code ${downloadError.status}: ${downloadError.data}`
      }
      // Download job failed
      else if (downloadJobError) {
        errorMessage = `PresQT API returned an error with status code ${downloadJobError.status}: ${downloadJobError.data}`
      }
      // Target error
      else {
        errorMessage = `The Target returned an error with status code ${downloadData.status_code}: ${downloadData.message}`;
      }

      setModalContent(
        <Fragment>
          <div
            css={{ paddingTop: 20, paddingBottom: 20, display: 'flex', flexDirection: 'row', alignItems: 'center',  justifyContent: 'center' }}
          >
            <ErrorOutlineIcon color="error"/>
            <span css={{ marginLeft: 5 }}>{errorMessage}</span>
          </div>
          <div css={{justifyContent: 'center', display: 'flex'}}>
            <RetryDownloadButton
              setModalContent={setModalContent}
              emailValue={emailValue}
            />
          </div>
        </Fragment>
      )
    }
    else if (downloadStatus === 'cancelPending') {
      setModalContent(
        <div>
          <div css={{ paddingBottom: 15, display: 'flex',  justifyContent:'center' }}>
            <p>The download is being cancelled.</p>
          </div>
          <Spinner />
          <div css={{paddingTop: 15, paddingBottom: 15, display: 'flex',  justifyContent:'center'}}>
            <CancelButton actionType='DOWNLOAD' />
          </div>
        </div>
      );
    }
    // Cancel Failed!
    else if (downloadStatus === 'cancelFailure') {
      setModalContent(
        <div>
          <div css={{paddingBottom: 15, display: 'flex', justifyContent: 'center'}}>
            Cancel Failed! The download is continuing.
          </div>
          <Spinner />
          <div css={{paddingTop: 15, display: 'flex', justifyContent: 'center'}}>
            <CancelButton actionType='DOWNLOAD' />
          </div>
        </div>
      )
    }
    else if (downloadStatus === 'cancelled') {
      setModalContent(
        <Fragment>
          <div
            css={{ paddingTop: 20, paddingBottom: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <ErrorOutlineIcon color="error"/>
            <span css={{ marginLeft: 5 }}>{downloadData.message}</span>
          </div>
          <div css={{justifyContent: 'center', display: 'flex'}}>
            <RetryDownloadButton
              setModalContent={setModalContent}
            />
          </div>
        </Fragment>
      )
    }
    
    else if (downloadStatus === 'pending') {
      setModalContent(
        <div>
          <div css={{ paddingBottom: 15, display: 'flex',  justifyContent:'center' }}>
            <p>{downloadMessage}</p>
          </div>
          {downloadMessage.includes("processed") ? <FakeSpinner /> : <SpinnerProgress action={"DOWNLOAD"}/>}
          <div css={{paddingTop: 15, paddingBottom: 15, display: 'flex',  justifyContent:'center'}}>
            <CancelButton actionType='DOWNLOAD' />
          </div>
        </div>
      )
    }

    // Download successful
    else if (downloadStatus === "finished") {
      FileSaver.saveAs(downloadData.file, downloadData.zipName);
      setModalContent(
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item md>
            <List dense={true}>
              <SuccessListItem message={downloadData.message}/>
              {downloadData.failedFixity.length <= 0
                ? <SuccessListItem message='All files passed fixity checks' />
                : null
              }
            </List>
            {downloadData.failedFixity.length > 0
              ? <WarningList resources={downloadData.failedFixity}
                             header='The following files failed fixity checks:'/>
              : null}
          </Grid>
        </Grid>
      )
    }
  }, [downloadStatus, downloadMessage]);

  return(modalContent)
}