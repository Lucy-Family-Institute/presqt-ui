import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import colors from "../../../styles/colors";

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

/**
 * Component for the fairshare action radio buttons in the transfer stepper
 **/
export default function DuplicateActionRadioButtons({selectedFairshareAction, setSelectedFairshareAction}) {
  const classes = useStyles();

  return (
    <div>
      <FormControl component="fieldset" className={classes.formControl}>
        <RadioGroup
          aria-label="FAIRshare Evaluator Actions"
          value={selectedFairshareAction}
          onChange={event => setSelectedFairshareAction(event.target.value)}
          onAnimationEnd={(event) => {event.stopPropagation()}}
        >
          <FormControlLabel
            value="yes"
            control={<Radio classes={{root: classes.radio, checked: classes.checked}}/>}
            label="Run Evaluation"
          />
          <FormControlLabel
            value="no"
            control={<Radio classes={{root: classes.radio, checked: classes.checked}}/>}
            label="Skip Evaluation"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}