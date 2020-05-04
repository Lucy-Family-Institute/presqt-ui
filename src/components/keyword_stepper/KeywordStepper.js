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
import KeywordStepperSubmit from "./KeywordStepperSubmit";
import KeywordStepperResults from "./KeywordStepperResults";

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

const steps = ["Keywords and Potential Enhancements", "Updated Keywords"];

export default function KeywordStepper({}) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [newKeywords, setNewKeywords] = useState([]);

  // Get appropriate Component
  function getStepContent(step) {
    switch (step) {
      case 0: {
        return (
          <KeywordStepperSubmit
            setActiveStep={setActiveStep}
            setNewKeywords={setNewKeywords}
            newKeywords={newKeywords}
          />
        );
      }
      case 1: {
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
            </PresQTStepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
