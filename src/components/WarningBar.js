/** @jsx jsx */
import { jsx } from '@emotion/core';
import Snackbar from "@material-ui/core/Snackbar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import colors from "../styles/colors";

const useStyles = makeStyles(theme => ({
  warningSnack: {
    backgroundColor: colors.chevelleRed,
    color: 'white'
  },
  snackbar: {
    marginTop: 100
  }
}));

export default function WarningBar () {
  const classes = useStyles();

  return (
    <Snackbar
      className={classes.snackbar}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={true}
      message="The server is in the process being updated. You may experience delays or outages."
      ContentProps={{
        classes: {
          root: classes.warningSnack
        }
      }}
    />
  )
}