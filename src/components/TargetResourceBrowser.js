/** @jsx jsx */
import { keyframes } from 'emotion';
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { actionCreators } from '../redux/actionCreators';
import ResourceButton from './widgets/ResourceButton';
import TargetResourcesHeader from './widgets/TargetResourcesHeader';

const bounce = keyframes`
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
    sourceResources: state.resources.inSourceTarget
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    onContainerClicked: container => {
      container.open
        ? dispatch(actionCreators.resources.closeContainer(container))
        : dispatch(actionCreators.resources.openContainer(container));
    }
  };
};

const NoSourceSelected = () => {
  return (
    <div>
      <p css={{ fontSize: 18 }}>Please select a source system below. </p>
    </div>
  );
};

const resourceHierarchy = (actionCreator, resources, level = 0) => {
  /**
   * Need to figure out a way to iterate through
   * the resources array, which can have an arbitary number
   * of nested levels.
   */

  const onClick = resource => {
    if (resource.kind === 'container') {
      actionCreator(resource);
    }
  };

  return resources.map(resource => {
    return (
      <div key={resource.id}>
        <ResourceButton resource={resource} level={level} onClick={onClick} />
        {resource.kind === 'container' &&
        resource.open === true &&
        resource.children
          ? resourceHierarchy(actionCreator, resource.children, level + 1)
          : null}
      </div>
    );
  });
};

const TargetResourceBrowser = props => {
  const { sourceResources, onContainerClicked, source } = props;

  return (
    <div
      css={{
        gridArea: 'targetResources',
        paddingLeft: 50,
        paddingBottom: 50,
        minHeight: '25vh',
        animation: `${bounce} 2s ease`
      }}
    >
      {!props.source ? (
        NoSourceSelected()
      ) : (
        <div>
          <TargetResourcesHeader source={source} />
          {resourceHierarchy(onContainerClicked, sourceResources, 0)}
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
