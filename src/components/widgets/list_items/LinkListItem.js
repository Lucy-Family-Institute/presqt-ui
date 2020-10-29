/** @jsx jsx */
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import colors from "../../../styles/colors";
import ListItemText from "@material-ui/core/ListItemText";
import { jsx } from "@emotion/core";
import LinkIcon from '@material-ui/icons/Link';
import Link from '@material-ui/core/Link';

export default function LinkListItem({message, url}) {
  return (
      <ListItem
          button
          component={Link}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
      >
      <ListItemIcon>
        <LinkIcon
          style={{ color: colors.presqtBlue }}
        />
      </ListItemIcon>
          <ListItemText
              primary={message}
            />
    </ListItem>
  )
}