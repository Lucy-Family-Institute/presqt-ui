/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';

const TargetActionDetail = props => {
  return (
    <div
      css={{
        gridArea: 'targetActionDetail',
        backgroundColor: 'green'
      }}
    >
      Target Resource Detail
    </div>
  );
};

TargetActionDetail.propTypes = {};

export default TargetActionDetail;
