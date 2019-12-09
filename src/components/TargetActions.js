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

/**
 * Mapping object for each target action component. Gets dynamically used for each button.
 **/
const actionLinkToComponent = {
  Download: DownloadModal
};

/**
 * Component for target action buttons on the detail page. It is responsible for the rendering of
 * the html element, and rendering the correct component for each action.
 **/
export default function TargetActions() {
  /** SELECTOR DEFINITIONS
   *  selectedSourceResource : Object of the resource details of the selected resource to display.
   **/
  const selectedSourceResource = useSelector(state => state.resources.selectedInSource);

  /** STATE DEFINITIONS
   * [modalType, setModalType] : Action modal state of which action button has been clicked on.
   **/
  const [modalType, setModalType] = useState(null);
  const [link, setLink] = useState(null);

  const { modalVisible, toggleModalVisibility } = useModal();


  // THIS IS CAUSING AN INFINITE LOOP. COMMENTING OUT UNTIL DOWNLOAD GETS WORKED ON AGAIN.
  // useEffect(() => {
  //   console.log(link);
  //   if (link) {
  //     setModalType(() => actionLinkToComponent[link.name]);
  //     toggleModalVisibility();
  //   }
  // }, [link, toggleModalVisibility]);

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
