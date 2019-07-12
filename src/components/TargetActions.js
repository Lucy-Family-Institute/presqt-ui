/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';

const TargetActions = props => {
  return (
    <div
      css={{
        gridArea: 'targetActions',
        backgroundColor: 'lightGreen'
      }}
    >
      Target Actions
    </div>
  );
};

TargetActions.propTypes = {};

export default TargetActions;
