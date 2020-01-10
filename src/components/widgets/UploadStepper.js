/** @jsx jsx */
import { useState } from 'react';
import { jsx } from '@emotion/core';
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import SelectFile from "./SelectFile";
import Button from "@material-ui/core/Button";
import DuplicateActionRadioButtons from "./DuplicateActionRadioButtons";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return ['Select a file to upload. Note: The file must be a Zip file in BagIt format',
    'Select the action to occur when a duplicate resource is found', 'Initiate Upload', 'Results'];
}

export default function UploadStepper() {
  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);
  const [fileSelected, setFileSelected] = useState(null);
  const [duplicateSelected, setDuplicateSelected] = useState('ignore');

  const steps = getSteps();

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0: {
        const selectFile = <SelectFile
          fileSelected={fileSelected}
          setFileSelected={setFileSelected}
        />;
        return selectFile
      }
      case 1:
        const duplicateActionRadioButtons = <DuplicateActionRadioButtons
          duplicateSelected={duplicateSelected}
          setDuplicateSelected={setDuplicateSelected}
        />;
        return duplicateActionRadioButtons;
      case 2:
        return `upload file`;
      case 3:
        return `results`;
    }
  }

  return (
    <div className={classes.root}>
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography
                component={'div'}
              >
                {getStepContent(index)}
              </Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    color="primary"
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  )
}