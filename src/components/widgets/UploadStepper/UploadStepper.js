/** @jsx jsx */
import React, {useState} from 'react';
import { jsx } from '@emotion/core';
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import UploadSelectFile from "./UploadSelectFile";
import UploadDuplicateActionRadioButtons from "./UploadDuplicateActionRadioButtons";
import UploadButton from "./UploadButton";
import UploadResultsContent from "../UploadResultsContent";
import UploadStepConnector from "./UploadStepConnector";
import StepContent from "@material-ui/core/StepContent";
import withStyles from "@material-ui/core/styles/withStyles";
import UploadStepperBackButton from "./UploadStepperBackButton";
import UploadStepperNextButton from "./UploadStepperNextButton";
import colors from "../../../styles/colors";

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

function getSteps() {
  return [
    'Select a file to upload. Note: The file must be a Zip file in BagIt format',
    'Select the action to occur when a duplicate resource is found',
    'Initiate Upload',
    'Results'
  ];
}

/**
 * This component renders the stepper for the Upload Modal.
 **/
export default function UploadStepper({ selectedInSource }) {
  const classes = useStyles();
  const steps = getSteps();

  const [activeStep, setActiveStep] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedDuplicate, setSelectedDuplicate] = useState('ignore');

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

  /**
   * Define the contents for each step. getSteps() defines the text for the step while this
   * function defines the contents.
   **/
  function getStepContent(step) {
    switch (step) {
      case 0: {
        return <UploadSelectFile
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
        />;
      }
      case 1:
          return <UploadDuplicateActionRadioButtons
            selectedDuplicate={selectedDuplicate}
            setSelectedDuplicate={setSelectedDuplicate}
          />;
      case 2:
        return <UploadButton
          selectedFile={selectedFile}
          selectedDuplicate={selectedDuplicate}
          handleNext={handleNext}
          selectedInSource={selectedInSource}
        />;
      case 3:
        return <UploadResultsContent
          setActiveStep={setActiveStep}
          setSelectedFile={setSelectedFile}
          selectedFile={selectedFile}
          selectedDuplicate={selectedDuplicate}
        />;
    }
  }

  return (
    <div className={classes.root}>
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
              <div className={classes.actionsContainer}>
                <div>
                  {index <= 2 ? <UploadStepperBackButton
                                  handleBack={handleBack}
                                  activeStep={activeStep}/>
                  : null }
                  {index <= 1 ? <UploadStepperNextButton
                                  handleNext={handleNext}
                                  activeStep={activeStep}
                                  selectedFile={selectedFile}
                                  steps={steps}
                                />
                  : null }
                </div>
              </div>
            </PresQTStepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  )
}