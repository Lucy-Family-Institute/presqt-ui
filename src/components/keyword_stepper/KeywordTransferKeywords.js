/** @jsx jsx */
import {useSelector} from "react-redux";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import React, {Fragment} from "react";
import Spinner from "../widgets/spinners/Spinner";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import {jsx} from "@emotion/core";

export default function KeywordTransferKeywords() {
  const keywords = useSelector(state => state.keywords);

  return (
    keywords
      ?
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader" disableSticky={true}>
            The following keywords will get automatically added:
          </ListSubheader>
        }
      >
        {
          keywords.keywords.sort(function(stringA, stringB) {return stringA.localeCompare(stringB)}).map((value, index) => {
            return (
              <ListItem
                key={value + index}
                role={undefined}
                dense
                button
              >
                <ListItemIcon>
                  <VpnKeyIcon />
                </ListItemIcon>
                <ListItemText primary={`${value}`} />
              </ListItem>
            )
          })
        }
      </List>
      :
      <Fragment>
        <div css={{paddingBottom: 15, display: 'flex', justifyContent: 'center'}}>
          Gathering source keywords...
        </div>
        <Spinner />
      </Fragment>
  )
}