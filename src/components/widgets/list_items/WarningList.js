/** @jsx jsx */
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import colors from "../../../styles/colors";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import {jsx} from "@emotion/core";
import React from "react";

export default function WarningList({resources, header}) {
  return (
    <List
      dense={true}
      subheader={
        <ListSubheader component="div" id="nested-list-subheader" disableSticky={true}>
          {header}
        </ListSubheader>
      }
    >
      {
        resources.map(resource => (
          <ListItem key={resource}>
            <ListItemIcon>
              <ErrorOutlineIcon style={{ color: colors.warningYellow }}/>
            </ListItemIcon>
            <ListItemText
              primary={resource}
            />
          </ListItem>
        ))
      }
    </List>
  )
}