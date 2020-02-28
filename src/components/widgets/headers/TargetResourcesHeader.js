/** @jsx jsx */
import { keyframes } from 'emotion';
import { jsx } from '@emotion/core';

import textStyles from '../../../styles/text';
import {useSelector} from "react-redux";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 100;
  }
`;

function TargetResourcesHeader() {
  const target = useSelector(state => state.selectedTarget);

  let headerMessage = 'Resources';
  if (target) {
    headerMessage = `${target.readable_name} Resources`;
  }

  return (
    <div css={{ display: 'flex' }}>
      <span css={[textStyles.largeHeader, { animation: `${fadeIn} 1s ease` }]}>
        {headerMessage}
      </span>
    </div>
  );
}

export default TargetResourcesHeader;
