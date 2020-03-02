import Button from "@material-ui/core/Button/Button";
import React, {useEffect} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import colors from "../../../styles/colors";
import {useSelector} from "react-redux";

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

export default function TransferStepperNextButton({ handleNext, activeStep,
                                                    transferTargetResources, steps }) {
  const classes = useStyles();
  const transferDestinationToken = useSelector(state => state.transferDestinationToken);
  const transferDestinationTarget = useSelector(state => state.transferDestinationTarget);

  return(
    <Button
      variant="contained"
      color="primary"
      onClick={handleNext}
      className={classes.button}
      disabled={
        (activeStep === 0 && !transferDestinationTarget) ||
        (activeStep === 1 && transferDestinationToken === '') ||
        (activeStep === 2 && !transferTargetResources)}
    >
      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
    </Button>
  )
}