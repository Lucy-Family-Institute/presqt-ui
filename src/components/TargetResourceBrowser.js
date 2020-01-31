/** @jsx jsx */
import { keyframes } from "emotion";
import { jsx } from "@emotion/core";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "../redux/actionCreators";
import ResourceButton from "./widgets/ResourceButton";
import TargetResourcesHeader from "./widgets/TargetResourcesHeader";
import textStyles from "../styles/text";
import TargetSearch from "./TargetSearch";
import Spinner from "./widgets/Spinner";
import UploadActionButton from "./widgets/UploadActionButton";

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
export default function TargetResourceBrowser() {
  const dispatch = useDispatch();

  const sourceTargetToken = useSelector(state => state.targets.source
      ? state.authorization.apiTokens[state.targets.source.name]
      : null,);
  const sourceTargetResources = useSelector(state => state.resources.inSourceTarget);
  const pendingAPIOperations = useSelector(state => state.resources.pendingAPIOperations);
  const apiOperationErrors = useSelector(state => state.resources.apiOperationErrors);
  const sourceTarget = useSelector(state => state.targets.source);
  const sourceSearchValue = useSelector(state => state.resources.sourceSearchValue);

  const search_error = apiOperationErrors.find(
    element => element.action === actionCreators.resources.loadFromSourceTargetSearch.toString());

  /**
   * If clicked container is open then dispatch the closeContainer action to minimize the container
   * Else dispatch the openContainer action to expand the container
   * After the container action completes, dispatch selectSourceResource to fetch resource details
   *   -> Saga call to Resource Detail occurs here
   *      -> On complete saga dispatches the selectSourceResourceSuccess action
   */
  const onResourceClicked = (resource, sourceTargetToken) => {
    resource.kind === "container" && resource.open
      ? dispatch(actionCreators.resources.closeContainer(resource))
      : dispatch(actionCreators.resources.openContainer(resource));

    dispatch(actionCreators.resources.selectSourceResource(resource, sourceTargetToken));
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
    if (sourceTargetResources || sourceSearchValue) {
      return <TargetSearch />;
    }
  };

  const upload = () => {
    if (
      sourceTargetResources &&
      sourceTarget.supported_actions["resource_upload"] === true
    ) {
      return <UploadActionButton style={{width: 250}} text="Create New Project" type="NEW"/>;
    }
  };

  /**
   * Control what to display in the Target Resource Browser.
   */
  const targetResources = () => {
    return (
      // If resources exist for the user then display them
      sourceTargetResources && sourceTargetResources.length > 0 ? (
        resourceHierarchy(
          resource => onResourceClicked(resource, sourceTargetToken),
          sourceTargetResources
        )
      ) : // No resources exist with the given search term
      sourceTargetResources &&
        sourceTargetResources.length === 0 &&
        sourceSearchValue ? (
        <div css={[textStyles.body, { marginTop: 10 }]}>
          No {sourceTarget.readable_name} resources found for search term{" "}
          {sourceSearchValue}.
        </div>
      ) : // No resources exist for the user
      sourceTargetResources && sourceTargetResources.length === 0 ? (
        <div css={[textStyles.body, { marginTop: 10 }]}>
          No {sourceTarget.readable_name} resources found for this user.
        </div>
      ) : // An error was returned when searching the target
      search_error ? (
        <div css={[textStyles.body, { marginTop: 10 }, textStyles.cubsRed]}>
          {search_error.data}
        </div>
      ) : null
    );
  };

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
        {!sourceTarget
          ? null
          : sourceTarget.supported_actions.resource_upload === true
            ? upload()
        : null}
        {
          pendingAPIOperations.includes(actionCreators.resources.loadFromSourceTarget.toString())
          ||
          pendingAPIOperations.includes(actionCreators.resources.loadFromSourceTargetSearch.toString())
          ? <Spinner />
          : (
            <div>
              {targetResources()}
            </div>
          )
        }
      </div>
    </div>
  );
}
