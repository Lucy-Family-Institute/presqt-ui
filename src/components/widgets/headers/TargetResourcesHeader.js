/** @jsx jsx */
import { jsx } from '@emotion/core';
import textStyles from '../../../styles/text';
import {useSelector} from "react-redux";
import {basicFadeIn} from "../../../styles/animations";

function TargetResourcesHeader() {
  const target = useSelector(state => state.selectedTarget);

  let headerMessage = 'Resources';
  if (target) {
    headerMessage = `${target.readable_name} Resources`;
  }

  return (
    <div css={{ display: 'flex' }}>
      <span css={[textStyles.largeHeader, { animation: `${basicFadeIn} 1s ease` }]}>
        {headerMessage}
      </span>
    </div>
  );
}

export default TargetResourcesHeader;
