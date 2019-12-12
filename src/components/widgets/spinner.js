/** @jsx jsx */
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import textStyles from "../../styles/text";
import {jsx} from "@emotion/core";
import {keyframes} from "emotion";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  
  100% {
    opacity: 100;
  }
`;

/**
 * Spinner icon for loading screens.
 **/
export default function Spinner() {
  return (
    <div
      css={{
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        animation: `${fadeIn} 3s ease`
      }}
    >
      <FontAwesomeIcon
        icon={faSpinner}
        size='2x'
        spin
        color={'#4E4E4E'}
      />
      <span css={[textStyles.body, { paddingLeft: 10 }]}>Loading</span>
    </div>
  )
}
