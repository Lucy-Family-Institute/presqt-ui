import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";
import { makeStyles, withStyles } from '@material-ui/core/styles';

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
    color: '#0C52A7',
  },
})(CircularProgress);

export default function Spinner() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ColorCircularProgress />
    </div>
  )
}

