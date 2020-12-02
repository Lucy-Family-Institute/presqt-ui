import {Grid} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import React, {Fragment, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import colors from "../../styles/colors";
import {useSelector} from "react-redux";

const useStyles = makeStyles(theme => ({
  formControl: {
    marginLeft: theme.spacing(1),
  },
  checked: {
  },
  radio: {
    '&$checked': {
      color: colors.presqtBlue,
      '&:hover': {
        backgroundColor: colors.presqtTintedBlue
      }
    },
    '&:hover': {
      backgroundColor: colors.presqtTintedBlue
    }
  },
}));

export default function FAIRshakeMetricForm({metricAnswers, setMetricAnswers, metric}) {
  const classes = useStyles();
  const FAIRShakeData = useSelector(state => state.fairshakeRubricData)
  const [metricAnswer, setMetricAnswer] = useState(null)

  /**
   *  Create a new dictionary of metric answers based on the old dictionary and the newly selected
   *  answer.
   **/
  const changeAnswer = (value) => {
    setMetricAnswer(value)
    const newMetricAnswers = {...metricAnswers}
    newMetricAnswers[metric.id] = value
    setMetricAnswers(newMetricAnswers)
  }

  return (
    <Fragment>
      <Grid>
        {metric.metric_value}
      </Grid>
      <Grid container direction="row">
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="FAIRShake Options"
            value={metricAnswer}
            onChange={event => changeAnswer(event.target.value)}
            onAnimationEnd={(event) => {event.stopPropagation()}}
          >
            {
              FAIRShakeData.answer_options.map((option) => {
                return(
                  <FormControlLabel
                    value={option.value}
                    control={<Radio classes={{root: classes.radio, checked: classes.checked}}/>}
                    label={option.value_text}
                    key={option.value}
                  />
                )
              })
            }
          </RadioGroup>
        </FormControl>
      </Grid>
    </Fragment>
  )
}