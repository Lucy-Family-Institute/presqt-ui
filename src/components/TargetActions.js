/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useSelector } from 'react-redux';

import textStyles from '../styles/text';
import ActionButton from './widgets/ActionButton';

export default function TargetActions() {
  const selectedSourceResource = useSelector(
    state => state.resources.selectedInSource
  );

  return (
    <div
      css={{
        gridArea: 'targetActions',
        borderLeftColor: '#979797',
        borderLeftWidth: 1,
        borderLeftStyle: 'solid',
        paddingLeft: 25
      }}
    >
      <span
        css={[
          {
            display: 'flex',
            flexDirection: 'row',
            minHeight: 50,
            alignItems: 'center'
          },
          textStyles.largeHeader
        ]}
      >
        {selectedSourceResource ? selectedSourceResource.title : null}
      </span>
      <div css={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
        {selectedSourceResource &&
          selectedSourceResource.links.map(link => (
            <ActionButton key={link.name} text={link.name} />
          ))}
      </div>
    </div>
  );
}
