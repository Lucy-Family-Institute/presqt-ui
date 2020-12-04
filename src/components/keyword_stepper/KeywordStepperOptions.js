/** @jsx jsx */
import { jsx } from "@emotion/core";
import React, { Fragment, useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import colors from "../../styles/colors";
import Button from "@material-ui/core/Button/Button";
import textStyles from "../../styles/text";
import { useSelector } from "react-redux";
import KeywordList from "../widgets/list_items/KeywordsList";
import KeywordEnhancementList from "../widgets/list_items/KeywordEnhancementList";
import Spinner from "../widgets/spinners/Spinner";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

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
  const keywordStatus = useSelector((state) => state.keywordStatus);

  const nextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    keywordStatus === 'getSuccess' && keywords.enhanced_keywords.length === 0
          ? 
          <div css={{paddingBottom: 15, display: 'flex', justifyContent: 'center'}}>
            <ErrorOutlineIcon color="error" style={{ minWidth: 56 }} />
            Found list of keywords assosciated with {selectedResource.title}, but Scigraph offered no enhancements.
          </div>
      : keywordStatus === 'getSuccess'
      ?
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
      : keywordStatus === 'getFailure'
        ?
          <div css={{paddingBottom: 15, display: 'flex', justifyContent: 'center'}}>
            <ErrorOutlineIcon color="error" style={{ minWidth: 56 }} />
            {keywords.error}
          </div>
        : keywordStatus === 'getSuccess' && keywords.enhanced_keywords.length === 0
          ? 
          <div css={{paddingBottom: 15, display: 'flex', justifyContent: 'center'}}>
            <ErrorOutlineIcon color="error" style={{ minWidth: 56 }} />
            Found list of keywords for {selectedResource.title}, but Scigraph offered no enhancements.
          </div>
        :
        <Fragment>
          <div css={{paddingBottom: 15, display: 'flex', justifyContent: 'center'}}>
            Gathering source keywords and enhanced keywords...
          </div>
          <Spinner />
        </Fragment>
  );
}