/** @jsx jsx */
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { jsx } from "@emotion/core";
import textStyles from "../../../../styles/text";
import { actionCreators } from "../../../../redux/actionCreators";
import Button from "@material-ui/core/Button/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import colors from "../../../../styles/colors";
import Spinner from "../../spinners/Spinner";
import CancelButton from "../../buttons/CancelButton";


const useStyles = makeStyles(theme => ({
  button: {
    height: "100%",
    marginRight: theme.spacing(1),
    backgroundColor: colors.presqtBlue,
    "&:hover": {
      backgroundColor: colors.presqtBlueHover
    }
  }
}));

/**
 * This component handles the download action button in the TargetActions component.
 * It is responsible for dispatching the action that will make the download API call and open
 * a modal to display the download status.
 **/
export default function RetryDownloadButton({setModalContent}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const targetToken = useSelector(state => state.apiTokens[state.selectedTarget.name]);
  const selectedResource = useSelector(state => state.selectedResource);

  const submitRetry = () => {
      dispatch(actionCreators.download.clearDownloadData());

      dispatch(actionCreators.resources.removeFromErrorList(
        actionCreators.download.downloadResource.toString()));

      dispatch(actionCreators.download.downloadResource(selectedResource, targetToken, false));
      // START UP THE SPINNER  
      dispatch(actionCreators.download.loadDownloadProgress(targetToken));

      setModalContent(
        <div>
          <div css={{ paddingBottom: 15, display: 'flex',  justifyContent:'center' }}>
            <p>The download is being processed on the server.</p>
          </div>
          <Spinner />
          <div css={{paddingTop: 15, paddingBottom: 15, display: 'flex',  justifyContent:'center'}}>
            <CancelButton actionType='DOWNLOAD' />
          </div>
        </div>);
    };

  return (
    <Fragment>
      <Button variant="contained" color="primary" className={classes.button} onClick={submitRetry}>
        <span css={textStyles.buttonText}>Retry Download</span>
      </Button>
    </Fragment>
  );
}