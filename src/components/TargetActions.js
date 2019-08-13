/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';

import textStyles from '../styles/text';

const TargetActions = props => {
  return (
    <div
      css={{
        gridArea: 'targetActions',
        borderLeftColor: '#979797',
        borderLeftWidth: 1,
        borderLeftStyle: 'solid',
        paddingLeft: 25
      }}
    >
      <span
        css={[
          {
            display: 'flex',
            flexDirection: 'row',
            minHeight: 50,
            alignItems: 'center'
          },
          textStyles.largeHeader
        ]}
      >
        Available Actions
      </span>
    </div>
  );
};

TargetActions.propTypes = {};

export default TargetActions;
