/** @jsx jsx */
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import colors from "../../../styles/colors";
import ListItemText from "@material-ui/core/ListItemText";
import { jsx } from "@emotion/core";
import { IconButton, Typography } from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import Tooltip from "@material-ui/core/Tooltip";

export default function TestListItem({ message, testInfo, setOpen, open }) {
  let icon = <CheckCircleOutlineIcon fontSize='inherit' style={{ color: colors.successGreen,  verticalAlign: 'middle' }} />;

  if (testInfo.failures.length > 0) {
    icon = <ErrorOutlineIcon fontSize='inherit' style={{ color: colors.chevelleRed, verticalAlign: 'middle' }} />;
  }

  return (
    <ListItem>
      <ListItemIcon>
        <IconButton onClick={() => setOpen(!open)}>
          {!open ? (
            <KeyboardArrowDownIcon style={{ color: colors.presqtBlue }} />
          ) : (
            <KeyboardArrowUpIcon style={{ color: colors.presqtBlue }} />
          )}
        </IconButton>
      </ListItemIcon>
      <ListItemText
          primary={
          <Typography component={'span'} variant={'body2'}>
              {message}     
            <Tooltip
              title={testInfo.description}
              arrow placement="right"
            >
              <span style={{ marginLeft: 5, marginTop: "relative" }}>{icon}</span>
            </Tooltip>
          </Typography>
          }
          disableTypography/>
    </ListItem>
  );
}
