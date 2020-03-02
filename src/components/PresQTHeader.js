/** @jsx jsx */
import { jsx } from '@emotion/core';

import textStyles from '../styles/text';

export default function PresQTHeader() {
  return (
    <div
      id='headerBackground'
      css={{
        gridArea: 'headerLogo',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 50
      }}
    >
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'flex-start'
        }}
      >
        <span css={textStyles.presqtLogo}>
          PresQT
        </span>
        <span css={textStyles.presqtLogoSubtext}>
          Preservation Quality Tools
        </span>
      </div>
    </div>
  );
};
