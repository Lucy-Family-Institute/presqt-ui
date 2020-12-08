import {useSelector, useDispatch} from "react-redux";
import React, {useEffect, useState, Fragment} from "react";
import Spinner from "../widgets/spinners/Spinner";
import {Grid} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button/Button";
import colors from "../../styles/colors";
import textStyles from "../../styles/text";
import FAIRshakeMetricForm from "./FAIRshakeMetricForm";
import { actionCreators } from "../../redux/actionCreators";
import StepperBackButton from "../widgets/buttons/stepperBackButton";

const CustomFairshakeButton = withStyles({
  root: {
    backgroundColor: colors.presqtBlue,
    "&:hover": {
      backgroundColor: "#0a4996",
    },
  },
})(Button);

export default function FAIRshakeManualAssessment({ setActiveStep }) {
  const dispatch = useDispatch();

  const apiOperationErrors = useSelector(state => state.apiOperationErrors);
  const FAIRShakeData = useSelector(state => state.fairshakeRubricData);
  const selectedResource = useSelector(state => state.selectedResource);
  const fairshakeRubric = useSelector(state => state.fairshakeRubric)

  const [metricContent, setMetricContent] = useState(<Spinner />)
  const [metricAnswers, setMetricAnswers] = useState(null);
  const [metricFull, setMetricFull] = useState(false)

  const submitAssessment = () => {
    dispatch(actionCreators.fairshake.submitFairshakeAssessment(
      selectedResource.identifier,
      selectedResource.title,
      metricAnswers,
      fairshakeRubric
    ));
    setActiveStep(2);
  }

  /**
   * Decrement the step count when the Back button is pressed
   **/
  const handleBack = () => {
    setMetricAnswers(null)
    setMetricFull(false)
    setActiveStep(0);
    dispatch(actionCreators.fairshake.clearFairshakeData());
  };

  /** When the FAIRShakeData first gets added and the metric answer state dictionary has not
   * been created then loop through the FAIRShake data to populate this dictionary
   **/
  useEffect(()=> {
    if (FAIRShakeData && metricAnswers == null) {
      let metricAnswersDict = {}
      FAIRShakeData.metrics.forEach(metric => {
        metricAnswersDict[metric.id] = null
      })
      setMetricAnswers(metricAnswersDict)
    }
  }, [FAIRShakeData])

  /**
   * When new FAIRShakeData or apiOperationErrors get added either build a metric form or display
   * the error.
   **/
  useEffect(() => {
    if (FAIRShakeData) {
      setMetricContent(FAIRShakeData.metrics.map((metric) => {
        return (
            <Grid container direction="column" key={metric.id}>
              <FAIRshakeMetricForm metricAnswers={metricAnswers} setMetricAnswers={setMetricAnswers} metric={metric} />
            </Grid>
        )
      }))
    }
  }, [FAIRShakeData, apiOperationErrors, metricAnswers])

  /**
   * Only make the Submit button clickable if all metrics are filled out
   **/
  useEffect(() => {
    if (metricAnswers) {
      setMetricFull(Object.values(metricAnswers).every(value => value != null))
    }
  }, [metricAnswers])

  return (
    <Fragment>
      {metricContent}
      <StepperBackButton
        handleBack={handleBack}
        activeStep={1}
      />
      <CustomFairshakeButton
        onClick={submitAssessment}
        variant="contained"
        color="primary"
        disabled={!metricFull}
      >
        <span css={textStyles.buttonText}>Submit Assessment</span>
      </CustomFairshakeButton>
    </Fragment>
  )
}