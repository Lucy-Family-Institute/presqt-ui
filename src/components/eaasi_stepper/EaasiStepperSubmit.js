/** @jsx jsx */
import {jsx} from "@emotion/core";
import React, {Fragment} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import colors from "../../styles/colors";
import Button from "@material-ui/core/Button/Button";
import textStyles from "../../styles/text";
import {useDispatch, useSelector} from "react-redux";
import {actionCreators} from "../../redux/actionCreators";

const CustomEaasiButton = withStyles({
  root: {
    backgroundColor: colors.presqtBlue,
    "&:hover": {
      backgroundColor: "#0a4996"
    }
  }
})(Button);

export default function EaasiStepperSubmit({setActiveStep}) {
  const dispatch = useDispatch();

  const selectedResource = useSelector(state => state.selectedResource);
  const apiTokens = useSelector(state => state.apiTokens);
  const selectedTarget = useSelector(state => state.selectedTarget);

  const submitProposal = () => {
    dispatch(actionCreators.download.downloadResource(
      selectedResource,
      apiTokens[selectedTarget.name],
      true));
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  return (
    <Fragment>
      <div css={{paddingBottom:10}}>
        Send the contents of {selectedResource.title} to EaaSI.
        They will prepare the contents and return an image that can be run as an emulator.
      </div>
      <CustomEaasiButton
        onClick={submitProposal}
        variant="contained"
        color="primary"
      >
        <span css={textStyles.buttonText}>Send</span>
      </CustomEaasiButton>
    </Fragment>
  )
}