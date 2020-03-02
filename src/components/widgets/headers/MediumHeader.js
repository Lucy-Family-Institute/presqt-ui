/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';

import textStyles from '../../../styles/text';
import {basicFadeIn} from "../../../styles/animations";

function MediumHeader({ text }) {
  return (
    <div css={{ display: 'flex', alignItems: 'center' }}>
      <span css={[textStyles.mediumHeader, { animation: `${basicFadeIn} 1s ease` }]}>
        {text}
      </span>
    </div>
  );
}

MediumHeader.propTypes = {
  text: PropTypes.string.isRequired
};

export default MediumHeader;
