/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useSelector, useDispatch } from 'react-redux';
import {useEffect, useState} from 'react';

import { actionCreators } from '../redux/actionCreators';
import text from '../styles/text';
import colors from '../styles/colors';
import { basicFadeIn } from '../styles/animations';

/**
 * This component displays the various targets that a user can connect with.
 * It's responsible for switching targets, handing off resource loading, and handing off modal work
 * It's also responsible for broadcasting (via Redux) what the currently selected "sourceTarget" is.
 */
export default function AvailableConnections() {
  const dispatch = useDispatch();

  const pendingAPIResponse = useSelector(state => state.resources.pendingAPIResponse);
  const apiTokens = useSelector(state => state.authorization.apiTokens);
  const sourceTarget = useSelector(state => state.targets.source);
  const availableTargets = useSelector(state => state.targets.available);
  const apiOperationErrors = useSelector(state => state.resources.apiOperationErrors);

  /**
   * Dispatch load action on page-load.
   * Saga call to Target-Collection occurs with this action.
   *    -> Saga function dispatches loadSuccess action when finished.
   */
  useEffect(() => {dispatch(actionCreators.targets.load());}, [dispatch]);

  /**
   * Watch for a change in apiOperationErrors.
   * If a exists in apiOperationErrors then display the modal.
   **/
  useEffect(() => {
    if (
      apiOperationErrors.length > 0 &&
      apiOperationErrors.find(
        element => element.action === actionCreators.resources.loadFromSourceTarget.toString())
    ) {
      dispatch(actionCreators.authorization.displayTokenModal());
    }
  }, [apiOperationErrors]);

  /**
   * Set the selected target as the source target.
   * If a connection already exists with the target then dispatch loadFromSourceTarget action.
   *    -> Saga call to Resource-Collection occurs with this action.
   *        -> Saga function dispatches loadFromSourceTargetSuccess action is if successful.
   *        -> Saga function dispatches loadFromSourceTargetFailure action if not successful.
   * Else display the modal.
   */
  const handleSwitchSourceTarget = connection => {
    dispatch(actionCreators.resources.clearSourceResources());
    dispatch(actionCreators.targets.switchSource(connection));

    if (connection.name in apiTokens) {
      dispatch(
        actionCreators.resources.loadFromSourceTarget(connection,apiTokens[connection.name])
      );
    } else {
      setTimeout(() => dispatch(actionCreators.authorization.displayTokenModal()), 500);
    }
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
              src={require(`../images/available_connections/${connection.name}.png`)}
              alt={connection.readable_name}
            />
            {sourceTarget && sourceTarget.name === connection.name ? (
              <div
                css={{
                  minHeight: 5,
                  marginTop: 5,
                  backgroundColor: colors.presqtOrange,
                  animation: `${basicFadeIn} 1s`
                }}
              >
              </div>
            ) : null}
          </button>
        ))}
      </div>
    </div>
  );
}
