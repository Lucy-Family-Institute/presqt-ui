/** @jsx jsx */
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { jsx } from "@emotion/core";
import textStyles from "../../styles/text";
import Button from "@material-ui/core/Button/Button";
import withStyles from "@material-ui/core/styles/withStyles";

/**
 * Create a new component sthat inherits the Material Button component so we can update the colors
 */
const InactiveButton = withStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 35,
    marginRight: 20,
    paddingLeft: 15,
    paddingRight: 15
  }
})(Button);

const ActiveButton = withStyles({
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
  }
})(Button);

export default function ActionButton(props) {
  const sourceTargetToken = useSelector(
    state => state.authorization.apiTokens[state.targets.source.name]
  );
  const selectedInSource = useSelector(
    state => state.resources.selectedInSource
  );

  const { text, onClick } = props;

  const [active, setActive] = useState(false);
  return active ? (
    <ActiveButton
      elevation={0}
      variant="contained"
      onClick={() => {
        setActive(!active);
        onClick();
      }}
    >
      <span css={textStyles.buttonText}>{text}</span>
    </ActiveButton>
  ) : (
    <InactiveButton
      variant="outlined"
      onClick={() => {
        setActive(!active);
        onClick();
      }}
    >
      <span css={textStyles.buttonText}>{text}</span>
    </InactiveButton>
  );
}
