import React, {useState} from "react";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import {useSelector} from "react-redux";
import Checkbox from "@material-ui/core/Checkbox";
import colors from "../../../styles/colors";
import {makeStyles} from "@material-ui/core/styles";
import WarningList from "../../widgets/list_items/WarningList";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  checked: {
    "&&:hover": {
      backgroundColor: "transparent",
    },
  },
}));

export default function KeywordTransferSuggestList({setKeywordList, keywordList}) {
  const classes = useStyles();
  const keywords = useSelector(state => state.keywords);
  const selectedResource = useSelector(state => state.selectedResource);
  const [checked, setChecked] = useState([]);

  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    }
    else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    setKeywordList(newChecked);
  };

  if (!keywords) {
    return (
      <Grid item md={12}>
        <WarningList resources={[`No keywords or enhancements found for resource "${selectedResource.title}".`]} header=""/>
      </Grid>
    )
  }
  else {
    return (
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader" disableSticky={true}>
            Select the following keyword suggestions to enhance:
        </ListSubheader>
        }
      >
        {keywords.enhanced_keywords.map((value, index) => {
          const labelId = `checkbox-list-label-${value}`;
          return (
            <ListItem
              key={value + index}
              role={undefined}
              dense
              button
              onClick={() => handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  style={{ color: colors.presqtBlue }}
                  edge="start"
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                  classes={{ root: classes.checked }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value}`} />
            </ListItem>

          )
        })}
      </List>
    )
  }
}