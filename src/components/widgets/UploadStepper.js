/** @jsx jsx */
import {useEffect, useState} from 'react';
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
import Spinner from "./Spinner";
import {useSelector} from "react-redux";
import LeftSpinner from "./LeftSpinner";

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

  const sourceUploadStatus = useSelector(state => state.resources.sourceUploadStatus);
  const sourceUploadData = useSelector(state => state.resources.sourceUploadData);

  const [activeStep, setActiveStep] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedDuplicate, setSelectedDuplicate] = useState('ignore');
  const [stepThreeContent, setStepThreeContent] = useState(<LeftSpinner />);
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
        return stepThreeContent;
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

  useEffect(() => {
    if (sourceUploadStatus === 'success') {
      const failedFixityMessage = sourceUploadData.failed_fixity.length > 0
          ? `The following files failed fixity: ${sourceUploadData.failed_fixity.join(', ')}`
          : 'No files failed fixity.';
      const resourcesIgnoredMessage = sourceUploadData.resources_ignored.length > 0
        ? `The following duplicate resources were ignored:
          ${sourceUploadData.resources_ignored.join(', ')}`
        : 'No duplicate resources were ignored.';
      const resourcesUpdatedMessage = sourceUploadData.resources_updated.length > 0
        ? `The following duplicate resources were updated:
          ${sourceUploadData.resources_updated.join(', ')}`
        : 'No duplicate resources were updated.';

      const successfulMessage = <div>
        <br/>
        {failedFixityMessage}
        <br />
        {resourcesIgnoredMessage}
        <br />
        {resourcesUpdatedMessage}
      </div>;
      setStepThreeContent(successfulMessage);
    }
    else if (sourceUploadStatus === 'failure') {
      setStepThreeContent(<div>{sourceUploadData.message}</div>);
    }
  }, [sourceUploadStatus]);

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