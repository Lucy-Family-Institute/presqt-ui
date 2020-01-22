import makeStyles from "@material-ui/core/styles/makeStyles";
import colors from "./colors";

export default {
  RetryUpload: makeStyles(theme => ({
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
      backgroundColor: colors.presqtBlue,
      "&:hover": {
        backgroundColor: "#0a4996"
      }
    }
  })),
  RetryDownload: makeStyles(theme => ({
    button: {
      marginRight: theme.spacing(1),
      backgroundColor: colors.presqtBlue,
      "&:hover": {
        backgroundColor: "#0a4996"
      }
    }
  })),
  RetryStartUploadOver: makeStyles(theme => ({
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
      color: colors.presqtBlue
    }
  }))
};
