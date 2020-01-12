import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles(theme => ({
  formControl: {
    marginLeft: theme.spacing(1),
  },
}));

export default function DuplicateActionRadioButtons(props) {
  const classes = useStyles();

  const handleChange = event => {
    props.setSelectedDuplicate(event.target.value)
  };

  return (
    <div>
      <FormControl component="fieldset" className={classes.formControl}>
        <RadioGroup
          aria-label="Duplicate Actions"
          value={props.selectedDuplicate}
          onChange={handleChange}
          onAnimationEnd={(event) => {event.stopPropagation()}}
        >
          <FormControlLabel
            value="ignore"
            control={<Radio color='primary'/>}
            label="Ignore"
          />
          <FormControlLabel
            value="update"
            control={<Radio color='primary'/>}
            label="Update"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}
