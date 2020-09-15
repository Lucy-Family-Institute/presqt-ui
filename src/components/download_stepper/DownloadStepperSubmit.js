/** @jsx jsx */
import {Fragment, useState} from "react";
import textStyles from "../../styles/text";
import {jsx} from "@emotion/core";
import withStyles from "@material-ui/core/styles/withStyles";
import colors from "../../styles/colors";
import Button from "@material-ui/core/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {actionCreators} from "../../redux/actionCreators";
import SearchTextField from "../widgets/text_fields/SearchTextField";

const CustomDownloadButton = withStyles({
  root: {
    backgroundColor: colors.presqtBlue,
    "&:hover": {
      backgroundColor: "#0a4996"
    }
  }
})(Button);

export default function DownloadStepperSubmit({setActiveStep, setEmailValue, emailValue}) {
  const dispatch = useDispatch();

  const targetToken = useSelector(state => state.apiTokens[state.selectedTarget.name]);
  const selectedResource = useSelector(state => state.selectedResource);

  const submitDownload = () => {
    dispatch(actionCreators.download.downloadResource(selectedResource, targetToken, false, emailValue));
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const emailKeystroke = (event) => {
    setEmailValue(event.target.value);
  };

  return (
    <Fragment>
      <div css={{paddingBottom:10}}>
        You can input your email below and we will notify you once this download is complete. The zip will be 
        attached. Inputing your email is not mandatory and we will not store this information on the server once the process has 
        finished.
      </div>
      <div css={{paddingBottom:10}}>
        <SearchTextField
          size="small"
          type="text"
          id="outlined-basic"
          label="Email Address"
          variant="outlined"
          value={emailValue}
          onChange={event => emailKeystroke(event)}
        />
      </div>
      <CustomDownloadButton
        onClick={submitDownload}
        variant="contained"
        color="primary"
      >
        <span css={textStyles.buttonText}>Download</span>
      </CustomDownloadButton>
    </Fragment>
  )
}