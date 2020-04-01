/** @jsx jsx */
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { jsx } from "@emotion/core";
import buttonStyles from "../../../../styles/buttons";
import textStyles from "../../../../styles/text";
import { actionCreators } from "../../../../redux/actionCreators";
import Button from "@material-ui/core/Button/Button";
import colors from "../../../../styles/colors";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
  button: {
    height: "100%",
    marginRight: theme.spacing(1),
    color: colors.presqtBlue
  }
}));

export default function RetryStartUploadOverButton({setActiveStep, setSelectedFile}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const submitRetry = () => {
    dispatch(actionCreators.upload.clearUploadData());
    dispatch(
      actionCreators.resources.removeFromErrorList(
        actionCreators.upload.uploadToTarget.toString()
      )
    );
    setSelectedFile(null);
    setActiveStep(0);
  };

  return (
    <Fragment>
      <Button color="primary" onClick={submitRetry} className={classes.button}>
        <span css={textStyles.buttonText}>Start Over</span>
      </Button>
    </Fragment>
  );
}
