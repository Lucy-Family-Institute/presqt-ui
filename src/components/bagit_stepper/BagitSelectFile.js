/** @jsx jsx */
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import textStyles from "../../styles/text";
import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import withStyles from "@material-ui/core/styles/withStyles";
import colors from "../../styles/colors";
import Button from "@material-ui/core/Button/Button";
import {jsx} from "@emotion/core";
import Grid from "@material-ui/core/Grid";
import {useDispatch} from "react-redux";
import {actionCreators} from "../../redux/actionCreators";

const CustomUploadButton = withStyles({
  root: {
    backgroundColor: colors.presqtBlue,
    '&:hover': {
      backgroundColor: '#0a4996',
    },
  },
})(Button);

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
    backgroundColor: colors.presqtBlue,
    '&:hover': {
      backgroundColor: '#0a4996',
    },
  },
})(Button);

export default function BagitSelectFile({setActiveStep, setSelectedFile, selectedFile}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const submitUpload = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
    dispatch(actionCreators.bagit.submitBagitFile(selectedFile));
  };

  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="flex-start"
    >
      <Grid>
        <input
          accept="application/zip"
          className={classes.input}
          id="contained-button-file"
          type="file"
          onChange={event => setSelectedFile(event.target.files[0])}
        />
        <label htmlFor="contained-button-file">
          <CustomButton
            variant="contained"
            component="span"
            color="primary"
            endIcon={<CloudUploadIcon />}
            onAnimationEnd={(event) => {event.stopPropagation()}}
          >
            <span css={textStyles.buttonText}>Select File</span>
          </CustomButton>
        </label>
        <span css={{color: '#696969', marginLeft: 5}}>{selectedFile ? selectedFile.name : null}</span>
      </Grid>
      <Grid
      css={{marginTop: 10}}>
        <CustomUploadButton
          onClick={submitUpload}
          variant="contained"
          color="primary"
        >
          <span css={textStyles.buttonText}>Upload File</span>
        </CustomUploadButton>
      </Grid>
    </Grid>

  )
}