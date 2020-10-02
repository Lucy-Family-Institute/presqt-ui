import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import ListSubheader from "@material-ui/core/ListSubheader";
import colors from "../../../styles/colors";
import { Typography } from "@material-ui/core";
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

const CustomTestButton = withStyles({
  root: {
    backgroundColor: colors.presqtBlue,
    "&:hover": {
      backgroundColor: "#0a4996",
    },
  },
})(Button);

export default function FAIRshareTestsList({tests, header, setNewTests, newTests,}) {
  const classes = useStyles();
  const [checked, setChecked] = useState(newTests);

  let allTests = [];
  const pushThoseTests = tests.map((value, index) => {
    allTests.push(value);
  });
  
  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    setNewTests(newChecked);
  };

  const selectAllTests = () => {
    setChecked(allTests);
    setNewTests(allTests);
  };

  const deselectAllTests = () => {
    setChecked([]);
    setNewTests([]);
  };

  return (
    <List
      className={classes.root}
      subheader={
        <ListSubheader
          component="div"
          id="nested-list-subheader"
          disableSticky={true}
        >
          {header}
        </ListSubheader>
      }
    >
      {tests.map((value, index) => {
        const labelId = `checkbox-list-label-${value}`;
        return (
          <ListItem
            key={value + index}
            role={undefined}
            dense
            button
            onClick={() => handleToggle(value)}
            style={{ minHeight: 50, wordBreak: "break-word" }}
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
            <ListItemText
              id={labelId}
              primary={
                <Typography component={'span'} variant={'body2'}>
                  <strong>{value.test_name}</strong>
                  <br />
                  <blockquote>
                    <i>{value.description}</i>
                  </blockquote>
                </Typography>
              }
              disableTypography
            />
          </ListItem>
        );
      })}
      <CustomTestButton
        onClick={!newTests.length ? selectAllTests : deselectAllTests}
        variant="contained"
        color="primary"
      >
        <span css={textStyles.buttonText}>
          {!newTests.length ? "Select All" : "Deselect All"}
        </span>
      </CustomTestButton>
    </List>
  );
}
