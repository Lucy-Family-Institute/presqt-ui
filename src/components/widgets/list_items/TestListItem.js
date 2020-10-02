/** @jsx jsx */
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import colors from "../../../styles/colors";
import ListItemText from "@material-ui/core/ListItemText";
import { jsx } from "@emotion/core";
import { IconButton } from "@material-ui/core";

export default function TestListItem({ message, link, setOpen, open }) {
  return (
    <ListItem>
      <ListItemIcon>
        <IconButton onClick={() => setOpen(!open)}>
          {!open ? (
            <KeyboardArrowDownIcon style={{ color: colors.presqtBlue }} />
          ) : (
            <KeyboardArrowUpIcon style={{ color: colors.presqtBlue }} />
          )}
        </IconButton>
      </ListItemIcon>
      <ListItemText primary={message} />
    </ListItem>
  );
}
