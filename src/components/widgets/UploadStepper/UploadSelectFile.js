/** @jsx jsx */
import Button from "@material-ui/core/Button/Button";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { jsx } from '@emotion/core';
import withStyles from "@material-ui/core/styles/withStyles";

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),

    },
  },
  input: {
    display: 'none',
  },
}));

const CustomButton = withStyles({
  root: {
    backgroundColor: '#0C52A7',
    '&:hover': {
      backgroundColor: '#0a4996',
    },
  },
})(Button);

/**
 * Component for file select input inside of the upload stepper
 **/
export default function UploadSelectFile(props) {
  const classes = useStyles();

  /**
   * When a file is selected, add it to the selectedFile state
   **/
  const onChangeHandler = (file) => {
    props.setSelectedFile(file)
  };

  return (
    <div css={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <div className={classes.root}>
          <input
            accept="application/zip"
            className={classes.input}
            id="contained-button-file"
            type="file"
            onChange={event => onChangeHandler(event.target.files[0])}
          />
          <label htmlFor="contained-button-file">
            <CustomButton
              variant="contained"
              component="span"
              color="primary"
              endIcon={<CloudUploadIcon />}
              onAnimationEnd={(event) => {event.stopPropagation()}}
            >
              Select File
            </CustomButton>
          </label>
        </div>
      <span css={{color: '#696969'}}>{props.selectedFile ? props.selectedFile.name : null}</span>
    </div>
  )
}
