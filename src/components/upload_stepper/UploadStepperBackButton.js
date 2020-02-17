import Button from "@material-ui/core/Button/Button";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import colors from "../../styles/colors";

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    color: colors.presqtBlue
  }
}));

export default function UploadStepperBackButton({handleBack, activeStep}) {
  const classes = useStyles();

  return(
    <Button
      disabled={activeStep === 0}
      onClick={handleBack}
      color="primary"
      className={classes.button}
    >
      Back
    </Button>
  )
}