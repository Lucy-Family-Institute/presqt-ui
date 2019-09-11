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

export default function TargetResourceBrowser() {
  const [
    sourceTarget,
    sourceTargetToken,
    sourceTargetResources,
    pendingAPIOperations
  ] = useSelector(state => [
    state.targets.source,
    state.targets.source
      ? state.authorization.apiTokens[state.targets.source.name]
      : null,
    state.resources.inSourceTarget,
    state.resources.pendingAPIOperations
  ]);

  const dispatch = useDispatch();

  const NoSourceSelected = () => {
    return (
      <div css={textStyles.largeHeader}>Select an Available Connection</div>
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

  const onResourceClicked = (resource, sourceTargetToken) => {
    resource.kind === 'container' && resource.open
      ? dispatch(actionCreators.resources.closeContainer(resource))
      : dispatch(actionCreators.resources.openContainer(resource));

    dispatch(
      actionCreators.resources.selectSourceResource(resource, sourceTargetToken)
    );
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
      {!sourceTarget ? (
        NoSourceSelected()
      ) : (
        <div css={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <TargetResourcesHeader targetName={sourceTarget.name} />
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
      )}
    </div>
  );
}
