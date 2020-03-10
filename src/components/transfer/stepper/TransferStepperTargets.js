/** @jsx jsx */
import { jsx } from '@emotion/core';
import {useDispatch, useSelector} from 'react-redux';
import { useState } from 'react';
import { basicFadeIn } from '../../../styles/animations';
import colors from '../../../styles/colors';
import {actionCreators} from "../../../redux/actionCreators";

export default function TransferStepperTargets() {
  const dispatch = useDispatch();

  const selectedTarget = useSelector(state => state.selectedTarget);
  const transferDestinationTarget = useSelector(state => state.transferDestinationTarget);

  const [switchCss, setSwitchCss] = useState('');

  const handleSwitchTarget = connection => {
    dispatch(actionCreators.transfer.saveTransferDestinationTarget(connection));
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
                paddingRight: 10,
                cursor: 'pointer'
              }
            ]}
            onClick={() => handleSwitchTarget(connection)}
          >
            <img
              src={require(`../../../images/available_connections/${connection}.png`)}
              alt={connection}
            />
            {switchCss === connection || transferDestinationTarget === connection ? (
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