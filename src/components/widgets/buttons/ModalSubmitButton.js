import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button/Button";
import colors from "../../../styles/colors";

/**
 * Create a new component that inherits the Material Button component so we can update the colors
 */
const ModalSubmitButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(colors.presqtBlue),
    boxShadow: 'none',
    backgroundColor: colors.presqtBlue,
    '&:hover': {
      backgroundColor: '#0a4996',
    },
  },
}))(Button);

export default ModalSubmitButton;
