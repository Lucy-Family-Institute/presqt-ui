/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../redux/actionCreators";
import Button from "@material-ui/core/Button/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import colors from "../../styles/colors";
import textStyles from "../../styles/text";
import { Fragment, useState } from "react";
import SearchTextField from "../widgets/text_fields/SearchTextField";

const CustomUploadButton = withStyles({
  root: {
    backgroundColor: colors.presqtBlue,
    "&:hover": {
      backgroundColor: "#0a4996",
    },
  },
})(Button);

/**
 * Component responsible for rendering the upload button in the upload stepper and passing the
 * selected file to the Upload API endpoint
 **/
export default function UploadButton({
  selectedFile,
  selectedDuplicate,
  handleNext,
  resourceToUploadTo,
  emailValue,
  setEmailValue
}) {
  const dispatch = useDispatch();

  const selectedTarget = useSelector((state) => state.selectedTarget);
  const targetToken = useSelector((state) => state.apiTokens[state.selectedTarget.name]);
  

  /**
   * When the upload button is pushed, dispatch the Upload action and update the stepper
   * index to move forward.
   **/
  const submitUpload = () => {
    dispatch(
      actionCreators.upload.uploadToTarget(
        selectedTarget.name,
        selectedFile,
        selectedDuplicate,
        resourceToUploadTo,
        targetToken,
        emailValue
      )
    );

    handleNext();
  };

  const emailKeystroke = (event) => {
    setEmailValue(event.target.value);
  };

  return (
    <Fragment>
      <div css={{ paddingBottom: 10 }}>
        You can input your email below and we will notify you once this upload is 
        complete. Inputing your email address is not mandatory and we will not
        store this information on the server once the process has finished.
      </div>
      <div css={{ paddingBottom: 10 }}>
        <SearchTextField
          size="small"
          type="text"
          id="outlined-basic"
          label="Email Address"
          variant="outlined"
          value={emailValue}
          onChange={(event) => emailKeystroke(event)}
        />
      </div>
      <CustomUploadButton
        onClick={submitUpload}
        variant="contained"
        color="primary"
      >
        <span css={textStyles.buttonText}>Upload</span>
      </CustomUploadButton>
    </Fragment>
  );
}
