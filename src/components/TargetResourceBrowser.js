/** @jsx jsx */
import { keyframes } from "emotion";
import { jsx } from "@emotion/core";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "../redux/actionCreators";
import ResourceButton from "./widgets/buttons/ResourceButton";
import TargetResourcesHeader from "./widgets/headers/TargetResourcesHeader";
import textStyles from "../styles/text";
import Spinner from "./widgets/spinners/Spinner";
import UploadActionButton from "./action_buttons/UploadActionButton";

import { useState, React, useEffect } from "react";
import TargetSearch from "./TargetSearch";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  
  100% {
    opacity: 100;
  }
`;

/**
 * This component handles actions within the resource browser. It will open/close containers,
 * display resource details, as well as sort the hierarchy of resources.
 */
export default function TargetResourceBrowser({side, gridArea, target, targetResources}) {
  const dispatch = useDispatch();

  const targetToken = useSelector(state => target
    ? state.authorization.apiTokens[target.name] : null);
  const pendingAPIOperations = useSelector(state => state.resources.pendingAPIOperations);
  const apiOperationErrors = useSelector(state => state.resources.apiOperationErrors);
  const sideSelected = useSelector(state => state.resources.sideSelected);
  const searchValue = useSelector(state => side === 'left'
    ? state.resources.leftSearchValue : state.resources.rightSearchValue);

  const collection_error = apiOperationErrors.find(
    element => element.action === actionCreators.resources.loadFromTarget.toString());

  const search_error = apiOperationErrors.find(
    element => element.action === actionCreators.resources.loadFromTargetSearch.toString());

  const [messageCss, setMessageCss] = useState([textStyles.body, { marginTop: 10 }]);
  const [message, setMessage] = useState("");

  /**
   * If clicked container is open then dispatch the closeContainer action to minimize the container
   * Else dispatch the openContainer action to expand the container
   * After the container action completes, dispatch selectResource to fetch resource details
   *   -> Saga call to Resource Detail occurs here
   *      -> On complete saga dispatches the selectResourceSuccess action
   */
  const onResourceClicked = resource => {
    resource.kind === "container" && resource.open
      ? dispatch(actionCreators.resources.closeContainer(side, resource))
      : dispatch(actionCreators.resources.openContainer(side, resource));

    dispatch(actionCreators.resources.selectResource(side, resource, targetToken));
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

  /**
   * If a valid resource collection connection has been made or a search is being performed
   * then display the search input.
   **/
  const search = () => {
    if (targetResources || searchValue || collection_error) {
      if (collection_error) {
        if (collection_error.status === 401) {
          return null;
        }
      }
      return <TargetSearch side={side}/>;
    }
  };

  const upload = () => {
    if (targetResources || searchValue || collection_error) {
      if (collection_error) {
        if (collection_error.status === 401) {
          return null;
        }
      }
      return (
        <UploadActionButton
          style={{ width: 250 }}
          text="Create New Project"
          type="NEW"
          // If there is no search value and the target supports resource upload, this button is clickable.
          // Otherwise, it's disabled.
          disabled={!searchValue && target.supported_actions["resource_upload"] === true ? false : true}
        />
      );
    }
  };

  useEffect(() => {
    if (targetResources && targetResources.length > 0) {
      setMessage(resourceHierarchy(
        resource => onResourceClicked(resource), targetResources))
    }
    else if (targetResources && targetResources.length === 0 && searchValue) {
      setMessage(`No ${target.readable_name} resources found for search term 
        "${searchValue}".`);
    }
    else if (targetResources && targetResources.length === 0) {
      setMessage(`No ${target.readable_name} resources found for this user.`);
    }
    else if (search_error) {
      setMessageCss([textStyles.body, { marginTop: 10 }, textStyles.cubsRed]);
      setMessage(`${search_error.data}`);
    }
    else if (collection_error && collection_error.status !== 401) {
      setMessageCss([textStyles.body, { marginTop: 10 }, textStyles.cubsRed]);
      setMessage(`${collection_error.data}`);
    }
    else {
      setMessage('');
    }
  }, [targetResources]);

  return (
    <div
      css={{
        gridArea: {gridArea},
        paddingLeft: 50,
        paddingBottom: 50,
        minHeight: "25vh",
        flex: 1,
        display: "flex"
      }}
    >
      <div css={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <TargetResourcesHeader target={targetToken ? target : null}/>
        {search()}
        {/*{!target ? null : upload()}*/}
        {
          side === sideSelected
          &&
          (pendingAPIOperations.includes(actionCreators.resources.loadFromTarget.toString())
          ||
          pendingAPIOperations.includes(actionCreators.resources.loadFromTargetSearch.toString()))
            ? <Spinner />
            : <div css={messageCss}>{message}</div>
        }
      </div>
    </div>
  );
}
