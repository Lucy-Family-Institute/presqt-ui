/** @jsx jsx */
import { jsx } from '@emotion/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import availableConnections from '../images/headers/availableConnections.png';
import { switchSource } from '../redux/actionCreators';

const mapStateToProps = state => {
  return {
    source: state.source,
    target: state.target
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    onConnectionSelected: source => {
      dispatch(switchSource(source));
    }
  };
};

const AvailableConnections = props => {
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
        onClick={() => props.onConnectionSelected('notreDame')}
      />
    </div>
  );
};

AvailableConnections.propTypes = {};

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(AvailableConnections);
