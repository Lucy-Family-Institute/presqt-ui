/** @jsx jsx */
import { keyframes } from "emotion";
import { jsx } from "@emotion/core";

import textStyles from "../../styles/text";
import { useSelector } from "react-redux";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 100;
  }
`;

function TransferResourcesHeader({ destinationTarget }) {

  const available = useSelector(state => state.targets.available);
  console.log(available);

  let headerTarget = null;
  for (var i = 0; i <= available.length; i++) {
    console.log(available[i].name)
    // if (available[i].name === destinationTarget) {
    //   headerTarget = available[i].readable_name
    // }
  }

  let headerMessage = "Resources";
  if (destinationTarget) {
    headerMessage = `${headerTarget} Resources`;
  }

  return (
    <div css={{ display: "flex" }}>
      <span css={[textStyles.largeHeader, { animation: `${fadeIn} 1s ease` }]}>
        {headerMessage}
      </span>
    </div>
  );
} 

export default TransferResourcesHeader;
