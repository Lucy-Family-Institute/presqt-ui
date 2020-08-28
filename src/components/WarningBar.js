/** @jsx jsx */
import { jsx } from '@emotion/core';
import Snackbar from "@material-ui/core/Snackbar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import colors from "../styles/colors";
import {useSelector} from "react-redux";

const useStyles = makeStyles(theme => ({
  warningSnack: {
    backgroundColor: colors.chevelleRed,
    color: 'white',
  },
  snackbar: {
    marginTop: 100
  }
}));

export default function WarningBar () {
  const classes = useStyles();
  const announcement = useSelector(state => state.announcement);

  return (
    announcement
      ?
      <Snackbar
        className={classes.snackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={announcement.show}
        message={announcement.message}
        ContentProps={{
          classes: {
            root: classes.warningSnack
          }
        }}
      />
      : null
  )
}