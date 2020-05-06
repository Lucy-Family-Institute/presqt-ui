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
import KeywordEnhancementList from "../widgets/list_items/KeywordEnhancementList";

const CustomKeywordButton = withStyles({
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
    dispatch(actionCreators.keywords.sendKeywords(selectedResource, targetToken, newKeywords));
    
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <Fragment>
      <KeywordList
        resources={keywords.keywords.sort(function(stringA, stringB) {return stringA.localeCompare(stringB)})}
        header={`The following keywords are currently associated with ${selectedResource.title}:`}
      />
      <KeywordEnhancementList
        keywords={keywords.enhanced_keywords.sort(function(stringA, stringB) {return stringA.localeCompare(stringB)})}
        header={`Select from the following SciGraph keywords to enhance your resource:`}
        setNewKeywords={setNewKeywords}
      />
      <CustomKeywordButton
        onClick={enhanceKeywords}
        variant="contained"
        color="primary"
        disabled={!newKeywords.length}
      >
        <span css={textStyles.buttonText}>Enhance Keywords</span>
      </CustomKeywordButton>
    </Fragment>
  );
}
