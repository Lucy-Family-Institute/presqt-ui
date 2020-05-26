import Spinner from "../widgets/spinners/Spinner";
import useDefault from "../../hooks/useDefault";
import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import KeywordList from "../widgets/list_items/KeywordsList";
import colors from "../../styles/colors";
import getError from "../../utils/getError";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { actionCreators } from "../../redux/actionCreators";
import Button from "@material-ui/core/Button/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import textStyles from "../../styles/text";
import SuccessListItem from "../widgets/list_items/SuccessListItem";
import List from "@material-ui/core/List";

const CustomKeywordButton = withStyles({
  root: {
    backgroundColor: colors.presqtBlue,
    "&:hover": {
      backgroundColor: "#0a4996",
    },
  },
})(Button);

export default function KeywordStepperResults({ newKeywords }) {
  const dispatch = useDispatch();
  
  const apiOperationErrors = useSelector((state) => state.apiOperationErrors);
  const selectedResource = useSelector((state) => state.selectedResource);
  const updatedKeywords = useSelector((state) => state.updatedKeywords);
  const keywordStatus = useSelector((state) => state.keywordStatus);
  const keywordPostError = getError(actionCreators.keywords.sendKeywords);
  const targetToken = useSelector((state) =>
    state.selectedTarget ? state.apiTokens[state.selectedTarget.name] : null
  );
  // This resource is needed to refresh the detail
  const targetResources = useSelector(state => state.targetResources);
  const resource = targetResources.find(resource => resource.id === selectedResource.id);

  const [stepContent, setStepContent] = useDefault(
    <div>
      <Spinner />
    </div>
  );

  const retryKeywords = () => {
    setStepContent();
    if (apiOperationErrors.length > 0 && keywordPostError) {
      dispatch(
        actionCreators.resources.removeFromErrorList(
          actionCreators.keywords.sendKeywords.toString()
        )
      );
    }
    dispatch(
      actionCreators.keywords.sendKeywords(
        selectedResource,
        targetToken,
        newKeywords
      )
    );
  };

  useEffect(() => {
    if (keywordStatus === "postSuccess") {
      setStepContent(
        <Fragment>
          <List dense={true}>
            <SuccessListItem message={"Keywords Enhanced Successfully!"}/>
          </List>
          <KeywordList
            resources={updatedKeywords.keywords_added.sort(function(stringA, stringB) {return stringA.localeCompare(stringB)})}
            header={`The following keywords were added to ${selectedResource.title}:`}
          />
          <KeywordList
            resources={updatedKeywords.final_keywords.sort(function(stringA, stringB) {return stringA.localeCompare(stringB)})}
            header={`The following are all keywords for ${selectedResource.title}:`}
          />
        </Fragment>
      );
      dispatch(actionCreators.resources.selectResource(resource, targetToken))
      dispatch(actionCreators.keywords.getKeywords(resource, targetToken));
    }
    else if (keywordStatus === "postFailure") {
      setStepContent(
        <Fragment>
          <div
            style={{ display: "flex", justifyContent: "center", padding: 10 }}
          >
            <div
              style={{
                paddingTop: 20,
                paddingBottom: 20,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ErrorOutlineIcon color="error" />
              <span style={{ marginLeft: 5, color: colors.chevelleRed }}>
                {keywordPostError.data.error}
              </span>
            </div>
          </div>
          <div
            style={{ display: "flex", justifyContent: "center", padding: 5 }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CustomKeywordButton
                onClick={retryKeywords}
                variant="contained"
                color="primary"
              >
                <span css={textStyles.buttonText}>Retry</span>
              </CustomKeywordButton>
            </div>
          </div>
        </Fragment>
      );
    }
  }, [keywordStatus]);

  return stepContent;
}
