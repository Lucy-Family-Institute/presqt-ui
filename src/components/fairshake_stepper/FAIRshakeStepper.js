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
import FAIRshakeRubricButtons from "../widgets/buttons/FAIRshakeRubricButtons";

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

const steps = ["Select Digital Object Type", "Manual Assessment"];

export default function FAIRshakeStepper({}) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedRubric, setSelectedubric] = useState('7');

  /**
   * Decrement the step count when the Back button is pressed
   **/
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  /**
   * Increment the step count when the Back button is pressed
   **/
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0: {
        return <FAIRshakeRubricButtons
          selectedRubric={selectedRubric}
          setSelectedRubric={setSelectedubric}
          setActiveStep={setActiveStep}
        />
      }
      case 1: {
        return 
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