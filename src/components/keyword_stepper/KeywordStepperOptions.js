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

export default function KeywordStepperOptions({ setActiveStep, setNewKeywords, newKeywords }) {
  const selectedResource = useSelector((state) => state.selectedResource);
  const keywords = useSelector((state) => state.keywords);

  const nextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <Fragment>
      <KeywordList
        resources={keywords.keywords.sort(function(stringA, stringB) {return stringA.localeCompare(stringB)})}
        header={`The following keywords are currently associated with ${selectedResource.title}:`}
        colNumber={2}
      />
      <KeywordEnhancementList
        keywords={keywords.enhanced_keywords.sort(function(stringA, stringB) {return stringA.localeCompare(stringB)})}
        header="Select from the following SciGraph keywords to enhance your resource:"
        setNewKeywords={setNewKeywords}
        newKeywords={newKeywords}
      />
      <CustomKeywordButton
        onClick={nextStep}
        variant="contained"
        color="primary"
        disabled={!newKeywords.length}
      >
        <span css={textStyles.buttonText}>Next</span>
      </CustomKeywordButton>
    </Fragment>
  );
}
