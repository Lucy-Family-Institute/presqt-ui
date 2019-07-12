/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';

import developmentPartners from '../images/headers/developmentPartners.png';

const DevelopmentPartners = props => {
  return (
    <div
      css={{
        gridArea: 'developmentPartners'
      }}
    >
      <img src={developmentPartners} alt="Available Connections" />
    </div>
  );
};

DevelopmentPartners.propTypes = {};

export default DevelopmentPartners;
