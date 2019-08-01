/** @jsx jsx */
import { keyframes } from 'emotion';
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import textStyles from '../styles/text';
import { actionCreators } from '../redux/actionCreators';

const closedFolderIcon = require('../images/icons/closedFolder.png');
const openFolderIcon = require('../images/icons/openFolder.png');
const fileIcon = require('../images/icons/file.png');

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
    source: state.source,
    sourceResources: state.sourceResources
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
        <div
          css={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 10,
            paddingLeft: 10 * level
          }}
          onClick={() => onClick(resource)}
        >
          <img
            src={
              resource.kind === 'container'
                ? resource.open
                  ? openFolderIcon
                  : closedFolderIcon
                : fileIcon
            }
            alt="Resource Icon"
            css={{ paddingRight: 10, height: 25 }}
          />
          <span className={textStyles.body}>{resource.title}</span>
        </div>
        {resource.kind === 'container' && resource.open === true
          ? resourceHierarchy(actionCreator, resource.children, level + 1)
          : null}
      </div>
    );
  });
};

const TargetResourceBrowser = props => {
  const { sourceResources, onContainerClicked } = props;

  return (
    <div
      css={{
        gridArea: 'targetResources',
        paddingLeft: 50,
        minHeight: '25vh',
        animation: `${bounce} 2s ease`
      }}
    >
      {!props.source ? (
        NoSourceSelected()
      ) : (
        <div>
          <img
            css={{ animation: `${bounce} 1s ease` }}
            src={require(`../images/headers/resources/${props.source}.png`)}
            alt="resourcesNotreDame"
          />
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
