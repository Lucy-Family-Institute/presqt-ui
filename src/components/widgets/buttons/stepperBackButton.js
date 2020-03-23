/** @jsx jsx */
import Button from "@material-ui/core/Button/Button";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import colors from "../../../styles/colors";
import textStyles from "../../../styles/text";
import {jsx} from "@emotion/core";

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    color: colors.presqtBlue,
    "&:disabled": {
      cursor: 'not-allowed',
      pointerEvents: 'auto'
    }
  }
}));

export default function StepperBackButton({handleBack, activeStep}) {
  const classes = useStyles();

  return(
    <Button
      disabled={activeStep === 0}
      onClick={handleBack}
      color="primary"
      className={classes.button}
    >
      <span css={textStyles.buttonText}>Back</span>
    </Button>
  )
}