/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';

const HeaderMenu = props => {
  return (
    <div
      css={{
        gridArea: 'headerMenu',
        background:
          'linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(221,221,221,1) 100%)'
      }}
    >
      Header Menu
    </div>
  );
};

HeaderMenu.propTypes = {};

export default HeaderMenu;
