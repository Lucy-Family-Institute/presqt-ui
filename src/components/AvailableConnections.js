/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { actionCreators } from '../redux/actionCreators';
import useModal from '../hooks/useModal';
import Modal from './modals/tokenModal';
import text from '../styles/text';
import colors from '../styles/colors';
import { basicFadeIn } from '../styles/animations';

/**
 * This component displays the various targets that a user can connect with
 * to. It is also one place through which a user can submit an API token for
 * targets. Finally, it is responsible for broadcasting (via Redux) what the
 * currently selected "sourceTarget" is.
 */
export default function AvailableConnections() {
  const dispatch = useDispatch();

  /**
   * pendingAPIResponse : Boolean representing if the API request is in progress
   * apiTokens          : Object of <targets: tokens> submitted in the current session
   * sourceTarget       : Object of the current source selected
   * availableTargets   : List of objects of available targets
   */
  const pendingAPIResponse = useSelector(state => state.resources.pendingAPIResponse);
  const apiTokens = useSelector(state => state.authorization.apiTokens);
  const sourceTarget = useSelector(state => state.targets.source);
  const availableTargets = useSelector(state => state.targets.available);

  /**
   * Dispatch load action on page-load
   * Saga call to Target-Collection occurs with this action.
   *    -> Saga function dispatches loadSuccess action when finished.
   */
  useEffect(() => {dispatch(actionCreators.targets.load());}, [dispatch]);

  // Custom modal hook
  const { modalVisible, toggleModalVisibility } = useModal();

  /**
   * Set the selected target as the source target.
   * If a connection already exists with the target then dispatch loadFromSourceTarget action.
   *    -> Saga call to Resource-Collection occurs with this action.
   *        -> Saga function dispatched loadFromSourceTargetSuccess action when finished.
   * Else display the modal.
   */
  const handleSwitchSourceTarget = connection => {
    dispatch(actionCreators.targets.switchSource(connection));

    if (connection.name in apiTokens) {
      dispatch(
        actionCreators.resources.loadFromSourceTarget(connection,apiTokens[connection.name])
      );
    } else {
      setTimeout(() => toggleModalVisibility(), 500);
    }
  };

  /**
   * Close the modal.
   * Dispatch saveToken action to save target token to apiTokens
   * Dispatch loadFromSourceTarget action.
   *    -> Saga call to Resource-Collection occurs with this action.
   *        -> Saga function dispatched loadFromSourceTargetSuccess action when finished.
   */
  const onTokenSubmission = (connection, token) => {
    toggleModalVisibility();
    dispatch(actionCreators.authorization.saveToken(connection.name, token));
    dispatch(actionCreators.resources.loadFromSourceTarget(connection, token));
  };

  return (
    <div
      css={{
        gridArea: 'availableConnections',
        paddingLeft: 50
      }}
    >
      <span css={text.mediumHeader}>Available Connections</span>
      <div css={{ display: 'flex', flexDirection: 'row', paddingTop: 10 }}>
        {availableTargets.map(connection => (
          <button
            key={connection.name}
            css={[
              {
                backgroundColor: 'white',
                border: 'none',
                paddingLeft: 0,
                paddingRight: 10
              },
              pendingAPIResponse ? { opacity: 0.5 } : null
            ]}
            onClick={() => handleSwitchSourceTarget(connection)}
            disabled={pendingAPIResponse}
          >
            <img
              src={require(`../images/icons/${connection.name}.png`)}
              alt={connection.readable_name}
            />
            {sourceTarget && sourceTarget.name === connection.name ? (
              <div
                css={{
                  minHeight: 5,
                  marginTop: 5,
                  backgroundColor: colors.ripeOrange,
                  animation: `${basicFadeIn} 1s`
                }}
              ></div>
            ) : null}
          </button>
        ))}
      </div>
      <Modal
        connection={sourceTarget}
        modalActive={modalVisible}
        onHide={toggleModalVisibility}
        onSubmit={onTokenSubmission}
      />
    </div>
  );
}
