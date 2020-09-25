/** @jsx jsx */
import React, {useEffect, useState, Fragment} from "react";
import { jsx, } from "@emotion/core";
import { actionCreators } from "../../redux/actionCreators";
import { makeStyles } from "@material-ui/core/styles";
import Spinner from "../widgets/spinners/Spinner";
import {useDispatch, useSelector} from "react-redux";
import TransferResourceButton from "./TransferResourceButton";
import TransferResourcesHeader from "./TransferResourcesHeader";
import textStyles from "../../styles/text";
import {basicFadeIn} from "../../styles/animations";
import getError from "../../utils/getError";
import Pagination from "@material-ui/lab/Pagination";
import colors from "../../styles/colors";
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  root: {
    width: "75%",
    paddingTop: 10,
    paddingBottom: 45,
    "& .Mui-selected": {
      backgroundColor: colors.presqtBlue,
      "&:hover": {
        backgroundColor: colors.presqtBlueHover,
      },
    },
  },
}));

export default function TransferResourceBrowser({setTransferPageNumber, transferPageNumber}) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const available = useSelector(state => state.available);
  const pendingAPIOperations = useSelector(state => state.pendingAPIOperations);
  const transferTargetResources = useSelector(state => state.transferTargetResources);
  const transferTargetResourcesPages = useSelector(state => state.transferTargetResourcesPages);
  const transferDestinationToken = useSelector(state => state.transferDestinationToken);
  const transferDestinationTarget = useSelector(state => state.transferDestinationTarget);
  const transferStatus = useSelector(state => state.transferStatus)

  const collectionError = getError(actionCreators.transfer.loadFromTransferTarget);

  const [messageCss, setMessageCss] = useState([textStyles.body, { marginTop: 15 }]);
  const [message, setMessage] = useState("");
  const [manualTransferPageNumber, setManualTransferPageNumber] = useState("1");

  /**
   * If clicked container is open then dispatch the closeContainer action to minimize the container
   * Else dispatch the openContainer action to expand the container
   * After the container action completes, dispatch selectResource to fetch resource details
   *   -> Saga call to Resource Detail occurs here
   *      -> On complete saga dispatches the selectResourceSuccess action
   */
  const onResourceClicked = (resource, targetToken) => {
    resource.kind === "container" && resource.open
      ? dispatch(actionCreators.transfer.closeTransferContainer(resource))
      : dispatch(actionCreators.transfer.openTransferContainer(resource));

    dispatch(actionCreators.transfer.selectTransferResource(resource, targetToken));
  };

  /**
   * Recursively called function which is used to display the resource
   * hierarchy of a given target.
   */
  const resourceHierarchy = (onResourceClicked, resources, level = 0) => {
    return resources.map(resource => {
      return (
        <div key={resource.id} css={{ paddingTop: 10, animation: `${basicFadeIn} .5s ease` }}>
          <TransferResourceButton
            resource={resource}
            level={level}
            onClick={onResourceClicked}
          />
          {resource.kind === "container" &&
          resource.open === true &&
          resource.children
            ? resourceHierarchy(onResourceClicked, resource.children, level + 1)
            : null}
        </div>
      );
    });
  };

  useEffect(() => {
    let new_message_css = [textStyles.body, { marginTop: 15 }]
    // Display Resources
    if (transferTargetResources && transferTargetResources.length > 0) {
      setMessage(resourceHierarchy(
        resource => onResourceClicked(resource, transferDestinationToken),
        transferTargetResources))
    }
    // No resources exist
    else if (transferTargetResources && transferTargetResources.length === 0) {
      let targetReadableName = '';
      for (let i = 0; i < available.length; i++) {
        if (available[i].name === transferDestinationTarget) {
          targetReadableName = available[i].readable_name
        }
      }
      setMessage(`No ${targetReadableName} resources found for this user.`);
    }
    // Collection error occurred
    else if (collectionError){
      new_message_css = [textStyles.body, { marginTop: 15 }, textStyles.cubsRed];
      setMessage(`${collectionError.data}`);
    }
    else {
      setMessage('');
    }
    setMessageCss(new_message_css)
  }, [transferTargetResources, collectionError]);

  const handlePageChange = (event, value) => {
    setTransferPageNumber(value);
    // Make call to get page selected resources
    dispatch(
      actionCreators.transfer.loadFromTransferTargetPagination(
        transferTargetResourcesPages.base_page,
        value,
        transferDestinationToken
      )
    );
    setManualTransferPageNumber(value.toString());
  };

  const handleManualPageChange = (event, value) => {
    console.log("hERE");
    setTransferPageNumber(parseInt(value));
    dispatch(
      actionCreators.transfer.loadFromTransferTargetPagination(
        transferTargetResourcesPages.base_page,
        parseInt(value),
        transferDestinationToken
      ));
  }

  return (
    <div css={{
      minHeight: "25vh",
      flex: 1,
      display: "flex"}}>
      <div css={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <TransferResourcesHeader />
        {pendingAPIOperations.includes(actionCreators.transfer.loadFromTransferTarget.toString())
          ||
          pendingAPIOperations.includes(
            actionCreators.transfer.loadFromTransferTargetPagination.toString()
          )
          ? <Spinner />
          :
            <div css={messageCss}>
              {message}
            </div>
        }
        {!transferTargetResourcesPages ? null : (
          <Fragment>
          <div style={{paddingTop: 30, paddingLeft: 8}}>
            <Typography
              style={{ fontSize: 12 }}>
                Page: <input
                type="number"
                placeholder={transferPageNumber}
                size="3"
                maxLength="3"
                min="1"
                max={transferTargetResourcesPages.total_pages}
                value={manualTransferPageNumber}
                onChange={event => setManualTransferPageNumber(event.target.value)}
                  onKeyDown={(event) => {
                    event.keyCode === 13 && manualTransferPageNumber !== '' && parseInt(manualTransferPageNumber) <= transferTargetResourcesPages.total_pages
                      ? handleManualPageChange(event, event.target.value)
                      : null
                  }} />
            </Typography>
          </div>
          <Pagination
            classes={{ root: classes.root }}
            count={transferTargetResourcesPages.total_pages}
            size="small"
            showFirstButton
            showLastButton
            siblingCount={0}
            color="primary"
            page={transferPageNumber}
            onChange={handlePageChange}
            disabled={transferStatus && transferStatus === ('pending' || 'success') }
            />
          </Fragment>
        )}
      </div>
    </div>
  )
}
