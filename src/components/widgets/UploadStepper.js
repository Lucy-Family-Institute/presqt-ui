/** @jsx jsx */
import {useState} from 'react';
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
import UploadButton from "./UploadButton";
import UploadResultsContent from "./UploadResultsContent";

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
  return [
    'Select a file to upload. Note: The file must be a Zip file in BagIt format',
    'Select the action to occur when a duplicate resource is found',
    'Initiate Upload',
    'Results'];
}

export default function UploadStepper() {
  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedDuplicate, setSelectedDuplicate] = useState('ignore');
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
        return <SelectFile
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
        />;
      }
      case 1:
        return <DuplicateActionRadioButtons
          selectedDuplicate={selectedDuplicate}
          setSelectedDuplicate={setSelectedDuplicate}
        />;
      case 2:
        return <UploadButton
          selectedFile={selectedFile}
          selectedDuplicate={selectedDuplicate}
          handleNext={handleNext}
        />;
      case 3:
        return <UploadResultsContent />;
    }
  }
  const backButton = () => {
    return(
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          color="primary"
          className={classes.button}
        >
          Back
        </Button>
    )
  };

  const nextButton = () => {
    return(
      <Button
        variant="contained"
        color="primary"
        onClick={handleNext}
        className={classes.button}
        disabled={activeStep === 0 ? !selectedFile : false}

      >
        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
      </Button>
    )
  };

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
                  {index <= 2 ? backButton() : null }
                  {index <= 1 ? nextButton() : null}
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  )
}