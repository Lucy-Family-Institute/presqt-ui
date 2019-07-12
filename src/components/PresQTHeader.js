/** @jsx jsx */
import { jsx } from '@emotion/core';

import logo from '../images/logo/PresQT.png';

const PresQTHeader = () => {
  return (
    <div
      id="headerBackground"
      css={{
        gridArea: 'headerLogo',
        background:
          'linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(221,221,221,1) 100%)',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 50
      }}
    >
      <header>
        <img src={logo} alt="PresQT Logo" />
      </header>
    </div>
  );
};

export default PresQTHeader;
