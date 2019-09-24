/** @jsx jsx */
import { jsx } from '@emotion/core';

export default () => {
  return (
    <div
      css={{
        gridColumn: '1/4',
        gridRow: '1/2',
        background:
          'linear-gradient(180deg, rgba(255, 255, 255,0) 0%, rgba(255, 255, 255,.25) 100%), linear-gradient(90deg, rgba(229, 123, 0,1) 0%, rgba(0, 76, 168, 1) 100%)',
        zIndex: -10
      }}
    />
  );
};
