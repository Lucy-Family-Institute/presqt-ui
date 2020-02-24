/** @jsx jsx */
import React, {useEffect, useState} from "react";
import { jsx } from "@emotion/core";
import {actionCreators} from "../../redux/actionCreators";
import Spinner from "../widgets/spinners/Spinner";
import {useSelector} from "react-redux";
import ResourceButton from "../widgets/buttons/ResourceButton";

export default function TransferResourceBrowser({destinationTarget, destinationToken}) {
  const pendingAPIOperations = useSelector(state => state.resources.pendingAPIOperations);
  const transferTargetResources = useSelector(state => state.resources.transferTargetResources);

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
      ? dispatch(actionCreators.resources.closeContainer(resource))
      : dispatch(actionCreators.resources.openContainer(resource));

    dispatch(actionCreators.resources.selectResource(resource, targetToken));
  };

  /**
   * Recursively called function which is used to display the resource
   * hierarchy of a given target.
   */
  const resourceHierarchy = (onResourceClicked, resources, level = 0) => {
    return resources.map(resource => {
      return (
        <div key={resource.id} css={{ animation: `${fadeIn} .5s ease` }}>
          <ResourceButton
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
        resource => onResourceClicked(resource, destinationTargetToken),
        transferTargetResources))
    }
    else {
      setMessage('');
    }
  }, [transferTargetResources]);

  return (
    destinationToken ?
      <div>
        {pendingAPIOperations.includes(actionCreators.resources.loadFromTransferTarget.toString())
        ? <Spinner />
        :
        <div>
          {message}
        </div>
        }
      </div>
    : null
  )
}