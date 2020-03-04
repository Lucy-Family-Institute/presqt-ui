import React, {useState} from "react";
import Stepper from "@material-ui/core/Stepper";
import UploadStepConnector from "../../upload_stepper/UploadStepConnector";
import StepLabel from "@material-ui/core/StepLabel";
import makeStyles from "@material-ui/core/styles/makeStyles";
import colors from "../../../styles/colors";
import Step from "@material-ui/core/Step";
import withStyles from "@material-ui/core/styles/withStyles";
import StepContent from "@material-ui/core/StepContent";
import Typography from "@material-ui/core/Typography";
import TransferStepperTargets from "./TransferStepperTargets";
import TransferStepperToken from "./TransferStepperToken";
import TransferStepperTransferButton from "./TransferStepperTransferButton";
import TransferStepperResults from "./TransferStepperResults";
import TransferStepperSelectResource from "./TransferStepperSelectResource";
import DuplicateActionRadioButtons from "../../widgets/buttons/duplicateActionRadioButtons";
import TransferStepperNextButton from "./TransferStepperNextButton";
import StepperBackButton from "../../widgets/buttons/stepperBackButton";
import {useDispatch, useSelector} from "react-redux";
import { actionCreators } from "../../../redux/actionCreators";
import TransferStartOverButton from "../TransferStartOverButton";


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
  'Select destination target',
  'Input destination target token',
  'Select resource or select nothing to create a new project',
  'Select the action to occur when a duplicate resource is found',
  'Initiate transfer',
  'Results'
];


export default function TransferStepper() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const transferTargetResources = useSelector(state => state.transferTargetResources);
  const transferDestinationToken = useSelector(state => state.transferDestinationToken);
  const transferDestinationTarget = useSelector(state => state.transferDestinationTarget);

  const [activeStep, setActiveStep] = useState(0);
  const [selectedDuplicate, setSelectedDuplicate] = useState('ignore');

  /**
   * Decrement the step count when the Back button is pressed
   **/
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
    dispatch(actionCreators.transfer.stepInTransferModal(activeStep - 1));
  };

  /**
   * Increment the step count when the Back button is pressed
   **/
  const handleNext = () => {
    if (activeStep === 1) {
      dispatch(actionCreators.transfer.loadFromTransferTarget(
        transferDestinationTarget, transferDestinationToken));
    }
    setActiveStep(prevActiveStep => prevActiveStep + 1);
    dispatch(actionCreators.transfer.stepInTransferModal(activeStep + 1));
  };

  /**
   * Define the contents for each step. getSteps() defines the text for the step while this
   * function defines the contents.
   **/
  function getStepContent(step) {
    switch (step) {
      case 0: {
        return <TransferStepperTargets />
      }
      case 1: {
        return <TransferStepperToken
          handleNext={handleNext}/>
      }
      case 2: {
        return <TransferStepperSelectResource />
      }
      case 3: {
        return <DuplicateActionRadioButtons
          selectedDuplicate={selectedDuplicate}
          setSelectedDuplicate={setSelectedDuplicate}
        />
      }
      case 4: {
        return <TransferStepperTransferButton
          handleNext={handleNext}
          selectedDuplicate={selectedDuplicate}
        />
      }
      case 5: {
        return <TransferStepperResults
          setActiveStep={setActiveStep}
          selectedDuplicate={selectedDuplicate}
        />
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
                    {index !== 5
                    ? <StepperBackButton // RENAME SO IT'S REUSABLE
                        handleBack={handleBack}
                        activeStep={activeStep}
                      />
                    : null
                    }
                    {index === 4 
                      ? <TransferStartOverButton
                        setActiveStep={setActiveStep}
                        step={index}
                      />
                      : index !== 5
                        ? <TransferStepperNextButton
                        handleNext={handleNext}
                        activeStep={activeStep}
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