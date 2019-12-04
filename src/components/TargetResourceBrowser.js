/** @jsx jsx */
import { keyframes } from 'emotion';
import { jsx } from '@emotion/core';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { actionCreators } from '../redux/actionCreators';
import ResourceButton from './widgets/ResourceButton';
import TargetResourcesHeader from './widgets/TargetResourcesHeader';
import textStyles from '../styles/text';

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
  */
  const sourceTargetToken = useSelector(state => state.targets.source
      ? state.authorization.apiTokens[state.targets.source.name]
      : null,);
  const sourceTargetResources = useSelector(state => state.resources.inSourceTarget);
  const pendingAPIOperations = useSelector(state => state.resources.pendingAPIOperations);

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
    return resources.map(resource => {
      return (
        <div key={resource.id} css={{ animation: `${fadeIn} .5s ease` }}>
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
    });
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
        {pendingAPIOperations.includes(
          actionCreators.resources.loadFromSourceTarget.toString()
        ) ? (
          <div
            css={{
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              animation: `${fadeIn} 3s ease`
            }}
          >
            <FontAwesomeIcon
              icon={faSpinner}
              size='2x'
              spin
              color={'#4E4E4E'}
            />
            <span css={[textStyles.body, { paddingLeft: 10 }]}>Loading</span>
          </div>
        ) : (
          resourceHierarchy(
            resource => onResourceClicked(resource, sourceTargetToken),
            sourceTargetResources,
            0
          )
        )}
      </div>
    </div>
  );
}
