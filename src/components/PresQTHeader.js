/** @jsx jsx */
import { jsx } from '@emotion/core';

import textStyles from '../styles/text';
const PresQTHeader = () => {
  return (
    <div
      id="headerBackground"
      css={{
        gridArea: 'headerLogo',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 50
      }}
    >
      <header className={textStyles.presqtLogo}>PresQT</header>
    </div>
  );
};

export default PresQTHeader;
