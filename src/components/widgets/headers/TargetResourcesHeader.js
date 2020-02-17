/** @jsx jsx */
import { keyframes } from 'emotion';
import { jsx } from '@emotion/core';

import textStyles from '../../../styles/text';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 100;
  }
`;

function TargetResourcesHeader() {
  return (
    <div css={{ display: 'flex'}}>
      <span css={[textStyles.largeHeader, { animation: `${fadeIn} 1s ease` }]}>
        Resources
      </span>
    </div>
  );
}

export default TargetResourcesHeader;
