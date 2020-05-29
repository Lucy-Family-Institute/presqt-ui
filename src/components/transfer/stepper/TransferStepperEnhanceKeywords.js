/** @jsx jsx */
import {jsx} from "@emotion/core";
import React, {Fragment, useEffect, useState} from "react";
import Spinner from "../../widgets/spinners/Spinner";
import {useSelector} from "react-redux";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import colors from "../../../styles/colors";
import getError from "../../../utils/getError";
import {actionCreators} from "../../../redux/actionCreators";
import List from "@material-ui/core/List";
import SuccessListItem from "../../widgets/list_items/SuccessListItem";
import KeywordList from "../../widgets/list_items/KeywordsList";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";

export default function TransferStepperEnhanceKeywords({}) {
  const sourceKeywordStatus = useSelector((state) => state.sourceKeywordStatus);
  const destinationKeywordStatus = useSelector((state) => state.destinationKeywordStatus);
  const sourceUpdatedKeywords = useSelector((state) => state.sourceUpdatedKeywords);
  const destinationUpdatedKeywords = useSelector((state) => state.destinationUpdatedKeywords);
  const selectedTarget = useSelector(state => state.selectedTarget);
  const transferDestinationTarget = useSelector(state => state.transferDestinationTarget);

  let targetReadableName = '';
  const available = useSelector(state => state.available);
  for (let i = 0; i < available.length; i++) {
    if (available[i].name === transferDestinationTarget) {
      targetReadableName = available[i].readable_name
    }
  }

  const sourceKeywordPostError = getError(`source-${actionCreators.keywords.sendTransferKeywords}`);
  const destinationKeywordPostError = getError(`destination-${actionCreators.keywords.sendTransferKeywords}`);

  const [content, setContent] = useState(
    <div>
      <div css={{paddingBottom: 15, display: 'flex', justifyContent: 'center'}}>
        Keyword Enhancement in progress.
      </div>
      <div css={{paddingBottom: 15, display: 'flex', verticalAlign: 'middle', textAlign: 'center', justifyContent: 'center'}}>
        If you refresh or leave the page the keyword enhancement will still continue.
      </div>
      <Spinner />
    </div>
  );

  useEffect(() => {
    if (sourceKeywordStatus !== "postPending" && destinationKeywordStatus !== "postPending") {
      setContent(
        <Fragment>
          <List dense={true}
            subheader={
              <ListSubheader component="div" id="nested-list-subheader" disableSticky={true}>
               Source Keyword Enhancement Results
              </ListSubheader>
            }
          >
            {
              sourceKeywordStatus === "postSuccess"
                ?
                <Fragment>
                  <SuccessListItem message={`${selectedTarget.readable_name} Keywords Enhanced Successfully!`}/>
                  <KeywordList
                    resources={sourceUpdatedKeywords.keywords_added.sort(function (stringA, stringB) {
                      return stringA.localeCompare(stringB)
                    })}
                    header={`The following keywords were added to ${selectedTarget.readable_name}:`}
                    colNumber={1}
                  />
                </Fragment>
                : sourceKeywordStatus === "postFailure"
                ?
                  <ListItem>
                    <ListItemIcon>
                      <ErrorOutlineIcon color="error"/>
                    </ListItemIcon>
                    <ListItemText
                      primary={sourceKeywordPostError.data.error}
                    />
                  </ListItem>
                : null
            }
          </List>
          <List
            dense={true}
            subheader={
              <ListSubheader component="div" id="nested-list-subheader" disableSticky={true}>
                Destination Keyword Enhancement Results
              </ListSubheader>
            }
          >
            {
              destinationKeywordStatus === "postSuccess"
                ? <Fragment>
                    <SuccessListItem message={`${targetReadableName} Keywords Enhanced Successfully!`}/>
                    <KeywordList
                      // resources={SubtractArray(destinationUpdatedKeywords.final_keywords, destinationUpdatedKeywords.initial_keywords.keywords).sort(function (stringA, stringB) {
                      resources={destinationUpdatedKeywords.final_keywords.filter(x => !destinationUpdatedKeywords.initial_keywords.keywords.includes(x)).sort(function (stringA, stringB) {
                        return stringA.localeCompare(stringB)
                      })}
                      header={`The following keywords were added to ${targetReadableName}:`}
                      colNumber={1}
                    />
                  </Fragment>
                : sourceKeywordStatus === "postFailure"
                ?
                  <ListItem>
                    <ListItemIcon>
                      <ErrorOutlineIcon color="error"/>
                    </ListItemIcon>
                    <ListItemText
                      primary={destinationKeywordPostError.data.error}
                    />
                  </ListItem>
                : null
            }
          </List>
        </Fragment>
      );
    }
  }, [sourceKeywordStatus, destinationKeywordStatus]);

  return (content)
}