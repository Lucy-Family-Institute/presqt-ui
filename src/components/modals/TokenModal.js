/** @jsx jsx */
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { jsx } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import modalStyles from "../../styles/modal";
import textStyles from '../../styles/text';
import useAnimatedState from '../../hooks/useAnimatedState';
import {actionCreators} from "../../redux/actionCreators";
import {useDispatch, useSelector} from "react-redux";
import TokenTextField from "../widgets/TokenTextField";
import ModalSubmitButton from "../widgets/ModalSubmitButton";

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
   * sourceTarget       : Object of the current source selected
   **/
  const apiTokens = useSelector(state => state.authorization.apiTokens);
  const apiOperationErrors = useSelector(state => state.resources.apiOperationErrors);
  const sourceTarget = useSelector(state => state.targets.source);

  const [state, transitionIn, transitionOut] = useAnimatedState(modalActive);
  const [token, setToken] = useState('');
  const error = apiOperationErrors.find(
    element => element.action === actionCreators.resources.loadFromSourceTarget.toString());

  /**
   * Watch for the `modalActive` being set to true while `state.desiredVisibility` and 
   * `state.animating` are both false. This indicates a scenario in which the user has
   * take an action to indicate that the modal should be opened, but has not yet animated in.
   * 
   * Also add errors to the token state if they exist.
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
    dispatch(actionCreators.resources.loadFromSourceTarget(connection, token, null));
    if (apiOperationErrors.length > 0 && error){
        dispatch(actionCreators.resources.removeFromErrorList(
          actionCreators.resources.loadFromSourceTarget.toString()));
    }
  };

  /**
   * Close the modal and remove any errors and bad tokens that exist.
   **/
  const onModalClose = () => {
    toggleModal();
    if (apiOperationErrors.length > 0 && error) {
      dispatch(actionCreators.resources.removeFromErrorList(
        actionCreators.resources.loadFromSourceTarget.toString()));
      dispatch(actionCreators.authorization.removeToken(sourceTarget.name));
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
                  {`Access Token for ${connection.readable_name}`}
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
                  <TokenTextField
                    size="small"
                    type='text'
                    value={token}
                    label="Insert API Token Here"
                    onChange={event => setToken(event.target.value)}
                    onAnimationEnd={(event) => {event.stopPropagation()}}
                  />
                  <ModalSubmitButton
                    variant="contained"
                    css={[
                      token ? modalStyles.button : modalStyles.disabledButton,
                      modalStyles.buttonText
                    ]}
                    onClick={() => transitionOut(() => submitModalData())}
                    disabled={!token}
                  >
                    Connect
                  </ModalSubmitButton>
                </div>
                <p css={[textStyles.body, textStyles.cubsRed]}>
                  {error ? error.data: ''}
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
