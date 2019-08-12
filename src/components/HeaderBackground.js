/** @jsx jsx */
import { jsx } from '@emotion/core';

export default () => {
  return (
    <div
      css={{
        gridColumn: '1/4',
        gridRow: '1/1',
        background:
          'linear-gradient(180deg, rgba(255, 255, 255,0) 0%, rgba(255, 255, 255,1) 100%), linear-gradient(90deg, rgba(229, 161, 83,1) 0%, rgba(74, 116, 168, 1) 100%)',
        zIndex: -10
      }}
    />
  );
};
