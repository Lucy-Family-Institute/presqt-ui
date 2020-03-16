/** @jsx jsx */
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { jsx } from "@emotion/core";
import textStyles from "../../../../styles/text";
import buttonStyles from "../../../../styles/buttons";
import { actionCreators } from "../../../../redux/actionCreators";
import Button from "@material-ui/core/Button/Button";

/**
 * This component handles the download action button in the TargetActions component.
 * It is responsible for dispatching the action that will make the download API call and open
 * a modal to display the download status.
 **/
export default function RetryDownloadButton({setModalContent, setModalHeader}) {
  const classes = buttonStyles.RetryDownload();
  const dispatch = useDispatch();

  const targetToken = useSelector(state => state.apiTokens[state.selectedTarget.name]);
  const selectedResource = useSelector(state => state.selectedResource);

  const submitRetry = () => {
      dispatch(actionCreators.download.clearDownloadData());

      dispatch(actionCreators.resources.removeFromErrorList(
        actionCreators.download.downloadResource.toString()));

      dispatch(actionCreators.download.downloadResource(selectedResource, targetToken));

      setModalContent();
      setModalHeader();
    };

  return (
    <Fragment>
      <Button variant="contained" color="primary" className={classes.button} onClick={submitRetry}>
        <span css={textStyles.buttonText}>Retry Download</span>
      </Button>
    </Fragment>
  );
}