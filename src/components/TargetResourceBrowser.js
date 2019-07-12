/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';

import resourcesNotreDame from '../images/headers/resourcesNotreDame.png';

const TargetResourceBrowser = props => {
  return (
    <div
      css={{
        gridArea: 'targetResources',
        paddingLeft: 50,
        minHeight: '25vh'
        // backgroundColor: 'orange'
      }}
    >
      <img src={resourcesNotreDame} alt="resourcesNotreDame" />
      <p>Target Resource Browser</p>
    </div>
  );
};

TargetResourceBrowser.propTypes = {};

export default TargetResourceBrowser;
