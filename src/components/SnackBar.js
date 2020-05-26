/** @jsx jsx */
import React, {useEffect, useState} from 'react';
import { jsx } from '@emotion/core';
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import {useSelector} from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import colors from "../styles/colors";

const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: colors.successGreen,
    color: 'white'
  },
  failure: {
    backgroundColor: colors.chevelleRed,
    color: 'white'
  }
}));

export default function SnackBar() {
  const classes = useStyles();

  const downloadStatus = useSelector(state => state.downloadStatus);
  const downloadForService = useSelector(state => state.downloadForService);
  const uploadStatus = useSelector(state => state.uploadStatus);
  const transferStatus = useSelector(state => state.transferStatus);
  const githubStatus = useSelector(state => state.githubStatus);
  const githubIssueData = useSelector(state => state.githubIssueData);
  const eaasiProposalStatus = useSelector(state => state.eaasiProposalStatus);
  const keywordStatus = useSelector(state => state.keywordStatus);

  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarText, setSnackBarText] = useState('');
  const [snackBarClass, setSnackBarClass] = useState('');

  /**
   * DOWNLOAD
   **/
  useEffect(() => {
    if (!downloadForService) {
      if (downloadStatus === 'success') {
        setSnackBarOpen(true);
        setSnackBarText('Download Successful!');
        setSnackBarClass(classes.success);
      }
      else if (downloadStatus === 'failure') {
        setSnackBarOpen(true);
        setSnackBarText('Download Failed!');
        setSnackBarClass(classes.failure);
      }
      else if (downloadStatus === 'cancelled') {
        setSnackBarOpen(true);
        setSnackBarText('Download Cancelled!');
        setSnackBarClass(classes.failure);
      }
    }
  }, [downloadStatus]);

  /**
   * UPLOAD
   **/
  useEffect(() => {
    if (uploadStatus === 'finished') {
      setSnackBarOpen(true);
      setSnackBarText('Upload Successful!');
      setSnackBarClass(classes.success);
    }
    else if (uploadStatus === 'failure') {
      setSnackBarOpen(true);
      setSnackBarText('Upload Failed!');
      setSnackBarClass(classes.failure);
    }
    else if (uploadStatus === 'cancelled') {
      setSnackBarOpen(true);
      setSnackBarText('Upload Cancelled!');
      setSnackBarClass(classes.failure);
    }
  }, [uploadStatus]);

  /**
   * TRANSFER
   **/
  useEffect(() => {
    if (transferStatus === 'finished') {
      setSnackBarOpen(true);
      setSnackBarText('Transfer Successful!');
      setSnackBarClass(classes.success);
    }
    else if (transferStatus === 'failure') {
      setSnackBarOpen(true);
      setSnackBarText('Transfer Failed!');
      setSnackBarClass(classes.failure);
    }
    else if (transferStatus === 'cancelled') {
      setSnackBarOpen(true);
      setSnackBarText('Transfer Cancelled!');
      setSnackBarClass(classes.failure);
    }
  }, [transferStatus]);

  /**
   * GITHUB ISSUE
   **/
  useEffect(() => {
    if (githubStatus === 'success') {
      setSnackBarOpen(true);
      setSnackBarText(`Issue #${githubIssueData.number} Created Successfully`);
      setSnackBarClass(classes.success);
    }
    else if (githubStatus === 'failure') {
      setSnackBarOpen(true);
      setSnackBarText('GitHub Issue Failed to Create');
      setSnackBarClass(classes.failure);
    }
  }, [githubStatus]);

  /**
   * EAASI SERVICE
   **/
  useEffect(() => {
    if (eaasiProposalStatus === 'getFinished') {
      setSnackBarOpen(true);
      setSnackBarText(`EaaSI Proposal Created Successfully`);
      setSnackBarClass(classes.success);
    }
    else if (eaasiProposalStatus === 'getFailure' || eaasiProposalStatus === 'postFailure') {
      setSnackBarOpen(true);
      setSnackBarText('EaaSI Proposal Failed to Create');
      setSnackBarClass(classes.failure);
    }
  }, [eaasiProposalStatus]);

   /**
   * KEYWORD SERVICE
   **/ 
  useEffect(() => {
    if (keywordStatus === 'postSuccess') {
      setSnackBarOpen(true);
      setSnackBarText(`Keywords Enhanced Successfully`);
      setSnackBarClass(classes.success);
    }
    else if (keywordStatus === 'postFaiure') {
      setSnackBarOpen(true);
      setSnackBarText('Keywords Failed to Enhance');
      setSnackBarClass(classes.failure);
    }
  }, [keywordStatus]);

  return (
    <Snackbar
      ContentProps={{
        classes: {
          root: snackBarClass
        }
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      message={snackBarText}
      open={snackBarOpen}
      autoHideDuration={6000}
      onClose={() => {setSnackBarOpen(false)}}
      action={
        <IconButton size="small" aria-label="close" color="inherit" onClick={() =>
        {setSnackBarOpen(false)}}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    >
    </Snackbar>
  )
}