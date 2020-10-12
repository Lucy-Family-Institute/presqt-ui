/** @jsx jsx */
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import { jsx } from "@emotion/core";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { GridList } from "@material-ui/core";
import colors from "../../../styles/colors";

export default function FAIRshareFailureMessageList({ messages }) {
  return (
    <List style={{ paddingLeft: 30 }}>
      <GridList cols={1} cellHeight="auto" style={{ marginLeft: 15 }}>
        {messages.map((message) => (
          <ListItem
            key={message}
            style={{ minHeight: 50, wordBreak: "break-word", paddingLeft: 30 }}
          >
            <ListItemIcon>
              <ErrorOutlineIcon style={{ color: colors.chevelleRed }} />
            </ListItemIcon>
            <ListItemText primary={message} />
          </ListItem>
        ))}
      </GridList>
    </List>
  );
}
