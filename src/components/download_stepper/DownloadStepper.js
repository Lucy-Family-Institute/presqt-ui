import makeStyles from "@material-ui/core/styles/makeStyles";
import colors from "../../styles/colors";
import withStyles from "@material-ui/core/styles/withStyles";
import StepContent from "@material-ui/core/StepContent";
import React, {useState} from "react";
import Stepper from "@material-ui/core/Stepper";
import UploadStepConnector from "../upload_stepper/UploadStepConnector";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import DownloadStepperAgreement from "./DownloadStepperAgreement";
import DownloadStepperResults from "./DownloadStepperResults";
import DownloadStepperSubmit from "./DownloadStepperSubmit";

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
  'Download Agreement',
  'Email Opt-In',
  'Results'
];

export default function DownloadStepper({}) {
  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);
  const [emailValue, setEmailValue] = useState('');

  function getStepContent(step) {
    switch (step) {
      case 0: {
        return <DownloadStepperAgreement
          setActiveStep={setActiveStep}
        />
      }
      case 1: {
        return <DownloadStepperSubmit
          setActiveStep={setActiveStep}
          setEmailValue={setEmailValue}
          emailValue={emailValue}
        />
      }
      case 2: {
        return <DownloadStepperResults
          emailValue={emailValue}
        />
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