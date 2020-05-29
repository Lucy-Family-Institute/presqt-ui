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

export default function KeywordTransferSuggestList({setNewKeywords, newKeywords}) {
  const classes = useStyles();
  const transferData = useSelector(state => state.transferData);
  const keywordSuggestions  = transferData.enhanced_keywords;
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
    setNewKeywords(newChecked);
  };

  return (
    <List
      subheader={
        <ListSubheader component="div" id="nested-list-subheader" disableSticky={true}>
          Select the following keyword suggestions to enhance:
        </ListSubheader>
      }
    >
      {keywordSuggestions.map((value, index) => {
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

      )})}
    </List>
  )
}