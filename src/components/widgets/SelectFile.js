/** @jsx jsx */
import Button from "@material-ui/core/Button";
import React, {Fragment} from "react";
import { makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { jsx } from '@emotion/core';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      backgroundColor: '#0C52A7'
    },
  },
  input: {
    display: 'none',
  },
}));

export default function SelectFile(props) {
  const classes = useStyles();

  const onChangeHandler = (file) => {
    props.setFileSelected(file)
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
            <Button
              variant="contained"
              color="primary"
              component="span"
              endIcon={<CloudUploadIcon />}
              onAnimationEnd={(event) => {event.stopPropagation()}}
            >
              Select File
            </Button>
          </label>
        </div>
        <span css={{color: '#696969'}}>{props.fileSelected ? props.fileSelected.name : null}</span>
    </div>
  )
}
