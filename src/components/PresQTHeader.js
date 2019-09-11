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
      <header css={textStyles.presqtLogo}>PresQT</header>
      {/* TODO: Add Demonstration UI or Something to that effect. */}
    </div>
  );
};

export default PresQTHeader;
