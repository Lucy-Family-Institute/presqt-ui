import makeStyles from "@material-ui/core/styles/makeStyles";
import colors from "../../styles/colors";
import withStyles from "@material-ui/core/styles/withStyles";
import StepContent from "@material-ui/core/StepContent";
import React, {useState} from "react";
import {actionCreators} from "../../redux/actionCreators";
import {useDispatch} from "react-redux";
import TransferStepperTargets from "../transfer/stepper/TransferStepperTargets";
import TransferStepperToken from "../transfer/stepper/TransferStepperToken";
import Stepper from "@material-ui/core/Stepper";
import UploadStepConnector from "../upload_stepper/UploadStepConnector";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import StepperBackButton from "../widgets/buttons/stepperBackButton";
import EaasiStepperSubmit from "./EaasiStepperSubmit";
import EaasiStepperResults from "./EaasiStepperResults";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  iconActive: {
    fill: colors.presqtBlue,
  },
  iconCompleted: {
    fill: colors.presqtBlue,
  },
}));

const PresQTStepContent = withStyles({
  root: {
    borderColor: colors.presqtBlue,
  },
})(StepContent);

const steps = [
  'Submit Proposal',
  'Results'
];

/**
 * This component renders the stepper for the EaaSI Modal.
 **/
export default function EaasiStepper({}) {
  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);

  function getStepContent(step) {
    switch (step) {
      case 0: {
        return <EaasiStepperSubmit
          setActiveStep={setActiveStep}
        />
      }
      case 1: {
        return <EaasiStepperResults />
      }
    }
  }

  return (
    <div>
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        connector={<UploadStepConnector />}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              StepIconProps={{classes:
                  {active: classes.iconActive, completed: classes.iconCompleted}}}
            >
              {label}
            </StepLabel>
            <PresQTStepContent>
              <Typography
                component={'div'}
              >
                {getStepContent(index)}
              </Typography>
            </PresQTStepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  )
}