/** @jsx jsx */
import {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import { jsx } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import modalStyles from "../../styles/modal";
import textStyles from '../../styles/text';
import useAnimatedState from '../../hooks/useAnimatedState';
import { useDispatch, useSelector } from 'react-redux';
import FileSaver from 'file-saver';
import { actionCreators } from '../../redux/actionCreators';
import Spinner from '../widgets/Spinner';

/**
 * This component handles the download modal.
 * It's responsible for showing the user that the download is pending and presenting
 * any errors that may occur during download.
 **/
export default function DownloadModal({ modalActive, toggleModal }) {
  const dispatch = useDispatch();

  /** SELECTOR DEFINITIONS
   * sourceDownloadContents : Object representing the blob content returned from the download call
   * sourceDownloadStatus   : String status of the status of the download/
   *                          [null, 'pending', 'successful', 'failure']
   **/
  const sourceDownloadContents = useSelector(state => state.resources.sourceDownloadContents);
  const sourceDownloadStatus = useSelector(state => state.resources.sourceDownloadStatus);

  const [state, transitionIn, transitionOut] = useAnimatedState(modalActive);
  const [modalMessage, setModalMessage] = useState('' +
    'The download is being processed on the server. Please do not leave the page.');

  /**
   * Watch for the modal states to change and open modal.
   **/
  useEffect(() => {
    if (modalActive && !state.desiredVisibility && !state.animating) {
      transitionIn();
    }
  }, [modalActive, state.animating, state.desiredVisibility, transitionIn]);

  /**
   * Watch for the sourceDownloadStatus to change to 'failure' or 'success'.
   * If 'failure' then update the modal message
   * If 'success' then use FileSaver to download the file and transition the modal to close.
   **/
  useEffect(() => {
    // Download failed
    if (sourceDownloadStatus === 'failure') {
      setModalMessage(
        'Download returned a ' +
        sourceDownloadContents.status_code +
        ' status code. ' +
        sourceDownloadContents.message)
    }
    // Download successful
    else if (sourceDownloadStatus === 'success') {
      FileSaver.saveAs(sourceDownloadContents, 'PresQT_Download.zip');
      transitionOut(() => {
        onModalClose();
      })
    }
  }, [sourceDownloadStatus]);

  /**
   *  Close the modal.
   *  Dispatch clearDownloadData to clear download data from state.
   **/
  const onModalClose = () => {
    toggleModal();
    setModalMessage('The download is being processed on the server. Please do not leave the page.');
    dispatch(actionCreators.resources.clearDownloadData());
    dispatch(actionCreators.resources.removeFromErrorList(
      actionCreators.resources.downloadResource.toString()));
  };

  return modalActive
    ? ReactDOM.createPortal(
        <div
          css={
            state.currentVisibility || state.desiredVisibility
              ? { display: 'initial' }
              : { display: 'none' }
          }
        >
          <div
            css={state.desiredVisibility ? modalStyles.fadeIn : modalStyles.fadeOut}
            onAnimationEnd={() => {
              state.endAnimationCallback();
            }}
          >
            <div css={modalStyles.darkenBackground} />
            <div css={modalStyles.modalContainer} aria-modal aria-hidden>
              <div css={modalStyles.modal}>
                <div css={modalStyles.modalHeader}>
                  <span css={textStyles.modalTitle}>
                    {sourceDownloadStatus === 'failure'
                      ? 'Download Failed!'
                      : 'Download In Progress'}
                  </span>
                  <div
                    onClick={() =>
                      transitionOut(() => {
                        onModalClose();
                      })
                    }
                  >
                    <FontAwesomeIcon icon={faWindowClose} inverse size='lg' />
                  </div>
                </div>
                <div
                  css={{
                    padding: 20,
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <p css={[textStyles.body, { marginBottom: 50 }]}>
                    {modalMessage}
                  </p>
                  {sourceDownloadStatus === 'pending' ||
                  sourceDownloadStatus === null ? (
                    <Spinner />
                  ) : null}
                  <div
                    css={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      flexBasis: 35
                    }}
                  >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;
}
