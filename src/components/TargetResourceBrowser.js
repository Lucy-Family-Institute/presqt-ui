/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "../redux/actionCreators";
import ResourceButton from "./widgets/buttons/ResourceButton";
import TargetResourcesHeader from "./widgets/headers/TargetResourcesHeader";
import textStyles from "../styles/text";
import TargetSearch from "./TargetSearch";
import Spinner from "./widgets/spinners/Spinner";
import UploadActionButton from "./action_buttons/UploadActionButton";
import { useState, React, useEffect } from "react";
import {basicFadeIn} from "../styles/animations";
import getError from "../utils/getError";

/**
 * This component handles actions within the resource browser. It will open/close containers,
 * display resource details, as well as sort the hierarchy of resources.
 **/
export default function TargetResourceBrowser() {
  const dispatch = useDispatch();

  const targetToken = useSelector(state => state.selectedTarget
      ? state.apiTokens[state.selectedTarget.name]
      : null);

  const targetResources = useSelector(state => state.targetResources);
  const pendingAPIOperations = useSelector(state => state.pendingAPIOperations);
  const apiOperationErrors = useSelector(state => state.apiOperationErrors);
  const selectedTarget = useSelector(state => state.selectedTarget);
  const searchValue = useSelector(state => state.searchValue);

  const collectionError = getError(actionCreators.resources.loadFromTarget);
  const searchError = getError(actionCreators.resources.loadFromTargetSearch);

  const [messageCss, setMessageCss] = useState([textStyles.body, { marginTop: 10 }]);
  const [message, setMessage] = useState("");

  /**
   * If clicked container is open then dispatch the closeContainer action to minimize the container
   * Else dispatch the openContainer action to expand the container
   * After the container action completes, dispatch selectResource to fetch resource details
   **/
  const onResourceClicked = (resource, targetToken) => {
    resource.kind === "container" && resource.open
      ? dispatch(actionCreators.resources.closeContainer(resource))
      : dispatch(actionCreators.resources.openContainer(resource));

    dispatch(actionCreators.resources.selectResource(resource, targetToken));
    dispatch(actionCreators.keywords.getKeywords(resource, targetToken));
  };

  /**
   * Recursively called function which is used to display the resource
   * hierarchy of a given target.
   **/
  const resourceHierarchy = (onResourceClicked, resources, level = 0) => {
    return resources.map(resource => {
      return (
        <div key={resource.id} css={{ animation: `${basicFadeIn} .5s ease` }}>
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

  /**
   * If a valid resource collection connection has been made or a search is being performed
   * then display the search input.
   **/
  const search = () => {
    if (collectionError && collectionError.status === 401) {
      return null;
    }
    else if (targetResources || searchValue) {
      return <TargetSearch />;
    }
  };

  const upload = () => {
    if (collectionError && collectionError.status === 401) {
      return null;
    }
    else if (targetResources || searchValue) {
      return (
        <UploadActionButton
          style={{ width: 250 }}
          text="Create New Project"
          type="NEW"
          // If there is no search value and the target supports resource upload, this button is clickable.
          // Otherwise, it's disabled.
          disabled={!searchValue && selectedTarget.supported_actions["resource_upload"] ? false : true}
        />
      );
    }
  };

  useEffect(() => {
    // If resources exist
    if (targetResources && targetResources.length > 0) {
      setMessage(resourceHierarchy(
        resource => onResourceClicked(resource, targetToken), targetResources))
    }
    // Search returned no results
    else if (targetResources && targetResources.length === 0 && searchValue) {
      setMessage(`No ${selectedTarget.readable_name} resources found for search term 
        "${searchValue}".`);
    }
    // No resources exist
    else if (targetResources && targetResources.length === 0) {
      setMessage(`No ${selectedTarget.readable_name} resources found for this user.`);
    }
    // Searched returned an error
    else if (searchError) {
      setMessageCss([textStyles.body, { marginTop: 10 }, textStyles.cubsRed]);
      setMessage(`${searchError.data}`);
    }
    // Resource collection returns an error
    else if (collectionError && collectionError.status !== 401) {
      setMessageCss([textStyles.body, { marginTop: 10 }, textStyles.cubsRed]);
      setMessage(`${collectionError.data}`);
    }
    else {
      setMessage('');
    }
  }, [targetResources, apiOperationErrors]);

  return (
    <div
      css={{
        gridArea: "targetResources",
        paddingLeft: 50,
        paddingBottom: 50,
        minHeight: "25vh",
        flex: 1,
        display: "flex"
      }}
    >

      <div css={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <TargetResourcesHeader />
        {search()}
        {!selectedTarget ? null : upload()}
        {pendingAPIOperations.includes(
          actionCreators.resources.loadFromTarget.toString()
        ) ||
        pendingAPIOperations.includes(
          actionCreators.resources.loadFromTargetSearch.toString()
        ) ? <Spinner />
          : (
            <div css={messageCss}>{message}</div>
        )}
      </div>
    </div>
  );
}
