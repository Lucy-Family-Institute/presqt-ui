/** @jsx jsx */
import ReactDOM from "react-dom";
import textStyles from "../../styles/text";
import modalStyles from "../../styles/modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWindowClose} from "@fortawesome/free-solid-svg-icons";
import {jsx} from "@emotion/core";
import useAnimatedState from "../../hooks/useAnimatedState";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {actionCreators} from "../../redux/actionCreators";
import UploadStepper from "../widgets/UploadStepper/UploadStepper";

export default function UploadModal({ modalActive, toggleModal }) {
  const dispatch = useDispatch();

  const connection = useSelector(state => state.targets.source);
  const sourceTargetToken = useSelector(state => state.authorization.apiTokens[state.targets.source.name]);
  const [state, transitionIn, transitionOut] = useAnimatedState(modalActive);
  const [modalHeader, setModalHeader] = useState('Upload Resource');

  useEffect(() => {
    if (modalActive && !state.desiredVisibility && !state.animating) {
      transitionIn();
    }
  }, [modalActive, state.animating, state.desiredVisibility, transitionIn]);

  const onModalClose = () => {
    toggleModal();
    dispatch(actionCreators.resources.clearUploadData());
    dispatch(actionCreators.resources.removeFromErrorList(actionCreators.resources.uploadToSourceTarget.toString()));
    dispatch(actionCreators.resources.loadFromSourceTarget(connection, sourceTargetToken, null));
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
                <UploadStepper />
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