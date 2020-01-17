/** @jsx jsx */
import React, {useEffect, useState} from 'react';
import { jsx } from '@emotion/core';
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import {useSelector} from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor:'#009639',
    color: 'white'
  },
}));

export default function SnackBar() {
  const classes = useStyles();

  const sourceDownloadStatus = useSelector(state => state.resources.sourceDownloadStatus);
  const sourceUploadStatus = useSelector(state => state.resources.sourceUploadStatus);

  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarText, setSnackBarText] = useState('');

  /**
   * DOWNLOAD
   **/
  useEffect(() => {
    if (sourceDownloadStatus === 'success') {
      setSnackBarOpen(true);
      setSnackBarText('Download Successful!');
    }
  }, [sourceDownloadStatus]);

  /**
   * UPLOAD
   **/
  useEffect(() => {
    if (sourceUploadStatus === 'success') {
      setSnackBarOpen(true);
      setSnackBarText('Upload Successful!');
    }
  }, [sourceUploadStatus]);

  return (
    <Snackbar
      ContentProps={{
        classes: {
          root: classes.root
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
        <IconButton size="small" aria-label="close" color="inherit" onClick={() => {setSnackBarOpen(false)}}>
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    >
    </Snackbar>
  )
}