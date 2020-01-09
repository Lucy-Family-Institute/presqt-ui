/** @jsx jsx */
import ReactDOM from "react-dom";
import textStyles from "../../styles/text";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWindowClose} from "@fortawesome/free-solid-svg-icons";
import {css, jsx} from "@emotion/core";
import useAnimatedState from "../../hooks/useAnimatedState";
import {basicFadeIn, basicFadeOut} from "../../styles/animations";
import {useEffect, useState} from "react";
import UploadInput from "../widgets/UploadInput";
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../widgets/Spinner";
import {actionCreators} from "../../redux/actionCreators";

const styles = {
  darkenBackground: css({
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1040,
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    opacity: 0.5
  }),
  modalContainer: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    padding: '.5rem',
    top: 0,
    left: 0,
    zIndex: 1050,
    width: '100%',
    height: '100%'
  }),
  modal: css({
    zIndex: 100,
    background: 'white',
    position: 'relative',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    width: '50%'
  }),
  modalHeader: css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexBasis: 50,
    padding: 20,
    backgroundColor: 'rgba(229, 123, 0,1)',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  }),
  button: css({
    backgroundColor: 'rgba(0, 76, 168, 1)',
    color: 'white',
    border: 'none',
    borderRadius: 5
  }),
  disabledButton: css({
    backgroundColor: 'rgba(108, 133, 163, 1)',
    color: 'white',
    border: 'none',
    borderRadius: 5
  }),
  fadeIn: css({
    animationFillMode: 'forwards',
    animationName: `${basicFadeIn}`,
    animationDuration: '.4s'
  }),
  fadeOut: css({
    animationFillMode: 'forwards',
    animationName: `${basicFadeOut}`,
    animationDuration: '.4s'
  })
};

export default function UploadModal({ modalActive, toggleModal }) {
  const dispatch = useDispatch();

  const sourceUploadStatus = useSelector(state => state.resources.sourceUploadStatus);
  const sourceUploadData = useSelector(state => state.resources.sourceUploadData);

  const [state, transitionIn, transitionOut] = useAnimatedState(modalActive);
  const [modalContent, setModalContent] = useState('');
  const [modalHeader, setModalHeader] = useState('Upload Resource');

  useEffect(() => {
    if (modalActive && !state.desiredVisibility && !state.animating) {
      transitionIn();
    }
  }, [modalActive, state.animating, state.desiredVisibility, transitionIn]);

  useEffect(() => {
    if (sourceUploadStatus === null) {
      setModalContent(<UploadInput />);
    }
    else if (sourceUploadStatus === 'pending') {
      setModalHeader('Upload In Progress');
      setModalContent(<Spinner />);
    }
    else if (sourceUploadStatus === 'failure') {
      setModalHeader('Upload Failed!');
      setModalContent(<div>{sourceUploadData.message}</div>);
    }
    else {
      setModalHeader(sourceUploadData.message);

      const failedFixityMessage = sourceUploadData.failed_fixity.length > 0
        ? `The following files failed fixity: ${sourceUploadData.failed_fixity.join(', ')}`
        : 'No files failed fixity.';
      const resourcesIgnoredMessage = sourceUploadData.resources_ignored.length > 0
        ? `The following duplicate resources were ignored: 
          ${sourceUploadData.resources_ignored.join(', ')}`
        : 'No duplicate resources were ignored.';
      const resourcesUpdatedMessage = sourceUploadData.resources_updated.length > 0
        ? `The following duplicate resources were updated: 
          ${sourceUploadData.resources_updated.join(', ')}`
        : 'No duplicate resources were updated.';

      const successfulMessage = <div>
        <br/>
        {failedFixityMessage}
        <br />
        {resourcesIgnoredMessage}
        <br />
        {resourcesUpdatedMessage}
      </div>;

      setModalContent(successfulMessage);
    }
  }, [sourceUploadStatus]);

  const onModalClose = () => {
    toggleModal();
    dispatch(actionCreators.resources.clearUploadData());
    setModalHeader('Upload Resource');
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
          css={state.desiredVisibility ? styles.fadeIn : styles.fadeOut}
          onAnimationEnd={() => {
            state.endAnimationCallback();
          }}
        >
          <div css={styles.darkenBackground} />
          <div css={styles.modalContainer} aria-modal aria-hidden>
            <div css={styles.modal}>
              <div css={styles.modalHeader}>
                  <span css={textStyles.modalTitle}>
                    {modalHeader}
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
                {modalContent}
                <div
                  css={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flexBasis: 35
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>,
      document.body
    )
    : null;
}