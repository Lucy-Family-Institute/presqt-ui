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

export default function TransferResourcesHeader({ destinationTarget }) {
  const available = useSelector(state => state.available);
  const transferTargetResources = useSelector(state => state.transferTargetResources);
  let headerTarget = null;

  let headerMessage = "Resources";
  if (transferTargetResources) {
    for (let i = 0; i < available.length; i++) {
      if (available[i].name === destinationTarget) {
        headerTarget = available[i].readable_name
      }
    }
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
