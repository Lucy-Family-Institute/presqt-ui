/** @jsx jsx */
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { jsx } from "@emotion/core";
import textStyles from "../../../../styles/text";
import { actionCreators } from "../../../../redux/actionCreators";
import Button from "@material-ui/core/Button/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import colors from "../../../../styles/colors";

const useStyles = makeStyles(theme => ({
  button: {
    height: "100%",
    marginRight: theme.spacing(1),
    backgroundColor: colors.presqtBlue,
    "&:hover": {
      backgroundColor: colors.presqtBlueHover
    }
  }
}));

export default function RetryUploadButton({selectedFile, selectedDuplicate,
                                           setStepThreeContent, resourceToUploadTo}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const targetToken =
    useSelector(state => state.apiTokens[state.selectedTarget.name]);
  const selectedTarget = useSelector(state => state.selectedTarget.name);

  const submitRetry = () => {
    dispatch(actionCreators.upload.clearUploadData());
    dispatch(
      actionCreators.resources.removeFromErrorList(
        actionCreators.upload.uploadToTarget.toString()
      )
    );
    dispatch(
      actionCreators.upload.uploadToTarget(
        selectedTarget,
        selectedFile,
        selectedDuplicate,
        resourceToUploadTo,
        targetToken
      )
    );
    dispatch(actionCreators.upload.loadUploadProgress(targetToken));
    setStepThreeContent()
  };

  return (
    <Fragment>
      <Button
        component="span"
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={submitRetry}
      >
        <span css={textStyles.buttonText}>Retry Upload</span>
      </Button>
    </Fragment>
  );
}
