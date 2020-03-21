/** @jsx jsx */
import { useSelector, useDispatch } from "react-redux";
import { jsx } from "@emotion/core";
import textStyles from "../../../styles/text";
import { actionCreators } from "../../../redux/actionCreators";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import colors from "../../../styles/colors";
import Tooltip from "@material-ui/core/Tooltip";

/**
 * This component handles the download action button in the TargetActions component.
 * It is responsible for dispatching the action that will make the download API call and open
 * a modal to display the download status.
 **/
export default function SignOutButton() {
  const dispatch = useDispatch();

  const selectedTarget = useSelector(state => state.selectedTarget);

  const signOut = () => {
    dispatch(actionCreators.resources.clearResources());
    dispatch(actionCreators.authorization.removeToken(selectedTarget.name));
    dispatch(actionCreators.targets.clearTarget());
  };
    
  const toolMessage = `Sign out of ${selectedTarget.readable_name}`;

  return (
    <Tooltip title={toolMessage} arrow placement="right">
      <ExitToAppIcon
        css={{
          cursor: "pointer",
          color: colors.presqtBlue,
          paddingLeft: 5
        }}
        onClick={signOut}/>
    </Tooltip>
  );
}
