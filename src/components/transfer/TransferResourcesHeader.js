/** @jsx jsx */
import { jsx } from "@emotion/core";
import textStyles from "../../styles/text";
import { useSelector } from "react-redux";
import {basicFadeIn} from "../../styles/animations";

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
      <span css={[textStyles.largeHeader, { animation: `${basicFadeIn} 1s ease` }]}>
        {headerMessage}
      </span>
    </div>
  );
} 
