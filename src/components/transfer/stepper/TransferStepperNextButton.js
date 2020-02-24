import Button from "@material-ui/core/Button/Button";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import colors from "../../../styles/colors";

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

export default function TransferStepperNextButton({ handleNext, activeStep, destinationTarget,
                                                    destinationToken, transferTargetResources,
                                                    steps }) {
  const classes = useStyles();

    return(
      <Button
        variant="contained"
        color="primary"
        onClick={handleNext}
        className={classes.button}
        disabled={
          (activeStep === 0 ? !destinationTarget : false) ||
          (activeStep === 1 ? !destinationToken : false) ||
          (activeStep === 2 ? !transferTargetResources : false)}

      >
        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
      </Button>
    )
}