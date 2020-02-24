/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { basicFadeIn } from '../../styles/animations';
import colors from '../../styles/colors';

export default function TransferStepperTargets({ setDestinationTarget }) {
  const selectedTarget = useSelector(state => state.targets.selectedTarget);
  const pendingAPIResponse = useSelector(state => state.resources.pendingAPIResponse);
  const [switchCss, setSwitchCss] = useState('');
  
  const handleSwitchTarget = connection => {
    setDestinationTarget(connection);
    setSwitchCss(connection);
  };
  
  return (
    <div css={{ display: 'flex', flexDirection: 'row', paddingTop: 10 }}>
        {selectedTarget.supported_transfer_partners.transfer_out.map(connection => (
          <button
            key={connection}
            css={[
              {
                backgroundColor: 'white',
                border: 'none',
                paddingLeft: 0,
                paddingRight: 10
              },
            ]}
            onClick={() => handleSwitchTarget(connection)}
          >
            <img
              src={require(`../../images/available_connections/${connection}.png`)}
              alt={connection}
            />
            {switchCss === connection ? (
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