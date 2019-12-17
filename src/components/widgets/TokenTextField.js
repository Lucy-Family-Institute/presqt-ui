import SearchTextField from "./SearchTextField";
import { withStyles } from "@material-ui/styles";

/**
 * Create a new component that inherits the Material TextField component so we can update the colors
 */
const TokenTextField = withStyles({
  root: {
    width: 500,
  }
})(SearchTextField);

export default TokenTextField