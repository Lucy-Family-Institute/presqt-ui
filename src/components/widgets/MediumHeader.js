/** @jsx jsx */
import { keyframes } from 'emotion';
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';

import textStyles from '../../styles/text';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 100;
  }
`;

function MediumHeader({ text }) {
  return (
    <div css={{ display: 'flex', alignItems: 'center' }}>
      <span css={[textStyles.mediumHeader, { animation: `${fadeIn} 1s ease` }]}>
        {text}
      </span>
    </div>
  );
}

MediumHeader.propTypes = {
  text: PropTypes.string.isRequired
};

export default MediumHeader;
