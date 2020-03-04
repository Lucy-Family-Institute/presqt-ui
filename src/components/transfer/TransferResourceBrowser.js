/** @jsx jsx */
import React, {useEffect, useState} from "react";
import { jsx, } from "@emotion/core";
import {actionCreators} from "../../redux/actionCreators";
import Spinner from "../widgets/spinners/Spinner";
import {useDispatch, useSelector} from "react-redux";
import TransferResourceButton from "./TransferResourceButton";
import TransferResourcesHeader from "./TransferResourcesHeader";
import textStyles from "../../styles/text";
import {basicFadeIn} from "../../styles/animations";

export default function TransferResourceBrowser() {
  const dispatch = useDispatch();

  const available = useSelector(state => state.available);
  const pendingAPIOperations = useSelector(state => state.pendingAPIOperations);
  const transferTargetResources = useSelector(state => state.transferTargetResources);
  const apiOperationErrors = useSelector(state => state.apiOperationErrors);
  const transferDestinationToken = useSelector(state => state.transferDestinationToken);
  const transferDestinationTarget = useSelector(state => state.transferDestinationTarget);

  const collectionError = apiOperationErrors.find(
    element => element.action === actionCreators.transfer.loadFromTransferTarget.toString());

  const [messageCss, setMessageCss] = useState([textStyles.body, { marginTop: 15 }]);
  const [message, setMessage] = useState("");

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
    if (transferTargetResources && transferTargetResources.length > 0) {
      setMessage(resourceHierarchy(
        resource => onResourceClicked(resource, transferDestinationToken),
        transferTargetResources))
    }
    else if (transferTargetResources && transferTargetResources.length === 0) {
      let targetReadableName = '';
      for (let i = 0; i < available.length; i++) {
        if (available[i].name === transferDestinationTarget) {
          targetReadableName = available[i].readable_name
        }
      }
      setMessage(`No ${targetReadableName} resources found for this user.`);
    }
    else if (collectionError){
      setMessageCss([textStyles.body, { marginTop: 15 }, textStyles.cubsRed]);
      setMessage(`${collectionError.data}`);
    }
    else {
      setMessage('');
    }
  }, [transferTargetResources, collectionError]);

  return (
    <div css={{
      minHeight: "25vh",
      flex: 1,
      display: "flex"}}>
      <div css={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <TransferResourcesHeader />
        {pendingAPIOperations.includes(actionCreators.transfer.loadFromTransferTarget.toString())
          ? <Spinner />
          :
            <div css={messageCss}>
              {message}
            </div>
        }
      </div>
    </div>
  )
}