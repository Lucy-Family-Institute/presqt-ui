/** @jsx jsx */
import { jsx } from '@emotion/core';

import textStyles from '../styles/text';

const HeaderMenu = () => {
  return (
    <div
      css={{
        gridArea: 'headerMenu',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: 50
      }}
    >
      <span css={textStyles.globalNav}>About PresQT</span>
    </div>
  );
};

export default HeaderMenu;
