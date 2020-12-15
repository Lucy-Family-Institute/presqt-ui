import React, { Fragment } from 'react';
import { useSelector, useDispatch} from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import withStyles from "@material-ui/core/styles/withStyles";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import colors from "../../../styles/colors";
import { actionCreators } from '../../../redux/actionCreators';
import Button from "@material-ui/core/Button/Button";
import textStyles from "../../../styles/text";

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

const CustomFairshakeButton = withStyles({
  root: {
    backgroundColor: colors.presqtBlue,
    "&:hover": {
      backgroundColor: "#0a4996",
    },
  },
})(Button);
/**
 * Component for the duplicate action radio buttons in the FAIRshake stepper
 **/
export default function FAIRshakeRubricButtons({selectedRubric, setSelectedRubric, setActiveStep}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const selectedResource = useSelector(state => state.selectedResource);

  const submitRubric = () => {
    if (selectedRubric != "96") {
      // Need to load the rubric into the state and jump ahead a step
      dispatch(actionCreators.fairshake.getFairshakeRubric(selectedRubric));
      setActiveStep(1);
    }
    else {
      // Dispatch the saga call and jump to results
      dispatch(actionCreators.fairshake.submitFairshakeAssessment(
        selectedResource.identifier,
        selectedResource.title,
        {},
        selectedRubric
      ));
      setActiveStep(2);
    }
  }

  return (
    <Fragment>
    <div>
      <FormControl component="fieldset" className={classes.formControl}>
        <RadioGroup
          aria-label="Digital Object Type"
          value={selectedRubric}
          onChange={event => setSelectedRubric(event.target.value)}
          onAnimationEnd={(event) => {event.stopPropagation()}}
        >
          <FormControlLabel
            value="96"
            control={<Radio classes={{root: classes.radio, checked: classes.checked}}/>}
            label="Run an Automatic Assessment"
          />
          <FormControlLabel
            value="95"
            control={<Radio classes={{root: classes.radio, checked: classes.checked}}/>}
            label="Tool"
          />
          <FormControlLabel
            value="94"
            control={<Radio classes={{root: classes.radio, checked: classes.checked}}/>}
            label="Dataset"
                  />
          <FormControlLabel
            value="93"
            control={<Radio classes={{root: classes.radio, checked: classes.checked}}/>}
            label="Repository"
          />
        </RadioGroup>
      </FormControl>
    </div>
     <CustomFairshakeButton
        onClick={submitRubric}
        variant="contained"
        color="primary"
      >
        <span css={textStyles.buttonText}>Next</span>
      </CustomFairshakeButton>
    </Fragment>
  );
}