/** @jsx jsx */
import { jsx } from "@emotion/core";
import React, { Fragment, useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import colors from "../../styles/colors";
import Button from "@material-ui/core/Button/Button";
import textStyles from "../../styles/text";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../redux/actionCreators";
import KeywordList from "../widgets/list_items/KeywordsList";
import CheckboxList from "../widgets/list_items/KeywordEnhancementList";

const CustomEaasiButton = withStyles({
  root: {
    backgroundColor: colors.presqtBlue,
    "&:hover": {
      backgroundColor: "#0a4996",
    },
  },
})(Button);

export default function KeywordStepperSubmit({ setActiveStep, setNewKeywords, newKeywords }) {
  const dispatch = useDispatch();

  const selectedResource = useSelector((state) => state.selectedResource);
  const targetToken = useSelector((state) =>
    state.selectedTarget ? state.apiTokens[state.selectedTarget.name] : null
  );
  const keywords = useSelector((state) => state.keywords);

  const enhanceKeywords = () => {
    // Add call to get initial tags
    dispatch(actionCreators.keywords.sendKeywords(selectedResource, targetToken, newKeywords));
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <Fragment>
      <KeywordList
        resources={keywords.keywords}
        header={`The following keywords are currently assosciated with ${selectedResource.title}:`}
      />
      <CheckboxList
        keywords={keywords.enhanced_keywords}
        header={`SciGraph has suggested the following keywords:`}
        setNewKeywords={setNewKeywords}
      />
      <CustomEaasiButton
        onClick={enhanceKeywords}
        variant="contained"
        color="primary"
      >
        <span css={textStyles.buttonText}>Enhance Keywords</span>
      </CustomEaasiButton>
    </Fragment>
  );
}
