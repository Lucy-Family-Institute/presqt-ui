import {withStyles} from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import CancelButton from "../widgets/buttons/CancelButton";

const styles = theme => ({
  dialogTitle: {
    margin: 0,
    backgroundColor: 'rgba(229, 123, 0,1)',
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexBasis: 50,
    color: "white"
  },
  closeButton: {
    color: "white",
    "&:disabled": {
      cursor: 'not-allowed',
      pointerEvents: 'auto'
    }
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, disabled, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.dialogTitle} {...other}>
      <Typography variant="h6">
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
          disabled={disabled}
          >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

export default DialogTitle;