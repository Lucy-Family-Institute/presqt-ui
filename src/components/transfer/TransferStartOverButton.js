/** @jsx jsx */
import { useDispatch } from "react-redux";
import { jsx } from "@emotion/core";
import buttonStyles from "../../styles/buttons";
import { actionCreators } from "../../redux/actionCreators";
import Button from "@material-ui/core/Button/Button";
import textStyles from "../../styles/text";
import makeStyles from "@material-ui/core/styles/makeStyles";
import colors from "../../styles/colors";

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    backgroundColor: colors.presqtBlue,
    '&:hover': {
      backgroundColor: '#0a4996',
    },
    color: 'white'
  }
}));

export default function TransferStartOverButton({setActiveStep}) {
  const classes = buttonStyles.RetryStartUploadOver();
  const dispatch = useDispatch();

  const submitRetry = () => {
    dispatch(actionCreators.transfer.clearTransferModalData());
    dispatch(
      actionCreators.resources.removeFromErrorList(
        actionCreators.transfer.transferResource.toString()
      )
    );
    setActiveStep(0);
  };

  return (
    <Button color="primary" onClick={submitRetry} className={classes.button}>
      <span css={textStyles.buttonText}>Start Over</span>
    </Button>
  );
}
