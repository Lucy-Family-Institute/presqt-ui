/** @jsx jsx */
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import colors from "../../../styles/colors";
import ListItemText from "@material-ui/core/ListItemText";
import {jsx} from "@emotion/core";

export default function SuccessListItem({message}) {
  return (
    <ListItem>
      <ListItemIcon>
        <CheckCircleOutlineIcon
          style={{ color: colors.successGreen }}
        />
      </ListItemIcon>
      <ListItemText
        primary={message}
      />
    </ListItem>
  )
}