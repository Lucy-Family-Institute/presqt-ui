/** @jsx jsx */
import ReactDOM from "react-dom";
import textStyles from "../../styles/text";
import modalStyles from "../../styles/modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWindowClose} from "@fortawesome/free-solid-svg-icons";
import {jsx} from "@emotion/core";
import useAnimatedState from "../../hooks/useAnimatedState";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {actionCreators} from "../../redux/actionCreators";
import UploadStepper from "../widgets/UploadStepper/UploadStepper";

/**
 * This component is responsible for displaying the upload modal content including the stepper.
 **/
export default function UploadModal({ modalActive, toggleModal, selectedInSource }) {
  const dispatch = useDispatch();

  const [state, transitionIn, transitionOut] = useAnimatedState(modalActive);

  useEffect(() => {
    if (modalActive && !state.desiredVisibility && !state.animating) {
      transitionIn();
    }
  }, [modalActive, state.animating, state.desiredVisibility, transitionIn]);

  /**
   * When the 'x' is pressed on the modal clear the upload data, remove the upload error
   * from APIOperationErrors if it exists, and toggle the modal.
   **/
  const onModalClose = () => {
    toggleModal();
    dispatch(actionCreators.resources.clearUploadData());
    dispatch(actionCreators.resources.removeFromErrorList(
      actionCreators.resources.uploadToSourceTarget.toString()));
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
                    Upload Resource
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
                <UploadStepper selectedInSource={selectedInSource}/>
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