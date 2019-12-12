/** @jsx jsx */
import { keyframes } from 'emotion';
import { jsx } from '@emotion/core';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators } from '../redux/actionCreators';
import ResourceButton from './widgets/ResourceButton';
import TargetResourcesHeader from './widgets/TargetResourcesHeader';
import textStyles from '../styles/text';
import TargetSearch from "./TargetSearch";
import Spinner from "./widgets/spinner";

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

 /**
  * sourceTargetToken     : String user token if a source exists else null
  * sourceTargetResources : Array containing source target resources in hierarchical order
  * pendingAPIOperations  : Boolean representing if a pending API operation exists
  * apiOperationErrors    : List of objects of current api errors
  * sourceTarget          : Object of the current source selected
  * sourceSearchValue     : Search term last submitted in the source search input
  */
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
  const token_error = apiOperationErrors.find(
    element => element.action === actionCreators.resources.loadFromSourceTarget.toString());

  /**
  * If clicked container is open then dispatch the closeContainer action to minimize the container
  * Else dispatch the openContainer action to expand the container
  * After the container action completes, dispatch selectSourceResource to fetch resource details
  *   -> Saga call to Resource Detail occurs here
  *      -> On complete saga dispatches the selectSourceResourceSuccess action
  */
  const onResourceClicked = (resource, sourceTargetToken) => {
    resource.kind === 'container' && resource.open
      ? dispatch(actionCreators.resources.closeContainer(resource))
      : dispatch(actionCreators.resources.openContainer(resource));

    dispatch(
      actionCreators.resources.selectSourceResource(resource, sourceTargetToken)
    );
  };

  /**
   * Recursively called function which is used to display the resource
   * hierarchy of a given target.
   */
  const resourceHierarchy = (onResourceClicked, resources, level = 0) => {
    return (
      resources.map(resource => {
        return (
          <div key={resource.id} css={{animation: `${fadeIn} .5s ease`}}>
            <ResourceButton
              resource={resource}
              level={level}
              onClick={onResourceClicked}
            />
            {resource.kind === 'container' &&
            resource.open === true &&
            resource.children
              ? resourceHierarchy(onResourceClicked, resource.children, level + 1)
              : null}
          </div>
        );
      }));
  };

  const search = () => {
    if (sourceTargetToken && !apiOperationErrors.find(element =>
                    element.action === actionCreators.resources.loadFromSourceTarget.toString())) {
      return <TargetSearch />
    }
  };

  const targetResources = () => {
    return (
      sourceTargetResources.length > 0
        ? resourceHierarchy(resource =>
          onResourceClicked(resource, sourceTargetToken), sourceTargetResources)
        : search_error
          ? <div css={[textStyles.body, textStyles.noResourcesFound, textStyles.cubsRed]}>
              {search_error.data}
            </div>
        : sourceSearchValue
          ? <div css={[textStyles.body, textStyles.noResourcesFound]}>
              No {sourceTarget.readable_name} resources found for search term {sourceSearchValue}.
            </div>
        : sourceTarget && sourceTargetToken && !token_error
          ? <div css={[textStyles.body, textStyles.noResourcesFound]}>
              No {sourceTarget.readable_name} resources found for this user.
            </div>
        : null
    )
  };

  return (
    <div
      css={{
        gridArea: 'targetResources',
        paddingLeft: 50,
        paddingBottom: 50,
        minHeight: '25vh',
        flex: 1,
        display: 'flex'
      }}
    >
      <div css={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <TargetResourcesHeader />
        {
          pendingAPIOperations.includes(actionCreators.resources.loadFromSourceTarget.toString())
          ||
          pendingAPIOperations.includes(
            actionCreators.resources.loadFromSourceTargetSearch.toString())
          ? <Spinner />
          : (
              <div>
                {search()}
                {targetResources()}
              </div>
            )
        }
      </div>
    </div>
  );
}
