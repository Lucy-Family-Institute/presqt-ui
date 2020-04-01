/** @jsx jsx */
import { jsx } from '@emotion/core';
import textStyles from '../../../styles/text';
import {useSelector} from "react-redux";
import {basicFadeIn} from "../../../styles/animations";
import SignOutButton from '../buttons/SignOutButton';
import getError from '../../../utils/getError';
import { actionCreators } from "../../../redux/actionCreators";

function TargetResourcesHeader() {
  const target = useSelector(state => state.selectedTarget);
  const collectionError = getError(actionCreators.resources.loadFromTarget);
  const searchValue = useSelector(state => state.searchValue);
  const targetResources = useSelector(state => state.targetResources);

  let headerMessage = 'Resources';
  if (target) {
    headerMessage = `${target.readable_name} Resources`;
  }

  const signOut = () => {
    if (collectionError && collectionError.status === 401) {
      return null;
    }
    else if (targetResources || searchValue) {
      return <SignOutButton />;
    }
  };

  return (
    <div css={{ display: 'flex' }}>
      <span css={[textStyles.largeHeader, { animation: `${basicFadeIn} 1s ease` }]}>
        {headerMessage}
        {!target ? null : signOut()}
      </span>
    </div>
  );
}

export default TargetResourcesHeader;
