/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useSelector, useDispatch } from 'react-redux';
import React, {useState} from 'react';
import text from '../../styles/text';
import { basicFadeIn } from '../../styles/animations';
import colors from '../../styles/colors';

export default function TransferStepperTargets({setDestinationTarget}) {
  const availableTargets = useSelector(state => state.targets.available);
  const pendingAPIResponse = useSelector(state => state.resources.pendingAPIResponse);
  const [switchCss, setSwitchCss] = useState('');
  
  let destinationTarget;
  const handleSwitchTarget = connection => {
    setDestinationTarget(connection.name);
    setSwitchCss(connection.name);
  };

  return (
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
            onClick={() => handleSwitchTarget(connection)}
            disabled={pendingAPIResponse}
          >
            <img
              src={require(`../../images/available_connections/${connection.name}.png`)}
              alt={connection.readable_name}
            />
            {switchCss === connection.name ? (
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
  )
}