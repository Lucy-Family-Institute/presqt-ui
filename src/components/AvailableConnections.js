/**
 * AvailableConnections
 *
 * This component displays the various targets that a user can connect with
 * to. It is also one place through which a user can submit an API token for
 * targets. Finally, it is responsible for broadcasting (via Redux) what the
 * currently selected "sourceTarget" is.
 */

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

// TEST_USER_TOKEN = '3f5ULLSX3OaJcNVmj6N6cTomvcmlZf5YQYYKl6ek6c6SKXMG7V0R63ueMB0uiiGwrkXQi8'
// PRIVATE_USER_TOKEN = '0UAX3rbdd59OUXkGIu19gY0BMQODAbtGimcLNAfAie6dUQGGPig93mpFOpJQ8ceynlGScp'
// UPLOAD_TEST_USER_TOKEN = 'E9luKQU9Ywe5QFG2HpgupjBqqSeH4fZKG6IxUMVP8fa242dSyECYuB5lhFvekbmjhxq1zT'
// PRESQT_FORK_TOKEN = 'Airlov2nBOb41T1d3FkTIbzC8ahq3nBWDxMbGyrUYvWDinKWJgrPO52uuS6KJIBXKXFtlv'

export default function AvailableConnections() {
  const dispatch = useDispatch();
  const pendingAPIResponse = useSelector(
    state => state.resources.pendingAPIResponse
  );
  const apiTokens = useSelector(state => state.authorization.apiTokens);
  const sourceTarget = useSelector(state => state.targets.source);
  const availableTargets = useSelector(state => state.targets.available);

  useEffect(() => {
    dispatch(actionCreators.targets.load());
  }, [dispatch]);

  const { modalVisible, toggleModalVisibility } = useModal();

  const onTokenSubmission = (connection, token) => {
    toggleModalVisibility();
    dispatch(actionCreators.authorization.saveToken(connection.name, token));
    dispatch(actionCreators.resources.loadFromSourceTarget(connection, token));
  };

  const handleSwitchSourceTarget = connection => {
    dispatch(actionCreators.targets.switchSource(connection));

    if (connection.name in apiTokens) {
      dispatch(
        actionCreators.resources.loadFromSourceTarget(
          connection,
          apiTokens[connection.name]
        )
      );
    } else {
      setTimeout(() => toggleModalVisibility(), 500);
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
