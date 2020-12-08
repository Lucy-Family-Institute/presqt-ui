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
import KeywordStepperOptions from "./KeywordStepperOptions";
import KeywordStepperResults from "./KeywordStepperResults";
import KeywordEnhanceButton from "./KeywordEnhanceButton";
import StepperBackButton from "../widgets/buttons/stepperBackButton";

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

const steps = [
  "Keywords and Potential Enhancements",
  "Enhance Keywords",
  "Updated Keywords",
];

export default function KeywordStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [newKeywords, setNewKeywords] = useState([]);

  
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  // Get appropriate Component
  function getStepContent(step) {
    switch (step) {
      case 0: {
        return (
          <KeywordStepperOptions
            setActiveStep={setActiveStep}
            setNewKeywords={setNewKeywords}
            newKeywords={newKeywords}
          />
        );
      }
      case 1: {
        return (
          <KeywordEnhanceButton
            setActiveStep={setActiveStep}
            newKeywords={newKeywords}
          />
        );
      }
      case 2: {
        return <KeywordStepperResults newKeywords={newKeywords} />;
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
              <div className={classes.actionsContainer}>
                <div>
                  {steps.indexOf(label) === 1 ? (
                    <StepperBackButton
                      handleBack={handleBack}
                      activeStep={activeStep}
                    />
                  ) : null}
                </div>
              </div>
            </PresQTStepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
