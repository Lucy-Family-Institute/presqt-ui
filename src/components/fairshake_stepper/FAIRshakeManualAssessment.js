import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import Spinner from "../widgets/spinners/Spinner";
import {Grid} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import {makeStyles} from "@material-ui/core/styles";
import colors from "../../styles/colors";
import FAIRshakeMetricForm from "./FAIRshakeMetricForm";


export default function FAIRshakeManualAssessment({setActiveStep}) {
  const apiOperationErrors = useSelector(state => state.apiOperationErrors);
  const FAIRShakeData = useSelector(state => state.fairshakeRubricData)

  const [metricContent, setMetricContent] = useState(<Spinner />)
  const [metricAnswers, setMetricAnswers] = useState(null);

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

  return(metricContent)
}