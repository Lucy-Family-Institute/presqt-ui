import React, {useState, useEffect} from "react";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import {useSelector} from "react-redux";
import Checkbox from "@material-ui/core/Checkbox";
import colors from "../../../styles/colors";
import {makeStyles} from "@material-ui/core/styles";
import SearchTextField from "../../widgets/text_fields/SearchTextField";
import { withStyles } from "@material-ui/styles";
import isSpaces from "../../../utils/isSpaces";

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

const KeywordTextField = withStyles({
  root: {
    width: '75%'
  }
})(SearchTextField);

export default function KeywordTransferSuggestList({setKeywordList, keywordList}) {
  const classes = useStyles();
  const keywords = useSelector(state => state.keywords);
  const [checked, setChecked] = useState([]);
  const [newKeyValue, setNewKeyValue] = useState("");
  const [newKeywordList, setNewKeywordList] = useState([])
  
  useEffect(() => {
    if (keywords) {
      setNewKeywordList([...keywords.enhanced_keywords]);
    }
  }, [])
  

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

  const searchKeystroke = (event) => {
    setNewKeyValue(event.target.value);
  }

  const putInList = () => {
    const newChecked = [...checked];
    // Add the new keyword to the list
    newKeywordList.push(newKeyValue);
    newChecked.push(newKeyValue)
    setChecked(newChecked);
    setKeywordList(newChecked);
    setNewKeyValue('');
  }

  return (
    <List
      subheader={
        <ListSubheader component="div" id="nested-list-subheader" disableSticky={true}>
          {!keywords
            ? "No keywords found for this resource."
            : "Select the following keyword suggestions to enhance:"
            }
      </ListSubheader>
      }
    >
      {newKeywordList.map((value, index) => {
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
          <KeywordTextField
            size="small"
            label="Add Your Own Keywords Here"
            value={newKeyValue}
            onKeyDown={(event) => { event.keyCode === 13 && !isSpaces(event.target.value) ? putInList() : null }}
            onChange={event => searchKeystroke(event)}
            />
    </List>
  )
}
