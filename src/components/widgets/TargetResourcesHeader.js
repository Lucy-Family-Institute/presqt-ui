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

function TargetResourcesHeader(props) {
  return (
    <div css={{ display: 'flex', alignItems: 'center' }}>
      <img
        css={{ animation: `${fadeIn} 1s ease`, paddingRight: 10 }}
        src={require(`../../images/icons/${props.source}.png`)}
        alt={`${props.source} Resources Header`}
      />
      <span css={[textStyles.largeHeader, { animation: `${fadeIn} 1s ease` }]}>
        Resources
      </span>
    </div>
  );
}

TargetResourcesHeader.propTypes = {
  source: PropTypes.string.isRequired
};

export default TargetResourcesHeader;
