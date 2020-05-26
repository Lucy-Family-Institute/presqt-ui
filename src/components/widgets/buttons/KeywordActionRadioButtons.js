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
 * Component for the keyword action radio buttons in the transfer stepper
 **/
export default function DuplicateActionRadioButtons({selectedKeywordAction, setSelectedKeywordAction}) {
  const classes = useStyles();

  return (
    <div>
      <FormControl component="fieldset" className={classes.formControl}>
        <RadioGroup
          aria-label="Keyword Actions"
          value={selectedKeywordAction}
          onChange={event => setSelectedKeywordAction(event.target.value)}
          onAnimationEnd={(event) => {event.stopPropagation()}}
        >
          <FormControlLabel
            value="enhance"
            control={<Radio classes={{root: classes.radio, checked: classes.checked}}/>}
            label="Automatic Enhancement"
          />
          <FormControlLabel
            value="suggest"
            control={<Radio classes={{root: classes.radio, checked: classes.checked}}/>}
            label="Manual Enhancement"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}
