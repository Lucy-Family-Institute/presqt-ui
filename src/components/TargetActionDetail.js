/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import PropTypes from 'prop-types';

import textStyles from '../styles/text';

const TargetActionDetail = props => {
  return (
    <div
      css={[
        css({
          gridArea: 'targetActionDetail',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderLeftColor: '#C5C5C5',
          borderLeftWidth: 1,
          borderLeftStyle: 'solid',
          paddingLeft: 25
        })
      ]}
    >
      Target Resource Detail Will Go Here
    </div>
  );
};

TargetActionDetail.propTypes = {};

export default TargetActionDetail;
