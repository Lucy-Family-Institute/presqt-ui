import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import ListSubheader from "@material-ui/core/ListSubheader";
import colors from "../../../styles/colors";
import { GridList } from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import textStyles from "../../../styles/text";

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

const CustomKeywordButton = withStyles({
  root: {
    backgroundColor: colors.presqtBlue,
    "&:hover": {
      backgroundColor: "#0a4996",
    },
  },
})(Button);

export default function KeywordEnhancementList({keywords, header, setNewKeywords, newKeywords}) {
  const classes = useStyles();
  const [checked, setChecked] = useState(newKeywords);

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

  const selectAllKeywords = () => {
    setChecked(keywords);
    setNewKeywords(keywords);
  };

  const deselectAllKeywords = () => {
    setChecked([]);
    setNewKeywords([]);
  };

  return (
    <List
      className={classes.root}
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          {header}
        </ListSubheader>
      }
    >
      <GridList cellHeight={50} style={{ marginLeft: 15, paddingBottom: 10 }}>
        {keywords.map((value, index) => {
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
              <ListItemText id={labelId} primary={`${value}`} disableTypography={true}/>
            </ListItem>
          );
        })}
      </GridList>
      <CustomKeywordButton
        onClick={!newKeywords.length ? selectAllKeywords : deselectAllKeywords}
        variant="contained"
        color="primary"
      >
        <span css={textStyles.buttonText}>
          {!newKeywords.length ? "Select All" : "Deselect All"}
        </span>
      </CustomKeywordButton>
    </List>
  );
}
