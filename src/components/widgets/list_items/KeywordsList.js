/** @jsx jsx */
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import { jsx } from "@emotion/core";
import React from "react";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { GridList } from "@material-ui/core";

export default function KeywordList({ resources, header, colNumber }) {
  return (
    <List
      subheader={
        <ListSubheader component="div" id="nested-list-subheader" disableSticky={true}>
          {header}
        </ListSubheader>
      }
    >
      <GridList cols={colNumber} cellHeight='auto' style={{marginLeft: 15}}>
        {resources.map((resource) => (
          <ListItem key={resource} style={{minHeight: 50, wordBreak: 'break-word'}}>
            <ListItemIcon>
              <VpnKeyIcon />
            </ListItemIcon>
            <ListItemText primary={resource} />
          </ListItem>
        ))}
      </GridList>
    </List>
  );
}
