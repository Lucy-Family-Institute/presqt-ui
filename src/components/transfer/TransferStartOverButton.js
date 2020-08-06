/** @jsx jsx */
import { useDispatch } from "react-redux";
import { jsx } from "@emotion/core";
import { actionCreators } from "../../redux/actionCreators";
import Button from "@material-ui/core/Button/Button";
import textStyles from "../../styles/text";
import makeStyles from "@material-ui/core/styles/makeStyles";
import colors from "../../styles/colors";

const useStyles = makeStyles(theme => ({
  step4Button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    backgroundColor: colors.presqtBlue,
    '&:hover': {
      backgroundColor: '#0a4996',
    },
    color: 'white'
  },
  button: {
      height: "100%",
      marginRight: theme.spacing(1),
      color: colors.presqtBlue
  }
}));

export default function TransferStartOverButton({setActiveStep, step, setTransferPageNumber}) {
  const classes = useStyles();

  let buttonClass = classes.button;
  if (step === 5 || step === 6) {
    buttonClass = classes.step4Button
  }
  
  const dispatch = useDispatch();

  const submitRetry = () => {
    dispatch(actionCreators.transfer.clearTransferModalData());
    dispatch(
      actionCreators.resources.removeFromErrorList(
        actionCreators.transfer.transferResource.toString()
      )
    );
    setActiveStep(0);
    setTransferPageNumber(1);
  };

  return (
    <Button color="primary" onClick={submitRetry} className={buttonClass}>
      <span css={textStyles.buttonText}>Start Over</span>
    </Button>
  );
}
