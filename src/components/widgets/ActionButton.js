import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button/Button";

const ActionButton = withStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 35,
    marginRight: 20,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#E57B00",
    border: "1px solid #E57B00",
    color: "white",
    boxShadow: "none",
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "#E57B00"
    }
  },
  containedPrimary: {
    backgroundColor: "#E57B00"
  }
})(Button);

export default ActionButton;