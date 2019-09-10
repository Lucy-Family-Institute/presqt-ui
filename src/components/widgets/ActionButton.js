/** @jsx jsx */
import { useState } from 'react';
import { jsx } from '@emotion/core';
import textStyles from '../../styles/text';

export default function ActionButton(props) {
  const {
    text,
    textColor,
    activeBackgroundColor,
    inactiveBackgroundColor,
    borderColor,
    onClick
  } = props;

  const [active, setActive] = useState(false);

  return (
    <button
      css={[
        {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 35,
          borderRadius: 10,
          marginRight: 20,
          paddingLeft: 15,
          paddingRight: 15
        },
        active
          ? {
              borderColor: activeBackgroundColor,
              borderWidth: 1,
              borderStyle: 'solid',
              backgroundColor: activeBackgroundColor,
              color: 'white'
            }
          : {
              borderColor: borderColor,
              borderWidth: 1,
              borderStyle: 'solid',
              backgroundColor: inactiveBackgroundColor,
              color: textColor
            }
      ]}
      onClick={() => setActive(!active)}
    >
      <span css={textStyles.buttonText}>{text}</span>
    </button>
  );
}

ActionButton.defaultProps = {
  textColor: '#404040',
  inactiveBackgroundColor: 'white',
  activeBackgroundColor: '#E57B00',
  borderColor: '#979797'
};
