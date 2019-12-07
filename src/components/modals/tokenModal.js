/** @jsx jsx */
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { jsx, css } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

import textStyles from '../../styles/text';
import { basicFadeIn, basicFadeOut } from '../../styles/animations';
import useAnimatedState from '../../hooks/useAnimatedState';
import {actionCreators} from "../../redux/actionCreators";
import {useDispatch, useSelector} from "react-redux";

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
    animationDuration: '.5s'
  }),
  fadeOut: css({
    animationFillMode: 'forwards',
    animationName: `${basicFadeOut}`,
    animationDuration: '.5s'
  })
};

/**
 * This component handles the API connection modal.
 * It is responsible for initializing the modal, submitting the token, saving the inputted token,
 * setting any errors into the modal.
 **/
export default function Modal({ connection, modalActive, toggleModal }) {
  const dispatch = useDispatch();

  /** SELECTOR DEFINITIONS
   * apiTokens          : Object of <targets: tokens> submitted in the current session
   * apiOperationErrors : List of objects of current api errors
   * sourceTarget       :List of objects of current api errors
   **/
  const apiTokens = useSelector(state => state.authorization.apiTokens);
  const apiOperationErrors = useSelector(state => state.resources.apiOperationErrors);
  const sourceTarget = useSelector(state => state.targets.source);

  const [state, transitionIn, transitionOut] = useAnimatedState(modalActive);
  const [token, setToken] = useState('');
  const error = apiOperationErrors.find(element => element.action === 'source_resource_collection');

  /**
   * Watch for the modal states to change and open modal. Also add errors to the token state if
   * they exist.
   **/
  useEffect(() => {
    if (modalActive && !state.desiredVisibility && !state.animating) {
      transitionIn();
      // Set the token state to the targets token found in apiTokens
      setToken(apiTokens[sourceTarget.name] ? apiTokens[sourceTarget.name]: '')
    }
  }, [modalActive, state.animating, state.desiredVisibility, transitionIn]);

  /**
   * Close the modal.
   * Dispatch saveToken action to save target token to apiTokens
   * Dispatch loadFromSourceTarget action.
   *    -> Saga call to Resource-Collection occurs with this action.
   *        -> Saga function dispatched loadFromSourceTargetSuccess action when finished.
   */
  const onTokenSubmission = (connection, token) => {
    toggleModal();
    dispatch(actionCreators.authorization.saveToken(connection.name, token));
    dispatch(actionCreators.resources.loadFromSourceTarget(connection, token));
    if (
      apiOperationErrors.length > 0 && error){
        dispatch(actionCreators.resources.removeFromErrorList('source_resource_collection'));
    }
  };

  /**
   * Close the modal and remove any errors and bad tokens that exist.
   **/
  const onModalClose = () => {
    toggleModal();
    if (apiOperationErrors.length > 0 && error) {
      dispatch(actionCreators.resources.removeFromErrorList('source_resource_collection'));
      dispatch(actionCreators.authorization.removeBadToken(sourceTarget.name));
    }
  };

  /**
   * Submit the token and reset the token state.
   **/
  const submitModalData = () => {
    onTokenSubmission(connection, token);
    setToken('');
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
                <span
                  css={textStyles.modalTitle}
                >{`Access Token for ${connection.readable_name}`}</span>
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
                <p css={textStyles.body}>
                  In order to connect to {connection.readable_name} you will
                  need to supply your API token. This will not be saved, so if
                  you come back to this website, you will need to provide your
                  token again.
                </p>

                <div
                  css={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flexBasis: 35
                  }}
                >
                  <input
                    type='text'
                    placeholder='Paste API Token Here'
                    value={token}
                    onChange={event => setToken(event.target.value)}
                  />
                  <button
                    css={[
                      token ? styles.button : styles.disabledButton,
                      textStyles.buttonText
                    ]}
                    onClick={() => transitionOut(() => submitModalData())}
                    disabled={!token}
                  >
                    Connect
                  </button>
                </div>
                <p css={textStyles.bodyError}>{error ? error.data: ''}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>,
      document.body
      )
    : null;
}
