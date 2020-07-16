/** @jsx jsx */
import { useSelector, useDispatch } from "react-redux";
import { jsx } from "@emotion/core";
import textStyles from "../../../styles/text";
import { actionCreators } from "../../../redux/actionCreators";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import buttons from "../../../styles/buttons";
import Tooltip from "@material-ui/core/Tooltip";

export default function SignOutButton() {
  const dispatch = useDispatch();

  const selectedTarget = useSelector(state => state.selectedTarget);
  const pendingAPIOperations = useSelector(state => state.pendingAPIOperations);

  const signOut = () => {
    if (
      pendingAPIOperations.indexOf(actionCreators.resources.loadFromTarget.toString()) < 0 &&
      pendingAPIOperations.indexOf(actionCreators.resources.loadFromTargetSearch.toString()) < 0 &&
      pendingAPIOperations.indexOf(actionCreators.resources.selectResource.toString()) < 0
    )
    {
      dispatch(actionCreators.resources.clearResources());
      dispatch(actionCreators.authorization.removeToken(selectedTarget.name));
      dispatch(actionCreators.targets.clearTarget());
    }
  };

  return (
    <Tooltip
      title={`Sign out of ${selectedTarget.readable_name}`}
      arrow
      placement="right"
    >
      <ExitToAppIcon
        css={[{paddingLeft: 5, verticalAlign: "middle"},
          pendingAPIOperations.indexOf(actionCreators.resources.loadFromTarget.toString()) < 0 &&
          pendingAPIOperations.indexOf(actionCreators.resources.loadFromTargetSearch.toString()) < 0 &&
          pendingAPIOperations.indexOf(actionCreators.resources.selectResource.toString()) < 0
            ? [buttons.inlineButton]
            : [buttons.disabledInlineButton]
        ]}
        onClick={signOut}
      />
    </Tooltip>
  );
}
