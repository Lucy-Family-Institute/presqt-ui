import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button/Button";

/**
 * Create a new component that inherits the Material Button component so we can update the colors
 */
const ModalSubmitButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText('#0C52A7'),
    boxShadow: 'none',
    backgroundColor: '#0C52A7',
    '&:hover': {
      backgroundColor: '#0a4996',
    },
  },
}))(Button);

export default ModalSubmitButton;
