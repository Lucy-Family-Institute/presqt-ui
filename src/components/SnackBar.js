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

  const sourceDownloadStatus = useSelector(state => state.resources.sourceDownloadStatus);
  const sourceUploadStatus = useSelector(state => state.resources.sourceUploadStatus);

  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarText, setSnackBarText] = useState('');
  const [snackBarClass, setSnackBarClass] = useState('');

  /**
   * DOWNLOAD
   **/
  useEffect(() => {
    if (sourceDownloadStatus === 'success') {
      setSnackBarOpen(true);
      setSnackBarText('Download Successful!');
      setSnackBarClass(classes.success);
    }
    else if (sourceDownloadStatus === 'failure') {
      setSnackBarOpen(true);
      setSnackBarText('Download Failed!');
      setSnackBarClass(classes.failure);
    }
  }, [sourceDownloadStatus]);

  /**
   * UPLOAD
   **/
  useEffect(() => {
    if (sourceUploadStatus === 'finished') {
      setSnackBarOpen(true);
      setSnackBarText('Upload Successful!');
      setSnackBarClass(classes.success);
    }
    else if (sourceUploadStatus === 'failure') {
      setSnackBarOpen(true);
      setSnackBarText('Upload Failed!');
      setSnackBarClass(classes.failure);
    }
  }, [sourceUploadStatus]);

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