import makeStyles from "@material-ui/core/styles/makeStyles";
import colors from "../../styles/colors";
import withStyles from "@material-ui/core/styles/withStyles";
import StepContent from "@material-ui/core/StepContent";
import React, { useState } from "react";
import Stepper from "@material-ui/core/Stepper";
import UploadStepConnector from "../upload_stepper/UploadStepConnector";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import FAIRshareStepperSubmit from "./FAIRshareStepperSubmit";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
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

const steps = ["Submit FAIRshare Evaluator Request", "Evaluation Results"];

export default function FAIRshareStepper({}) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  function getStepContent(step) {
    switch (step) {
      case 0: {
        return <FAIRshareStepperSubmit setActiveStep={setActiveStep} />;
      }
      case 1: {
        <p>Eggs</p>
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
              StepIconProps={{
                classes: {
                  active: classes.iconActive,
                  completed: classes.iconCompleted,
                },
              }}
            >
              {label}
            </StepLabel>
            <PresQTStepContent>
              <Typography component={"div"}>{getStepContent(index)}</Typography>
            </PresQTStepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
