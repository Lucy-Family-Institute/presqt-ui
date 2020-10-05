import React, {useEffect, useState} from "react";
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
import TransferStepperAgreement from "./TransferStepperAgreement";
import TransferStepperTransferButton from "./TransferStepperTransferButton";
import TransferStepperResults from "./TransferStepperResults";
import TransferStepperSelectResource from "./TransferStepperSelectResource";
import DuplicateActionRadioButtons from "../../widgets/buttons/duplicateActionRadioButtons";
import KeywordActionRadioButton from "../../widgets/buttons/KeywordActionRadioButtons";
import TransferStepperNextButton from "./TransferStepperNextButton";
import StepperBackButton from "../../widgets/buttons/stepperBackButton";
import {useDispatch, useSelector} from "react-redux";
import { actionCreators } from "../../../redux/actionCreators";
import TransferStartOverButton from "../TransferStartOverButton";
import getError from "../../../utils/getError";
import KeywordTransferSuggestList from "./KeywordTransferSuggestList";
import KeywordTransferKeywords from "./KeywordTransferKeywords";
import PersonIcon from '@material-ui/icons/Person';
import IconListItem from "../../widgets/list_items/IconListItem";


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
  'Select resource to transfer to or select nothing to transfer as a new project',
  'Select the action to occur when a duplicate resource is found',
  'Select the keyword action to occur',
  "Keywords",
  'Transfer Agreement',
  'Email Opt-In',
  'Transfer Results'
];

export default function TransferStepper({setTransferPageNumber, transferPageNumber}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const transferTargetResources = useSelector(state => state.transferTargetResources);
  const transferDestinationToken = useSelector(state => state.transferDestinationToken);
  const transferDestinationTarget = useSelector(state => state.transferDestinationTarget);
  const apiOperationErrors = useSelector(state => state.apiOperationErrors);
  const targetToken = useSelector(state => state.selectedTarget
    ? state.apiTokens[state.selectedTarget.name]
    : null);
  const resource = useSelector(state => state.selectedResource);
  const collectionError = getError(actionCreators.transfer.loadFromTransferTarget);

  const [activeStep, setActiveStep] = useState(0);
  const [selectedDuplicate, setSelectedDuplicate] = useState('ignore');
  const [selectedKeywordAction, setSelectedKeywordAction] = useState('automatic');
  const [keywordList, setKeywordList] = useState([]);
  const [emailValue, setEmailValue] = useState('');

  /**  If the token given is invalid then step back to the token step **/
  useEffect(() => {
    if (activeStep >= 2 && collectionError) {
      dispatch(actionCreators.transfer.clearTransferToken());
      dispatch(actionCreators.transfer.clearTransferTargetResources());
      dispatch(actionCreators.transfer.stepInTransferModal(1));
      setActiveStep(prevActiveStep => 1);
    }
  }, [apiOperationErrors]);

  
  /** Decrement the step count when the Back button is pressed **/
  const handleBack = () => {
    if (activeStep === 2){
      dispatch(actionCreators.transfer.clearTransferToken());
      dispatch(actionCreators.transfer.clearTransferTargetResources());
      setTransferPageNumber(1);
    }
    dispatch(actionCreators.transfer.stepInTransferModal(activeStep - 1));
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  /** Increment the step count when the Back button is pressed **/
  const handleNext = () => {
    if (activeStep === 1) {
      dispatch(actionCreators.transfer.loadFromTransferTarget(
        transferDestinationTarget, transferDestinationToken));
    }
    else if (activeStep === 4 && selectedKeywordAction != 'none') {
      dispatch(actionCreators.keywords.getKeywords(resource, targetToken));
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
          handleNext={handleNext}
          activeStep={activeStep}
        />
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
        return <KeywordActionRadioButton
          selectedKeywordAction={selectedKeywordAction}
          setSelectedKeywordAction={setSelectedKeywordAction} />
      }
      case 5: {
        if (selectedKeywordAction === 'manual') {
          return (
            <KeywordTransferSuggestList
              setKeywordList={setKeywordList}
            />
          )
        }
        else if (selectedKeywordAction === 'automatic') {
          return (
            <KeywordTransferKeywords />
          )
        }
        else { // NONE
          return (
            <IconListItem
              icon={<PersonIcon style={{color: colors.presqtBlue}}/>}
              text={"User has opted out of keyword enhancement."}
            />
          )
        }
      }
      case 6: {
        return (
          <TransferStepperAgreement selectedKeywordAction={selectedKeywordAction} />
        )
        }
      case 7: {
          return (
            <TransferStepperTransferButton
              handleNext={handleNext}
              selectedDuplicate={selectedDuplicate}
              selectedKeywordAction={selectedKeywordAction}
              keywordList={keywordList}
              emailValue={emailValue}
              setEmailValue={setEmailValue}
            />
          )
      }
      case 8: {
        return (
          <TransferStepperResults
            setActiveStep={setActiveStep}
            selectedDuplicate={selectedDuplicate}
            selectedKeywordAction={selectedKeywordAction}
            keywordList={keywordList}
            setTransferPageNumber={setTransferPageNumber}
            transferPageNumber={transferPageNumber}
            emailValue={emailValue}
          />
        )
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
                    {
                      index !== 8 && index !== 9
                      ?
                        <StepperBackButton
                          handleBack={handleBack}
                          activeStep={activeStep}
                        />
                      :
                        null
                    }
                    {
                      index !== 7 && index !== 8
                      ?
                        <TransferStepperNextButton
                          handleNext={handleNext}
                          activeStep={activeStep}
                          transferTargetResources={transferTargetResources}
                          steps={steps}
                          selectedKeywordAction={selectedKeywordAction}
                        />
                      :
                        null
                    }

                    {
                      index === 7
                      ? <TransferStartOverButton
                          setActiveStep={setActiveStep}
                          step={index}
                          setTransferPageNumber={setTransferPageNumber}
                        />
                      : null
                    }
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
