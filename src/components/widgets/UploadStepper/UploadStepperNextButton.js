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

export default function UploadStepperNextButton(props) {
  const classes = useStyles();

    return(
      <Button
        variant="contained"
        color="primary"
        onClick={props.handleNext}
        className={classes.button}
        disabled={props.activeStep === 0 ? !props.selectedFile : false}

      >
        {props.activeStep === props.steps.length - 1 ? 'Finish' : 'Next'}
      </Button>
    )
}
