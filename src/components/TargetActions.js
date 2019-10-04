/** @jsx jsx */
import { useState, useEffect } from 'react';
import { jsx } from '@emotion/core';
import { useSelector } from 'react-redux';

import textStyles from '../styles/text';
import ActionButton from './widgets/ActionButton';
import { initiateResourceDownload } from '../api/resources';
import useModal from '../hooks/useModal';
import DownloadModal from './modals/DownloadModal';

const temporaryLinktoFunctionMap = {
  Download: initiateResourceDownload
};

const actionLinkToComponent = {
  Download: DownloadModal
};

export default function TargetActions() {
  const [
    selectedSourceResource,
    sourceTargetToken,
    pendingAPIOperations
  ] = useSelector(state => [
    state.resources.selectedInSource,
    state.targets.source
      ? state.authorization.apiTokens[state.targets.source.name]
      : null,
    state.resources.pendingAPIOperations
  ]);

  const { modalVisible, toggleModalVisibility } = useModal();
  const [modalType, setModalType] = useState(null);
  const [link, setLink] = useState(null);

  useEffect(() => {
    if (link) {
      setModalType(() => actionLinkToComponent[link.name]);
      toggleModalVisibility();
    }
  }, [link, toggleModalVisibility]);

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

      <DownloadModal
        modalActive={modalVisible}
        onHide={toggleModalVisibility}
      />

      <div css={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
        {selectedSourceResource &&
          selectedSourceResource.links.map(link => (
            <ActionButton
              key={link.name}
              text={link.name}
              onClick={() => setLink(link)}
            />
          ))}
      </div>
    </div>
  );
}
