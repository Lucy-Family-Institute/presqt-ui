/** @jsx jsx */
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { jsx, css } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

import textStyles from '../../styles/text';
import { basicFadeIn, basicFadeOut } from '../../styles/animations';
import useAnimatedState from '../../hooks/useAnimatedState';

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

export default function Modal({ connection, modalActive, onHide, onSubmit }) {
  const [token, setToken] = useState('');
  const [state, transitionIn, transitionOut] = useAnimatedState(modalActive);

  useEffect(() => {
    if (modalActive && !state.desiredVisibility && !state.animating) {
      transitionIn();
    }
  }, [modalActive, state.animating, state.desiredVisibility, transitionIn]);

  const submitModalData = () => {
    onSubmit(connection, token);
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
                        onHide();
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
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;
}
