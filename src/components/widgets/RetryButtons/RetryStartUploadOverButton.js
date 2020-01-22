/** @jsx jsx */
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { jsx } from "@emotion/core";
import textStyles from "../../../styles/text";
import colors from "../../../styles/colors";
import { actionCreators } from "../../../redux/actionCreators";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button/Button";

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    color: colors.presqtBlue
  }
}));

export default function RetryStartUploadOverButton(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const submitRetry = () => {
    dispatch(actionCreators.resources.clearUploadData());
    dispatch(
      actionCreators.resources.removeFromErrorList(
        actionCreators.resources.uploadToSourceTarget.toString()
      )
    );
    props.setSelectedFile(null);
    props.setActiveStep(0);
  };

  return (
    <Fragment>
      <Button color="primary" onClick={submitRetry} className={classes.button}>
        <span css={textStyles.buttonText}>Start Over</span>
      </Button>
    </Fragment>
  );
}
