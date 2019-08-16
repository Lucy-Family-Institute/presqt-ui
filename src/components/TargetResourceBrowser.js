/** @jsx jsx */
import { keyframes } from 'emotion';
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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

const mapStateToProps = state => {
  return {
    source: state.targets.source,
    sourceResources: state.resources.inSourceTarget,
    pendingAPIResponse: state.resources.pendingAPIResponse
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    onResourceClicked: resource => {
      resource.kind === 'container' && resource.open
        ? dispatch(actionCreators.resources.closeContainer(resource))
        : dispatch(actionCreators.resources.openContainer(resource));

      dispatch(actionCreators.resources.selectSourceResource(resource));
    }
  };
};

const NoSourceSelected = () => {
  return <div css={textStyles.largeHeader}>Select an Available Connection</div>;
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

const TargetResourceBrowser = props => {
  const {
    sourceResources,
    onResourceClicked,
    source,
    pendingAPIResponse
  } = props;

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
      {!source ? (
        NoSourceSelected()
      ) : (
        <div css={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <TargetResourcesHeader source={source} />
          {pendingAPIResponse ? (
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
                size="2x"
                spin
                color={'#4E4E4E'}
              />
              <span css={[textStyles.body, { paddingLeft: 10 }]}>Loading</span>
            </div>
          ) : (
            resourceHierarchy(onResourceClicked, sourceResources, 0)
          )}
        </div>
      )}
    </div>
  );
};

TargetResourceBrowser.propTypes = {};

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(TargetResourceBrowser);
