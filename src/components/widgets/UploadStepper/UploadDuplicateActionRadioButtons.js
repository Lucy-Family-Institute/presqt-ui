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
  checked: {
  },
  radio: {
    '&$checked': {
      color: '#0C52A7'
    }
  },
}));

export default function UploadDuplicateActionRadioButtons(props) {
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
            control={<Radio classes={{root: classes.radio, checked: classes.checked}}/>}
            label="Ignore"
          />
          <FormControlLabel
            value="update"
            control={<Radio classes={{root: classes.radio, checked: classes.checked}}/>}
            label="Update"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}
