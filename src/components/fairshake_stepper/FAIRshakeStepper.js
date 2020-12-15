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
import FAIRshakeManualAssessment from "./FAIRshakeManualAssessment";
import FAIRshakeAssessmentResults from "./FAIRshakeAssessmentResults";
import {jsx} from "@emotion/core";
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

const steps = ["Select Digital Object Type", "Manual Assessment", "Manual Assessment Results"];

export default function FAIRshakeStepper({}) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedRubric, setSelectedRubric] = useState('7');

  function getStepContent(step) {
    switch (step) {
      case 0: {
        return <FAIRshakeRubricButtons
          selectedRubric={selectedRubric}
          setSelectedRubric={setSelectedRubric}
          setActiveStep={setActiveStep}
        />
      }
      case 1: {
        return <FAIRshakeManualAssessment
          setActiveStep={setActiveStep}

        />
      }
      case 2: {
        return <FAIRshakeAssessmentResults />
      }
    }
  }

  return (
    <div>
      <div style={{margin: 20, display: "flex", justifyContent: "center"}}>
        Submit a manual or automatic assessment for a digital object through FAIRshake. Completing this form will
        submit the assessment through a pre-logged in PresQT user.
      </div>
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
                }
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
