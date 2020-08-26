import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";
import {useSelector} from "react-redux";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import colors from "../../../styles/colors";
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
}));

const ColorCircularProgress = withStyles({
  root: {
    color: colors.presqtBlue
  },
})(CircularProgress);

function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex">
      <ColorCircularProgress variant="static" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and static variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

export default function SpinnerUpload() {
    const classes = useStyles();
    const uploadProgress = useSelector(state => state.uploadProgress);

  return (
    <div className={classes.root}>
      <CircularProgressWithLabel
        value={uploadProgress >= 5 ? uploadProgress : 5}
        onAnimationEnd={(event) => {event.stopPropagation()}}
      />
    </div>
  )
}