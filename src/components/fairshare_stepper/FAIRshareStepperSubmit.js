/** @jsx jsx */
import { jsx } from "@emotion/core";
import React, { Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import colors from "../../styles/colors";
import Button from "@material-ui/core/Button/Button";
import textStyles from "../../styles/text";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../redux/actionCreators";

const CustomFairshareButton = withStyles({
  root: {
    backgroundColor: colors.presqtBlue,
    "&:hover": {
      backgroundColor: "#0a4996",
    },
  },
})(Button);

export default function FAIRshareStepperSubmit({ setActiveStep }) {
  const dispatch = useDispatch();

  const selectedResource = useSelector((state) => state.selectedResource);

  const submitEvaluation = () => {
    dispatch(actionCreators.fairshare.sendFairshareEvaluation(selectedResource.doi));
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <Fragment>
      <div css={{ paddingBottom: 10 }}>
        Submit a FAIRshare Evaluator request for <i>{selectedResource.title}</i> with
        doi <i>{selectedResource.doi}</i>. They will return the results of a number
        of tests identified as of interest to the PresQT community.
      </div>
      <CustomFairshareButton
        onClick={submitEvaluation}
        variant="contained"
        color="primary"
      >
        <span css={textStyles.buttonText}>Evaluate</span>
      </CustomFairshareButton>
    </Fragment>
  );
}
