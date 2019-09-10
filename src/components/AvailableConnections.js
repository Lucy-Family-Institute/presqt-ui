/**
 * AvailableConnections
 *
 * This component displays the various targets that a user can connect with
 * to. It is also one place through which a user can submit an API token for
 * targets. Finally, it is responsible for broadcasting (via Redux) what the
 * currently selected "sourceTarget" is.
 */

/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

import availableConnections from '../images/headers/availableConnections.png';
import { actionCreators } from '../redux/actionCreators';
import useModal from '../hooks/useModal';
import Modal from './widgets/Modal';

// TEST_USER_TOKEN = '3f5ULLSX3OaJcNVmj6N6cTomvcmlZf5YQYYKl6ek6c6SKXMG7V0R63ueMB0uiiGwrkXQi8'
// PRIVATE_USER_TOKEN = '0UAX3rbdd59OUXkGIu19gY0BMQODAbtGimcLNAfAie6dUQGGPig93mpFOpJQ8ceynlGScp'
// UPLOAD_TEST_USER_TOKEN = 'E9luKQU9Ywe5QFG2HpgupjBqqSeH4fZKG6IxUMVP8fa242dSyECYuB5lhFvekbmjhxq1zT'
// PRESQT_FORK_TOKEN = 'Airlov2nBOb41T1d3FkTIbzC8ahq3nBWDxMbGyrUYvWDinKWJgrPO52uuS6KJIBXKXFtlv'

const mapStateToProps = state => {
  return {
    apiTokens: state.authorization.apiTokens,
    targets: state.targets.available
  };
};

const mapDispatchtoProps = (dispatch, ownProps) => {
  return {
    saveToken: (targetID, token) =>
      dispatch(actionCreators.authorization.saveToken(targetID, token)),
    switchSourceTarget: (sourceTarget, sourceTargetToken) => {
      dispatch(
        actionCreators.targets.switchSource(sourceTarget, sourceTargetToken)
      );
    },
    onComponentMount: () => dispatch(actionCreators.targets.load()),
    dispatch
  };
};

const AvailableConnections = props => {
  const {
    onComponentMount,
    saveToken,
    switchSourceTarget,
    apiTokens,
    targets
  } = props;

  useEffect(() => {
    onComponentMount();
  }, [onComponentMount]);

  const { modalVisible, toggleModalVisibility } = useModal();

  const onTokenSubmission = async (targetID, token) => {
    toggleModalVisibility();
    saveToken(targetID, token);
    switchSourceTarget(targetID, token);
  };

  function displayModalOrSwitchSourceTarget(connection) {
    if (connection.name in apiTokens) {
      console.log('Already have a token from the user.');
    } else {
      toggleModalVisibility();
    }
  }

  return (
    <div
      css={{
        gridArea: 'availableConnections',
        paddingLeft: 50
      }}
    >
      <img
        src={availableConnections}
        alt="Available Connections"
        css={{ paddingBottom: 10 }}
      />
      <div css={{ display: 'flex', flexDirection: 'row' }}>
        {targets.map(connection => (
          <React.Fragment key={connect.name}>
            <img
              css={{ paddingRight: 15 }}
              src={require(`../images/icons/${connection.name}.png`)}
              alt={connection.readable_name}
              onClick={() => {
                displayModalOrSwitchSourceTarget(connection);
              }}
            />
            <Modal
              connection={connection}
              isShowing={modalVisible}
              hide={toggleModalVisibility}
              onSubmit={onTokenSubmission}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

AvailableConnections.propTypes = {
  apiTokens: PropTypes.object.isRequired,
  targets: PropTypes.array.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(AvailableConnections);
