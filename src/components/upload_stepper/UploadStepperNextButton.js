/** @jsx jsx */
import Button from "@material-ui/core/Button/Button";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import colors from "../../styles/colors";
import textStyles from "../../styles/text";
import {jsx} from "@emotion/core";

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    backgroundColor: colors.presqtBlue,
    '&:hover': {
      backgroundColor: '#0a4996',
    },
  }
}));

export default function UploadStepperNextButton({handleNext, activeStep, selectedFile, steps}) {
  const classes = useStyles();

    return(
      <Button
        variant="contained"
        color="primary"
        onClick={handleNext}
        className={classes.button}
        disabled={activeStep === 0 ? !selectedFile : false}

      >
        <span css={textStyles.buttonText}>{activeStep === steps.length - 1 ? 'Finish' : 'Next'}</span>
      </Button>
    )
}
