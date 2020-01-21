import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button/Button";
import colors from "../../styles/colors";

const ActionButton = withStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 35,
    marginRight: 20,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: colors.presqtOrange,
    border: `1px solid ${colors.presqtOrange}`,
    color: "white",
    boxShadow: "none",
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "#c96d02"
    }
  },
  containedPrimary: {
    backgroundColor: colors.presqtOrange
  }
})(Button);

export default ActionButton;