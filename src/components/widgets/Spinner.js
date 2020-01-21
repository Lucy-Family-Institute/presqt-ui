import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import colors from "../../styles/colors";

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

export default function Spinner() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ColorCircularProgress
        onAnimationEnd={(event) => {event.stopPropagation()}}
      />
    </div>
  )
}

