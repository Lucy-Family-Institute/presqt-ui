/* eslint-disable react-hooks/exhaustive-deps */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

import availableConnections from '../images/headers/availableConnections.png';
import { actionCreators } from '../redux/actionCreators';

const temporaryTokens = {
  osf: 'Airlov2nBOb41T1d3FkTIbzC8ahq3nBWDxMbGyrUYvWDinKWJgrPO52uuS6KJIBXKXFtlv'
};

const mapStateToProps = state => {
  return {
    source: state.source,
    target: state.target,
    targets: state.targets
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    onConnectionSelected: source => {
      dispatch(
        actionCreators.targets.switchSource(source, temporaryTokens[source])
      );
    },
    onComponentMount: () => dispatch(actionCreators.targets.load()),
    dispatch
  };
};

const AvailableConnections = props => {
  useEffect(() => {
    props.onComponentMount();
  }, []);

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
        {props.targets.map(connection => (
          <img
            key={connection.name}
            css={{ paddingRight: 15 }}
            src={require(`../images/icons/${connection.name}.png`)}
            alt={connection.name}
            onClick={() => {
              props.onConnectionSelected(connection.name);
            }}
          />
        ))}
      </div>
    </div>
  );
};

AvailableConnections.propTypes = {};

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(AvailableConnections);
