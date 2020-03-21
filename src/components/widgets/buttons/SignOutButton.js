/** @jsx jsx */
import { useSelector, useDispatch } from "react-redux";
import { jsx } from "@emotion/core";
import textStyles from "../../../styles/text";
import { actionCreators } from "../../../redux/actionCreators";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import colors from "../../../styles/colors";
import Tooltip from "@material-ui/core/Tooltip";


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
