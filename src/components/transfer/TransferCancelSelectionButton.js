/** @jsx jsx */
import { jsx } from "@emotion/core";
import {actionCreators} from "../../redux/actionCreators";
import { useDispatch } from "react-redux";
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
import colors from "../../styles/colors";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
  button: {
    "&:disabled": {
      cursor: 'not-allowed',
      pointerEvents: 'auto'
    }
  }
}));

export default function TransferCancelSelectionButton({ disabled }) {
  const classes = useStyles();
  const dispatch = useDispatch();
    const submitCancel = () => {
        dispatch(actionCreators.transfer.clearTransferResource());
        dispatch(actionCreators.transfer.deselectTransferResource());
    };

    return (
        <IconButton
          className={classes.button}

          variant="contained"
          style={!disabled ? { color: colors.presqtBlue } : null}
          onClick={submitCancel}
          disabled={disabled}
        >
          <CancelIcon />
        </IconButton>
    )
};