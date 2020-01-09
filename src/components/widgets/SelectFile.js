import Button from "@material-ui/core/Button";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

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

export default function SelectFile() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <input
        accept="application/zip"
        className={classes.input}
        id="contained-button-file"
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Select File
        </Button>
      </label>
    </div>
  )
}
