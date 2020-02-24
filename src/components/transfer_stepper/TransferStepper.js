import React, {useState} from "react";
import Stepper from "@material-ui/core/Stepper";
import UploadStepConnector from "../upload_stepper/UploadStepConnector";
import StepLabel from "@material-ui/core/StepLabel";
import makeStyles from "@material-ui/core/styles/makeStyles";
import colors from "../../styles/colors";
import Step from "@material-ui/core/Step";
import withStyles from "@material-ui/core/styles/withStyles";
import StepContent from "@material-ui/core/StepContent";
import Typography from "@material-ui/core/Typography";
import TransferStepperTargets from "./TransferStepperTargets";
import TransferStepperToken from "./TransferStepperToken";
import TransferStepperTransferButton from "./TransferStepperTransferButton";
import TransferStepperResults from "./TransferStepperResults";
import TransferStepperSelectResource from "./TransferStepperSelectResource";
import UploadDuplicateActionRadioButtons from "../upload_stepper/UploadDuplicateActionRadioButtons";
import TransferStepperNextButton from "./TransferStepperNextButton";
import UploadStepperBackButton from "../upload_stepper/UploadStepperBackButton";
import {useDispatch, useSelector} from "react-redux";
import { actionCreators } from "../../redux/actionCreators";


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
  'Select Destination Target',
  'Input Token',
  'Select Resource or select nothing to create a new project',
  'Select the action to occur when a duplicate resource is found',
  'Initiate Transfer',
  'Results'
];


export default function TransferStepper({ setDestinationTarget, destinationTarget,
                                          setDestinationToken, destinationToken }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const transferTargetResources = useSelector(state => state.resources.transferTargetResources);
  const [activeStep, setActiveStep] = useState(0);
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
    if (activeStep === 1) {
      dispatch(actionCreators.resources.loadFromTransferTarget(
        destinationTarget, destinationToken));
    }
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  /**
   * Define the contents for each step. getSteps() defines the text for the step while this
   * function defines the contents.
   **/
  function getStepContent(step) {
    switch (step) {
      case 0: {
        return <TransferStepperTargets
          destinationTarget={destinationTarget}
          setDestinationTarget={setDestinationTarget}/>
      }
      case 1: {
        return <TransferStepperToken
          destinationToken={destinationToken}
          setDestinationToken={setDestinationToken}/>
      }
      case 2: {
        return <TransferStepperSelectResource />
      }
      case 3: {
        return <UploadDuplicateActionRadioButtons // RENAME SO IT'S REUSABLE
          selectedDuplicate={selectedDuplicate}
          setSelectedDuplicate={setSelectedDuplicate}
        />
      }
      case 4: {
        return <TransferStepperTransferButton
          handleNext={handleNext}
          destinationTarget={destinationTarget}
          destinationToken={destinationToken}
          selectedDuplicate={selectedDuplicate}
        />
      }
      case 5: {
        return <TransferStepperResults />
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
                <div className={classes.actionsContainer}>
                  <div>
                    <UploadStepperBackButton // RENAME SO IT'S REUSABLE
                      handleBack={handleBack}
                      activeStep={activeStep}
                    />
                    {steps.indexOf(label) !== 4
                      ? <TransferStepperNextButton
                          handleNext={handleNext}
                          activeStep={activeStep}
                          destinationTarget={destinationTarget}
                          destinationToken={destinationToken}
                          transferTargetResources={transferTargetResources}
                          steps={steps}
                        />
                  : null }
                  </div>
                </div>
              </Typography>
            </PresQTStepContent>
          </Step>
          )
        )}
      </Stepper>
    </div>
  )
}